import {inject, singleton} from 'aurelia-framework';
import {Router, RedirectToRoute} from 'aurelia-router';
import {Server} from 'backend/server';
import {CommonDialogs} from 'resources/dialogs/common-dialogs';
import {EditUserController} from './edit-user-controller';

@inject(Server, Router, CommonDialogs, EditUserController)
// Components are transient by default in Aurelia - most other classes
// are singletons.  By default whenever one navigates away from a page
// and navigates back, etc., the instance is destroyed/created respectively.
@singleton()
export class Users {
  constructor(server, router, commonDialogs, controller) {
    this.server = server;
    this.router = router;
    this.commonDialogs = commonDialogs;
    this.controller = controller;
    this.controller.onSave = user => this.onSave(user);
  }

  canActivate(params) {
    // Since this is a singleton, this is just saying hey if there's no route
    // params of id but we have an activeId stored in the instance, we will load
    // that user.
    if (!params.id && this.activeId) {
      return new RedirectToRoute('user', { id: this.activeId });
    }
    return true;
  }

  activate(params) {
    if (!this.users) {
      return Promise.all([
        this.load(params.id),
        this.server.getUserSummaries().then(users => this.users = users)
      ]);
    }
    return this.load(params.id);
  }

  load(id) {
    // More logic to deal with the fact that this is a singleton.
    if (id === 'new') {
      this.activeId = 0;
      this.controller.startTracking(this.server.createUser());
    } else if (id) {
      this.activeId = parseInt(id, 10);
      return this.server.getUser(this.activeId).then(user => {
        this.controller.startTracking(user);
      });
    } else {
      this.activeId = 0;
      this.controller.startTracking(null);
    }
  }

  onSave(user) {
    if (this.activeId === 0) {
      this.users.unshift(user);
      this.activeId = user.id;
      this.router.navigateToRoute('user', { id: user.id }, { replace: true, trigger: false });
    } else {
      let existing = this.users.find(c => c.id === user.id);
      let index = this.users.indexOf(existing);
      this.users.splice(index, 1, user);
    }
  }

  canDeactivate() {
    if (this.controller.isDirty) {
      let message = 'You have made changes. If you leave now, these changes will be lost. Do you wish to continue?';

      return this.commonDialogs.showMessage(
        message,
        'User Has Changed',
        ['Yes', 'No']
      ).then(response => !response.wasCancelled);
    }
    return true;
  }

  deactivate() {
    this.controller.revert();
    this.controller.stopTracking();
  }
}
