import {inject, NewInstance, computedFrom} from 'aurelia-framework';
import {ValidationRules, ValidationController, validateTrigger} from 'aurelia-validation';
import {BootstrapFormRenderer} from 'resources/bootstrap-form-renderer';
import {Server} from 'backend/server';

@inject(Server, NewInstance.of(ValidationController))
export class EditUserController {
  constructor(server, validationController) {
    this.server = server;
    this.validationController = validationController;

    // Validate the property everytime the input changes.  blur is another option.
    this.validationController.validateTrigger = validateTrigger.change;

    // Add in the error renderer.
    this.validationController.addRenderer(new BootstrapFormRenderer());

    this.onSave = function() {};
  }

  @computedFrom('validationController.errors.length')
  // In Aurelia, with getters, the most optimal way to watch for changes is
  // not available - it would have to use dirty checking, so instead of that,
  // you can override it and use @computedFrom
  // I.E. isValid() will only change when the computedFrom prop changes.
  get isValid() {
    return this.validationController.errors.length === 0;
  }

  startTracking(original) {
    if (original) {
      this.stopTracking();
      this.original = original;
      this.originalJSON = JSON.stringify(original);
      this.isDirty = false;
      this.editable = original.clone();

      ValidationRules
        .ensure('firstName').displayName('First Name')
          .required()
          .minLength(3)
          .maxLength(10)
        .ensure('lastName').displayName('Last Name')
          .required()
          .minLength(3)
          .maxLength(10)
        .ensure('email').displayName('Email')
          .required()
          .email()
        .on(this.editable);

      this.validationController.reset();

      this._timer = setInterval(() => {
        let currentJSON = JSON.stringify(this.editable);
        if (currentJSON !== this.originalJSON) {
          this.isDirty = true;
        } else if (this.isDirty) {
          this.isDirty = false;
        }
      }, 500);
    } else {
      this.original = this.editable = null;
    }
  }

  stopTracking() {
    clearInterval(this._timer);
  }

  validate() {
    return this.validationController.validate();
  }

  toggleActiveStatus() {
    this.editable.isActive = !this.editable.isActive;
  }

  commit(other) {
    this.stopTracking();
    Object.assign(this.original, other || this.editable);
    this.startTracking(this.original);
  }

  revert() {
    this.startTracking(this.original);
  }

  save() {
    return this.validate().then(errors => {
      if (errors.length !== 0) {
        return;
      }

      return this.server.saveUser(this.editable).then(user => {
        this.commit(user);
        this.onSave(user);
      });
    });
  }
}
