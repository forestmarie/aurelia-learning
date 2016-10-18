import {bindable, bindingMode, inject, noView, TaskQueue} from 'aurelia-framework';

CKEDITOR.config.skin = 'bootstrapck';

@inject(Element, TaskQueue)
@noView()
export class RichTextEditor {
  // By default, custom element bindables have a default binding mode of one-way.
  // We need twoWay here.
  @bindable({ defaultBindingMode: bindingMode.twoWay }) value;

  constructor(element, taskQueue) {
    this.element = element;
    this.taskQueue = taskQueue;
    this.guard = false;
  }

  // Created is the earliest callback other than the constructor.
  created(owningView) {
    let original = owningView.removeNodes;
    let that = this;

    // The view type in aurelia has a method called removeNodes that will remove
    // all DOM elements within its view.  We're only doing this because CKEDITOR
    // must be attched to the DOM to be cleaned up/destroyed.

    // Somewhat of a hack here - we're replacing the default implementation and
    // adding some customization to it.
    owningView.removeNodes = () => {
      this.editor.destroy();
      original.call(owningView);
    };
  }

  bind() {
    this.editor = CKEDITOR.appendTo(this.element, { removePlugins: 'resize, elementspath' }, this.value);

    this.editor.on('change', () => {
      let newValue = this.editor.getData();

      // This is here because the CKEDITOR sometimes fire multiple change events.
      if (this.value === newValue) {
        return;
      }

      // Using this to guard against re-entracing.
      this.guard = true;

      // Remember value is two-way databound and as such will get thrown on the
      // micro task queue.
      this.value = newValue;

      // We can't just guard to false here because the above line got added to
      // the micro-task, so just queue it up so it'll fire in order.
      this.taskQueue.queueMicroTask(() => this.guard = false);
    });
  }

  // Handling when the end user changes the value here...above we're handling when
  // the editor changes value.
  valueChanged(newValue, oldValue) {
    if (this.guard || !this.editor) {
      return;
    }

    this.editor.setData(newValue);
  }
}
