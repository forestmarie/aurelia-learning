define('app',['exports', 'aurelia-router'], function (exports, _aureliaRouter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.App = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      config.title = 'Aurelia Notes';
      config.map([{ route: '', moduleId: 'welcome' }, {
        route: 'notes',
        name: 'notes',
        moduleId: 'notes/index',
        nav: true,
        title: 'Notes',
        href: '#/notes?filter=none',
        settings: { icon: 'file-text' },
        activationStrategy: _aureliaRouter.activationStrategy.invokeLifecycle
      }, {
        route: 'notebooks', moduleId: 'notebooks/index', nav: true, title: 'Notebooks',
        settings: { icon: 'book' }
      }, {
        route: 'settings', moduleId: 'settings/index', nav: true, title: 'Settings',
        settings: { icon: 'cog' }
      }]);

      this.router = router;
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-animator-css').plugin('aurelia-dialog');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('welcome',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Welcome = exports.Welcome = function Welcome() {
    _classCallCheck(this, Welcome);
  };
});
define('backend/database',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var lastId = 0;

  function nextId() {
    return ++lastId;
  }

  var defaultNotebook = {
    id: nextId(),
    title: 'My Notes'
  };

  var database = exports.database = {
    nextId: nextId,
    notebooks: [defaultNotebook],
    notes: [{
      id: nextId(),
      notebookId: defaultNotebook.id,
      title: 'Sample Note',
      body: 'This is a sample note. You can type details in here!'
    }]
  };
});
define('backend/server',['exports', './database'], function (exports, _database) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Server = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Server = exports.Server = function () {
    function Server() {
      _classCallCheck(this, Server);
    }

    Server.prototype.newNote = function newNote() {
      return {
        title: 'New Note',
        body: '',
        notebookId: _database.database.notebooks[0].id
      };
    };

    Server.prototype.hasChanged = function hasChanged(a, b) {
      return a.title !== b.title || a.body !== b.body || a.notebookId !== b.notebookId;
    };

    Server.prototype.getNoteList = function getNoteList(filter) {
      var results = filter && filter !== 'none' ? _database.database.notes.filter(function (x) {
        return x.notebookId === parseInt(filter);
      }) : _database.database.notes;

      results = results.map(function (x) {
        return {
          id: x.id,
          title: x.title,
          body: x.body
        };
      });

      return Promise.resolve(results);
    };

    Server.prototype.getNote = function getNote(id) {
      var found = _database.database.notes.find(function (x) {
        return x.id == id;
      });
      return Promise.resolve(found ? JSON.parse(JSON.stringify(found)) : null);
    };

    Server.prototype.getNotebookList = function getNotebookList() {
      return Promise.resolve(_database.database.notebooks.map(function (x) {
        return {
          id: x.id,
          title: x.title
        };
      }));
    };

    Server.prototype.saveNote = function saveNote(note) {
      var existing = void 0;

      if (note.id) {
        existing = _database.database.notes.find(function (x) {
          return x.id === note.id;
        });
      } else {
        existing = { id: _database.database.nextId() };
        _database.database.notes.push(existing);
      }

      Object.assign(existing, note);
      return Promise.resolve(JSON.parse(JSON.stringify(existing)));
    };

    Server.prototype.createNotebook = function createNotebook(name) {
      var notebook = {
        id: _database.database.nextId(),
        title: name
      };

      _database.database.notebooks.push(notebook);

      return Promise.resolve(JSON.parse(JSON.stringify(notebook)));
    };

    return Server;
  }();
});
define('notebooks/index',['exports', 'backend/server', 'aurelia-framework'], function (exports, _server, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.NotebooksIndex = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var NotebooksIndex = exports.NotebooksIndex = (_dec = (0, _aureliaFramework.inject)(_server.Server), _dec(_class = function () {
    function NotebooksIndex(server) {
      _classCallCheck(this, NotebooksIndex);

      this.server = server;
      this.notebookName = '';
    }

    NotebooksIndex.prototype.activate = function activate() {
      var _this = this;

      return this.server.getNotebookList().then(function (x) {
        return _this.notebookList = x;
      });
    };

    NotebooksIndex.prototype.createNotebook = function createNotebook() {
      var _this2 = this;

      if (!this.notebookName) {
        return;
      }

      console.log('bam');
      this.server.createNotebook(this.notebookName).then(function (notebook) {
        _this2.notebookName = '';
        _this2.notebookList.push(notebook);
      });
    };

    return NotebooksIndex;
  }()) || _class);
});
define('notes/detail',['exports', 'backend/server', 'aurelia-router', 'aurelia-event-aggregator', 'resources/dialogs/common-dialogs', 'aurelia-framework'], function (exports, _server, _aureliaRouter, _aureliaEventAggregator, _commonDialogs, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Detail = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Detail = exports.Detail = (_dec = (0, _aureliaFramework.inject)(_server.Server, _aureliaRouter.Router, _aureliaEventAggregator.EventAggregator, _commonDialogs.CommonDialogs), _dec(_class = function () {
    function Detail(server, router, ea, commonDialogs) {
      _classCallCheck(this, Detail);

      this.server = server;
      this.router = router;
      this.ea = ea;
      this.commonDialogs = commonDialogs;
    }

    Detail.prototype.canActivate = function canActivate(params) {
      var _this = this;

      return this.server.getNotebookList().then(function (notebooks) {
        return _this.notebooks = notebooks;
      }).then(function () {
        if (!params.noteId) {
          return _this.server.newNote();
        } else {
          return _this.server.getNote(params.noteId);
        }
      }).then(function (note) {
        if (note) {
          _this.edit(note);
        } else {
          return new _aureliaRouter.Redirect('');
        }
      });
    };

    Detail.prototype.activate = function activate() {
      if (this.note.id) {
        this.ea.publish('note:editing', this.note);
      }
    };

    Detail.prototype.canDeactivate = function canDeactivate() {
      if (this.original && this.server.hasChanged(this.note, this.original)) {
        var message = 'You have made changes to your note. Are you sure you wish to navigate away?';

        return this.commonDialogs.showMessage(message, 'Unsaved Changes', ['Yes', 'No']).then(function (result) {
          return !result.wasCancelled;
        });
      }

      return true;
    };

    Detail.prototype.edit = function edit(note) {
      this.note = note;
      this.original = JSON.parse(JSON.stringify(note));
    };

    Detail.prototype.save = function save() {
      var _this2 = this;

      var isNew = !this.note.id;
      this.server.saveNote(this.note).then(function (note) {
        _this2.ea.publish('note:updated', note);
        _this2.edit(note);

        if (isNew) {
          _this2.router.navigateToRoute('edit', { noteId: note.id }, { replace: true, trigger: true });
        }
      });
    };

    return Detail;
  }()) || _class);
});
define('notes/index',['exports', 'backend/server', 'aurelia-event-aggregator', 'aurelia-framework'], function (exports, _server, _aureliaEventAggregator, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Notes = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Notes = exports.Notes = (_dec = (0, _aureliaFramework.inject)(_server.Server, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Notes(server, ea) {
      var _this = this;

      _classCallCheck(this, Notes);

      this.server = server;
      this.ea = ea;
      this.filter = 'none';
      this.noteList = [];

      this.updatedSubscription = this.ea.subscribe('note:updated', function (note) {
        return _this.noteUpdated(note);
      });
      this.editingSubscription = this.ea.subscribe('note:editing', function (note) {
        return _this.noteEditing(note);
      });
    }

    Notes.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: '', moduleId: './no-selection' }, { route: 'new', name: 'new', moduleId: './detail' }, { route: 'edit/:noteId', name: 'edit', moduleId: './detail' }]);

      this.router = router;
    };

    Notes.prototype.activate = function activate(params) {
      var _this2 = this;

      this.filter = params.filter ? params.filter : this.filter;
      return this.server.getNoteList(this.filter).then(function (x) {
        return _this2.noteList = x;
      });
    };

    Notes.prototype.noteUpdated = function noteUpdated(note) {
      var found = this.noteList.find(function (x) {
        return x.id === note.id;
      });
      if (found) {
        Object.assign(found, note);
      } else {
        this.noteList.push(note);
      }
    };

    Notes.prototype.noteEditing = function noteEditing(note) {
      var prev = this.noteList.find(function (x) {
        return x.isActive;
      });
      var next = this.noteList.find(function (x) {
        return x.id === note.id;
      });
      if (next) {
        if (prev) {
          prev.isActive = false;
        }

        next.isActive = true;
      }
    };

    Notes.prototype.detached = function detached() {
      this.updatedSubscription.dispose();
      this.editingSubscription.dispose();
    };

    return Notes;
  }()) || _class);
});
define('notes/no-selection',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var NoSelection = exports.NoSelection = function NoSelection() {
    _classCallCheck(this, NoSelection);
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('settings/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var SettingsIndex = exports.SettingsIndex = function () {
    function SettingsIndex() {
      _classCallCheck(this, SettingsIndex);

      this.firstName = 'John';
      this.lastName = 'Doe';
    }

    SettingsIndex.prototype.submit = function submit() {
      alert('Settings saved!');
    };

    _createClass(SettingsIndex, [{
      key: 'fullName',
      get: function get() {
        return this.firstName + ' ' + this.lastName;
      }
    }]);

    return SettingsIndex;
  }();
});
define('resources/dialogs/common-dialogs',['exports', 'aurelia-framework', 'aurelia-dialog', './message-box'], function (exports, _aureliaFramework, _aureliaDialog, _messageBox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CommonDialogs = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var CommonDialogs = exports.CommonDialogs = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogService), _dec(_class = function () {
    function CommonDialogs(dialogService) {
      _classCallCheck(this, CommonDialogs);

      this.dialogService = dialogService;
    }

    CommonDialogs.prototype.showMessage = function showMessage(message) {
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Message';
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['Ok'];

      return this.dialogService.open({
        viewModel: _messageBox.MessageBox,
        model: { message: message, title: title, options: options }
      });
    };

    return CommonDialogs;
  }()) || _class);
});
define('resources/dialogs/message-box',['exports', 'aurelia-dialog', 'aurelia-framework'], function (exports, _aureliaDialog, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MessageBox = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var MessageBox = exports.MessageBox = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
    function MessageBox(dialogController) {
      _classCallCheck(this, MessageBox);

      this.dialogController = dialogController;
    }

    MessageBox.prototype.activate = function activate(model) {
      this.model = model;
    };

    MessageBox.prototype.selectOption = function selectOption(option) {
      if (isCancel(option)) {
        this.dialogController.cancel(option);
      } else {
        this.dialogController.ok(option);
      }
    };

    return MessageBox;
  }()) || _class);


  function isCancel(option) {
    return ['cancel', 'no'].indexOf(option.toLowerCase()) !== -1;
  }
});
define('resources/elements/loading-indicator',['exports', 'nprogress', 'aurelia-framework'], function (exports, _nprogress, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LoadingIndicator = undefined;

  var _nprogress2 = _interopRequireDefault(_nprogress);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _class, _desc, _value, _class2, _descriptor;

  _nprogress2.default.configure({ showSpinner: false });

  var LoadingIndicator = exports.LoadingIndicator = (_dec = (0, _aureliaFramework.noView)(['nprogress/nprogress.css']), _dec(_class = (_class2 = function () {
    function LoadingIndicator() {
      _classCallCheck(this, LoadingIndicator);

      _initDefineProp(this, 'loading', _descriptor, this);
    }

    LoadingIndicator.prototype.loadingChanged = function loadingChanged(newValue) {
      if (newValue) {
        _nprogress2.default.start();
      } else {
        _nprogress2.default.done();
      }
    };

    return LoadingIndicator;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'loading', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class);
});
define('resources/value-converters/truncate',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TruncateValueConverter = exports.TruncateValueConverter = function () {
    function TruncateValueConverter() {
      _classCallCheck(this, TruncateValueConverter);
    }

    TruncateValueConverter.prototype.toView = function toView(value, maxLength) {
      if (value.length > maxLength) {
        return value.substring(0, maxLength) + '...';
      }

      return value;
    };

    return TruncateValueConverter;
  }();
});
define('aurelia-dialog/ai-dialog',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialog = undefined;

  

  var _dec, _dec2, _class;

  var AiDialog = exports.AiDialog = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialog() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-header',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogHeader = undefined;

  

  var _dec, _dec2, _class, _class2, _temp;

  var AiDialogHeader = exports.AiDialogHeader = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-header'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <button type="button" class="dialog-close" aria-label="Close" if.bind="!controller.settings.lock" click.trigger="controller.cancel()">\n      <span aria-hidden="true">&times;</span>\n    </button>\n\n    <div class="dialog-header-content">\n      <slot></slot>\n    </div>\n  </template>\n'), _dec(_class = _dec2(_class = (_temp = _class2 = function AiDialogHeader(controller) {
    

    this.controller = controller;
  }, _class2.inject = [_dialogController.DialogController], _temp)) || _class) || _class);
});
define('aurelia-dialog/dialog-controller',['exports', './lifecycle', './dialog-result'], function (exports, _lifecycle, _dialogResult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogController = undefined;

  

  var DialogController = exports.DialogController = function () {
    function DialogController(renderer, settings, resolve, reject) {
      

      this.renderer = renderer;
      this.settings = settings;
      this._resolve = resolve;
      this._reject = reject;
    }

    DialogController.prototype.ok = function ok(output) {
      return this.close(true, output);
    };

    DialogController.prototype.cancel = function cancel(output) {
      return this.close(false, output);
    };

    DialogController.prototype.error = function error(message) {
      var _this = this;

      return (0, _lifecycle.invokeLifecycle)(this.viewModel, 'deactivate').then(function () {
        return _this.renderer.hideDialog(_this);
      }).then(function () {
        _this.controller.unbind();
        _this._reject(message);
      });
    };

    DialogController.prototype.close = function close(ok, output) {
      var _this2 = this;

      if (this._closePromise) return this._closePromise;

      this._closePromise = (0, _lifecycle.invokeLifecycle)(this.viewModel, 'canDeactivate').then(function (canDeactivate) {
        if (canDeactivate) {
          return (0, _lifecycle.invokeLifecycle)(_this2.viewModel, 'deactivate').then(function () {
            return _this2.renderer.hideDialog(_this2);
          }).then(function () {
            var result = new _dialogResult.DialogResult(!ok, output);
            _this2.controller.unbind();
            _this2._resolve(result);
            return result;
          });
        }

        return Promise.resolve();
      });

      return this._closePromise;
    };

    return DialogController;
  }();
});
define('aurelia-dialog/lifecycle',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.invokeLifecycle = invokeLifecycle;
  function invokeLifecycle(instance, name, model) {
    if (typeof instance[name] === 'function') {
      var result = instance[name](model);

      if (result instanceof Promise) {
        return result;
      }

      if (result !== null && result !== undefined) {
        return Promise.resolve(result);
      }

      return Promise.resolve(true);
    }

    return Promise.resolve(true);
  }
});
define('aurelia-dialog/dialog-result',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var DialogResult = exports.DialogResult = function DialogResult(cancelled, output) {
    

    this.wasCancelled = false;

    this.wasCancelled = cancelled;
    this.output = output;
  };
});
define('aurelia-dialog/ai-dialog-body',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogBody = undefined;

  

  var _dec, _dec2, _class;

  var AiDialogBody = exports.AiDialogBody = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-body'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n  </template>\n'), _dec(_class = _dec2(_class = function AiDialogBody() {
    
  }) || _class) || _class);
});
define('aurelia-dialog/ai-dialog-footer',['exports', 'aurelia-templating', './dialog-controller'], function (exports, _aureliaTemplating, _dialogController) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AiDialogFooter = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _class, _desc, _value, _class2, _descriptor, _descriptor2, _class3, _temp;

  var AiDialogFooter = exports.AiDialogFooter = (_dec = (0, _aureliaTemplating.customElement)('ai-dialog-footer'), _dec2 = (0, _aureliaTemplating.inlineView)('\n  <template>\n    <slot></slot>\n\n    <template if.bind="buttons.length > 0">\n      <button type="button" class="btn btn-default" repeat.for="button of buttons" click.trigger="close(button)">${button}</button>\n    </template>\n  </template>\n'), _dec(_class = _dec2(_class = (_class2 = (_temp = _class3 = function () {
    function AiDialogFooter(controller) {
      

      _initDefineProp(this, 'buttons', _descriptor, this);

      _initDefineProp(this, 'useDefaultButtons', _descriptor2, this);

      this.controller = controller;
    }

    AiDialogFooter.prototype.close = function close(buttonValue) {
      if (AiDialogFooter.isCancelButton(buttonValue)) {
        this.controller.cancel(buttonValue);
      } else {
        this.controller.ok(buttonValue);
      }
    };

    AiDialogFooter.prototype.useDefaultButtonsChanged = function useDefaultButtonsChanged(newValue) {
      if (newValue) {
        this.buttons = ['Cancel', 'Ok'];
      }
    };

    AiDialogFooter.isCancelButton = function isCancelButton(value) {
      return value === 'Cancel';
    };

    return AiDialogFooter;
  }(), _class3.inject = [_dialogController.DialogController], _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'buttons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return [];
    }
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, 'useDefaultButtons', [_aureliaTemplating.bindable], {
    enumerable: true,
    initializer: function initializer() {
      return false;
    }
  })), _class2)) || _class) || _class);
});
define('aurelia-dialog/attach-focus',['exports', 'aurelia-templating'], function (exports, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.AttachFocus = undefined;

  

  var _dec, _class, _class2, _temp;

  var AttachFocus = exports.AttachFocus = (_dec = (0, _aureliaTemplating.customAttribute)('attach-focus'), _dec(_class = (_temp = _class2 = function () {
    function AttachFocus(element) {
      

      this.value = true;

      this.element = element;
    }

    AttachFocus.prototype.attached = function attached() {
      if (this.value && this.value !== 'false') {
        this.element.focus();
      }
    };

    AttachFocus.prototype.valueChanged = function valueChanged(newValue) {
      this.value = newValue;
    };

    return AttachFocus;
  }(), _class2.inject = [Element], _temp)) || _class);
});
define('aurelia-dialog/dialog-configuration',['exports', './renderer', './dialog-renderer', './dialog-options', 'aurelia-pal'], function (exports, _renderer, _dialogRenderer, _dialogOptions, _aureliaPal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogConfiguration = undefined;

  

  var defaultRenderer = _dialogRenderer.DialogRenderer;

  var resources = {
    'ai-dialog': './ai-dialog',
    'ai-dialog-header': './ai-dialog-header',
    'ai-dialog-body': './ai-dialog-body',
    'ai-dialog-footer': './ai-dialog-footer',
    'attach-focus': './attach-focus'
  };

  var defaultCSSText = 'ai-dialog-container,ai-dialog-overlay{position:fixed;top:0;right:0;bottom:0;left:0}ai-dialog,ai-dialog-container>div>div{min-width:300px;margin:auto;display:block}ai-dialog-overlay{opacity:0}ai-dialog-overlay.active{opacity:1}ai-dialog-container{display:block;transition:opacity .2s linear;opacity:0;overflow-x:hidden;overflow-y:auto;-webkit-overflow-scrolling:touch}ai-dialog-container.active{opacity:1}ai-dialog-container>div{padding:30px}ai-dialog-container>div>div{width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content}ai-dialog-container,ai-dialog-container>div,ai-dialog-container>div>div{outline:0}ai-dialog{box-shadow:0 5px 15px rgba(0,0,0,.5);border:1px solid rgba(0,0,0,.2);border-radius:5px;padding:3;width:-moz-fit-content;width:-webkit-fit-content;width:fit-content;height:-moz-fit-content;height:-webkit-fit-content;height:fit-content;border-image-source:initial;border-image-slice:initial;border-image-width:initial;border-image-outset:initial;border-image-repeat:initial;background:#fff}ai-dialog>ai-dialog-header{display:block;padding:16px;border-bottom:1px solid #e5e5e5}ai-dialog>ai-dialog-header>button{float:right;border:none;display:block;width:32px;height:32px;background:0 0;font-size:22px;line-height:16px;margin:-14px -16px 0 0;padding:0;cursor:pointer}ai-dialog>ai-dialog-body{display:block;padding:16px}ai-dialog>ai-dialog-footer{display:block;padding:6px;border-top:1px solid #e5e5e5;text-align:right}ai-dialog>ai-dialog-footer button{color:#333;background-color:#fff;padding:6px 12px;font-size:14px;text-align:center;white-space:nowrap;vertical-align:middle;-ms-touch-action:manipulation;touch-action:manipulation;cursor:pointer;background-image:none;border:1px solid #ccc;border-radius:4px;margin:5px 0 5px 5px}ai-dialog>ai-dialog-footer button:disabled{cursor:default;opacity:.45}ai-dialog>ai-dialog-footer button:hover:enabled{color:#333;background-color:#e6e6e6;border-color:#adadad}.ai-dialog-open{overflow:hidden}';

  var DialogConfiguration = exports.DialogConfiguration = function () {
    function DialogConfiguration(aurelia) {
      

      this.aurelia = aurelia;
      this.settings = _dialogOptions.dialogOptions;
      this.resources = [];
      this.cssText = defaultCSSText;
      this.renderer = defaultRenderer;
    }

    DialogConfiguration.prototype.useDefaults = function useDefaults() {
      return this.useRenderer(defaultRenderer).useCSS(defaultCSSText).useStandardResources();
    };

    DialogConfiguration.prototype.useStandardResources = function useStandardResources() {
      return this.useResource('ai-dialog').useResource('ai-dialog-header').useResource('ai-dialog-body').useResource('ai-dialog-footer').useResource('attach-focus');
    };

    DialogConfiguration.prototype.useResource = function useResource(resourceName) {
      this.resources.push(resourceName);
      return this;
    };

    DialogConfiguration.prototype.useRenderer = function useRenderer(renderer, settings) {
      this.renderer = renderer;
      this.settings = Object.assign(this.settings, settings || {});
      return this;
    };

    DialogConfiguration.prototype.useCSS = function useCSS(cssText) {
      this.cssText = cssText;
      return this;
    };

    DialogConfiguration.prototype._apply = function _apply() {
      var _this = this;

      this.aurelia.transient(_renderer.Renderer, this.renderer);
      this.resources.forEach(function (resourceName) {
        return _this.aurelia.globalResources(resources[resourceName]);
      });

      if (this.cssText) {
        _aureliaPal.DOM.injectStyles(this.cssText);
      }
    };

    return DialogConfiguration;
  }();
});
define('aurelia-dialog/renderer',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  

  var Renderer = exports.Renderer = function () {
    function Renderer() {
      
    }

    Renderer.prototype.getDialogContainer = function getDialogContainer() {
      throw new Error('DialogRenderer must implement getDialogContainer().');
    };

    Renderer.prototype.showDialog = function showDialog(dialogController) {
      throw new Error('DialogRenderer must implement showDialog().');
    };

    Renderer.prototype.hideDialog = function hideDialog(dialogController) {
      throw new Error('DialogRenderer must implement hideDialog().');
    };

    return Renderer;
  }();
});
define('aurelia-dialog/dialog-renderer',['exports', './dialog-options', 'aurelia-pal', 'aurelia-dependency-injection'], function (exports, _dialogOptions, _aureliaPal, _aureliaDependencyInjection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogRenderer = undefined;

  

  var _dec, _class;

  var containerTagName = 'ai-dialog-container';
  var overlayTagName = 'ai-dialog-overlay';
  var transitionEvent = function () {
    var transition = null;

    return function () {
      if (transition) return transition;

      var t = void 0;
      var el = _aureliaPal.DOM.createElement('fakeelement');
      var transitions = {
        'transition': 'transitionend',
        'OTransition': 'oTransitionEnd',
        'MozTransition': 'transitionend',
        'WebkitTransition': 'webkitTransitionEnd'
      };
      for (t in transitions) {
        if (el.style[t] !== undefined) {
          transition = transitions[t];
          return transition;
        }
      }
    };
  }();

  var DialogRenderer = exports.DialogRenderer = (_dec = (0, _aureliaDependencyInjection.transient)(), _dec(_class = function () {
    function DialogRenderer() {
      var _this = this;

      

      this.dialogControllers = [];

      this.escapeKeyEvent = function (e) {
        if (e.keyCode === 27) {
          var top = _this.dialogControllers[_this.dialogControllers.length - 1];
          if (top && top.settings.lock !== true) {
            top.cancel();
          }
        }
      };

      this.defaultSettings = _dialogOptions.dialogOptions;
    }

    DialogRenderer.prototype.getDialogContainer = function getDialogContainer() {
      return _aureliaPal.DOM.createElement('div');
    };

    DialogRenderer.prototype.showDialog = function showDialog(dialogController) {
      var _this2 = this;

      var settings = Object.assign({}, this.defaultSettings, dialogController.settings);
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];
      var wrapper = document.createElement('div');

      this.modalOverlay = _aureliaPal.DOM.createElement(overlayTagName);
      this.modalContainer = _aureliaPal.DOM.createElement(containerTagName);
      this.anchor = dialogController.slot.anchor;
      wrapper.appendChild(this.anchor);
      this.modalContainer.appendChild(wrapper);

      this.stopPropagation = function (e) {
        e._aureliaDialogHostClicked = true;
      };
      this.closeModalClick = function (e) {
        if (!settings.lock && !e._aureliaDialogHostClicked) {
          dialogController.cancel();
        } else {
          return false;
        }
      };

      dialogController.centerDialog = function () {
        if (settings.centerHorizontalOnly) return;
        centerDialog(_this2.modalContainer);
      };

      this.modalOverlay.style.zIndex = this.defaultSettings.startingZIndex;
      this.modalContainer.style.zIndex = this.defaultSettings.startingZIndex;

      var lastContainer = Array.from(body.querySelectorAll(containerTagName)).pop();

      if (lastContainer) {
        lastContainer.parentNode.insertBefore(this.modalContainer, lastContainer.nextSibling);
        lastContainer.parentNode.insertBefore(this.modalOverlay, lastContainer.nextSibling);
      } else {
        body.insertBefore(this.modalContainer, body.firstChild);
        body.insertBefore(this.modalOverlay, body.firstChild);
      }

      if (!this.dialogControllers.length) {
        _aureliaPal.DOM.addEventListener('keyup', this.escapeKeyEvent);
      }

      this.dialogControllers.push(dialogController);

      dialogController.slot.attached();

      if (typeof settings.position === 'function') {
        settings.position(this.modalContainer, this.modalOverlay);
      } else {
        dialogController.centerDialog();
      }

      this.modalContainer.addEventListener('click', this.closeModalClick);
      this.anchor.addEventListener('click', this.stopPropagation);

      return new Promise(function (resolve) {
        var renderer = _this2;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this2.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this2.modalOverlay.classList.add('active');
        _this2.modalContainer.classList.add('active');
        body.classList.add('ai-dialog-open');

        function onTransitionEnd(e) {
          if (e.target !== renderer.modalContainer) {
            return;
          }
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      });
    };

    DialogRenderer.prototype.hideDialog = function hideDialog(dialogController) {
      var _this3 = this;

      var settings = Object.assign({}, this.defaultSettings, dialogController.settings);
      var body = _aureliaPal.DOM.querySelectorAll('body')[0];

      this.modalContainer.removeEventListener('click', this.closeModalClick);
      this.anchor.removeEventListener('click', this.stopPropagation);

      var i = this.dialogControllers.indexOf(dialogController);
      if (i !== -1) {
        this.dialogControllers.splice(i, 1);
      }

      if (!this.dialogControllers.length) {
        _aureliaPal.DOM.removeEventListener('keyup', this.escapeKeyEvent);
      }

      return new Promise(function (resolve) {
        var renderer = _this3;
        if (settings.ignoreTransitions) {
          resolve();
        } else {
          _this3.modalContainer.addEventListener(transitionEvent(), onTransitionEnd);
        }

        _this3.modalOverlay.classList.remove('active');
        _this3.modalContainer.classList.remove('active');

        function onTransitionEnd() {
          renderer.modalContainer.removeEventListener(transitionEvent(), onTransitionEnd);
          resolve();
        }
      }).then(function () {
        body.removeChild(_this3.modalOverlay);
        body.removeChild(_this3.modalContainer);
        dialogController.slot.detached();

        if (!_this3.dialogControllers.length) {
          body.classList.remove('ai-dialog-open');
        }

        return Promise.resolve();
      });
    };

    return DialogRenderer;
  }()) || _class);


  function centerDialog(modalContainer) {
    var child = modalContainer.children[0];
    var vh = Math.max(_aureliaPal.DOM.querySelectorAll('html')[0].clientHeight, window.innerHeight || 0);

    child.style.marginTop = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
    child.style.marginBottom = Math.max((vh - child.offsetHeight) / 2, 30) + 'px';
  }
});
define('aurelia-dialog/dialog-options',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var dialogOptions = exports.dialogOptions = {
    lock: true,
    centerHorizontalOnly: false,
    startingZIndex: 1000,
    ignoreTransitions: false
  };
});
define('aurelia-dialog/dialog-service',['exports', 'aurelia-metadata', 'aurelia-dependency-injection', 'aurelia-templating', './dialog-controller', './renderer', './lifecycle', './dialog-result'], function (exports, _aureliaMetadata, _aureliaDependencyInjection, _aureliaTemplating, _dialogController, _renderer, _lifecycle, _dialogResult) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DialogService = undefined;

  

  var _class, _temp;

  var DialogService = exports.DialogService = (_temp = _class = function () {
    function DialogService(container, compositionEngine) {
      

      this.container = container;
      this.compositionEngine = compositionEngine;
      this.controllers = [];
      this.hasActiveDialog = false;
    }

    DialogService.prototype.open = function open(settings) {
      var _this = this;

      var dialogController = void 0;

      var promise = new Promise(function (resolve, reject) {
        var childContainer = _this.container.createChild();
        dialogController = new _dialogController.DialogController(childContainer.get(_renderer.Renderer), settings, resolve, reject);
        childContainer.registerInstance(_dialogController.DialogController, dialogController);
        return _openDialog(_this, childContainer, dialogController);
      });

      return promise.then(function (result) {
        var i = _this.controllers.indexOf(dialogController);
        if (i !== -1) {
          _this.controllers.splice(i, 1);
          _this.hasActiveDialog = !!_this.controllers.length;
        }

        return result;
      });
    };

    DialogService.prototype.openAndYieldController = function openAndYieldController(settings) {
      var _this2 = this;

      var childContainer = this.container.createChild();
      var dialogController = new _dialogController.DialogController(childContainer.get(_renderer.Renderer), settings, null, null);
      childContainer.registerInstance(_dialogController.DialogController, dialogController);

      dialogController.result = new Promise(function (resolve, reject) {
        dialogController._resolve = resolve;
        dialogController._reject = reject;
      }).then(function (result) {
        var i = _this2.controllers.indexOf(dialogController);
        if (i !== -1) {
          _this2.controllers.splice(i, 1);
          _this2.hasActiveDialog = !!_this2.controllers.length;
        }
        return result;
      });

      return _openDialog(this, childContainer, dialogController).then(function () {
        return dialogController;
      });
    };

    return DialogService;
  }(), _class.inject = [_aureliaDependencyInjection.Container, _aureliaTemplating.CompositionEngine], _temp);


  function _openDialog(service, childContainer, dialogController) {
    var host = dialogController.renderer.getDialogContainer();
    var instruction = {
      container: service.container,
      childContainer: childContainer,
      model: dialogController.settings.model,
      view: dialogController.settings.view,
      viewModel: dialogController.settings.viewModel,
      viewSlot: new _aureliaTemplating.ViewSlot(host, true),
      host: host
    };

    return _getViewModel(instruction, service.compositionEngine).then(function (returnedInstruction) {
      dialogController.viewModel = returnedInstruction.viewModel;
      dialogController.slot = returnedInstruction.viewSlot;

      return (0, _lifecycle.invokeLifecycle)(dialogController.viewModel, 'canActivate', dialogController.settings.model).then(function (canActivate) {
        if (canActivate) {
          service.controllers.push(dialogController);
          service.hasActiveDialog = !!service.controllers.length;

          return service.compositionEngine.compose(returnedInstruction).then(function (controller) {
            dialogController.controller = controller;
            dialogController.view = controller.view;

            return dialogController.renderer.showDialog(dialogController);
          });
        }
      });
    });
  }

  function _getViewModel(instruction, compositionEngine) {
    if (typeof instruction.viewModel === 'function') {
      instruction.viewModel = _aureliaMetadata.Origin.get(instruction.viewModel).moduleId;
    }

    if (typeof instruction.viewModel === 'string') {
      return compositionEngine.ensureViewModel(instruction);
    }

    return Promise.resolve(instruction);
  }
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./app.css\"></require>\r\n  <require from=\"./resources/elements/loading-indicator\"></require>\r\n\r\n  <header>\r\n    <h1>Aurelia Notes</h1>\r\n    <a class=\"button\" href=\"#/notes/new\">New Note</a>\r\n  </header>\r\n\r\n  <loading-indicator loading.bind=\"router.isNavigating\"></loading-indicator>\r\n\r\n  <main>\r\n    <nav class=\"main\">\r\n      <ul>\r\n        <li repeat.for=\"route of router.navigation\" class=\"${route.isActive ? 'active' : ''}\">\r\n          <a href.bind=\"route.href\" title.bind=\"route.title\">\r\n            <i class=\"fa fa-${route.settings.icon}\"></i>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n    </nav>\r\n\r\n    <router-view></router-view>\r\n  </main>\r\n</template>\r\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "* {\r\n  box-sizing: border-box;\r\n}\r\n\r\nhtml, body {\r\n  margin: 0;\r\n  padding: 0;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\nheader {\r\n  padding: 12px;\r\n  background-color: #F1F0F0;\r\n  position: absolute;\r\n  top: 0;\r\n  right: 0;\r\n  left: 0;\r\n  height: 64px;\r\n}\r\n\r\nheader h1 {\r\n  margin: 0;\r\n  padding: 0;\r\n  float: left;\r\n}\r\n\r\nheader a.button {\r\n  float: right;\r\n  text-decoration: none;\r\n  margin-top: 4px;\r\n}\r\n\r\nmain {\r\n  position: absolute;\r\n  top: 64px;\r\n  left: 0;\r\n  right: 0;\r\n  bottom: 0;\r\n  display: flex;\r\n  flex-direction: row;\r\n}\r\n\r\nnav.main {\r\n  background: #0092C3;\r\n  border-right: 1px solid gray;\r\n}\r\n\r\nnav > ul {\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style: none;\r\n}\r\n\r\nnav.main > ul > li > a {\r\n  padding: 16px;\r\n  display: block;\r\n}\r\n\r\nnav.main > ul > li > a > i {\r\n  color: white;\r\n  font-size: 22px !important;\r\n}\r\n\r\nnav.main > ul > li.active > a > i {\r\n  text-shadow: 0 0 20px white;\r\n}\r\n\r\nnav.main > ul > li:last-child {\r\n  position: absolute;\r\n  bottom: 0;\r\n}\r\n\r\nmain > router-view {\r\n  flex: 1;\r\n  border-top: 1px solid rgba(128, 128, 128, 0.25);\r\n}\r\n\r\nbutton, a.button {\r\n  padding: 6px 12px;\r\n  color: #fff;\r\n  background-color: #5cb85c;\r\n  border-color: #4cae4c;\r\n  border: 1px solid transparent;\r\n  border-radius: 4px;\r\n  font-size: 14px;\r\n}\r\n\r\nrouter-view {\r\n  display: block;\r\n  height: 100%;\r\n  width: 100%;\r\n}\r\n\r\nsection.au-enter-active {\r\n  -webkit-animation: fadeIn 1s;\r\n  animation: fadeIn 1s;\r\n}\r\n\r\n@-webkit-keyframes fadeIn {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\n@keyframes fadeIn {\r\n  0% {\r\n    opacity: 0;\r\n  }\r\n  100% {\r\n    opacity: 1;\r\n  }\r\n}\r\n\r\nai-dialog > ai-dialog-header {\r\n  background: #0092C3;\r\n  color: white;\r\n  border-radius: 4px 4px 0 0;\r\n  font-weight: bold;\r\n  letter-spacing: 1px;\r\n  font-size: 16px;\r\n}\r\n"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./welcome.css\"></require>\r\n\r\n  <section class=\"welcome\">\r\n    Welcome to Aurelia Notes!\r\n  </section>\r\n</template>\r\n"; });
define('text!welcome.css', ['module'], function(module) { module.exports = ".welcome {\r\n  width: 100%;\r\n  height: 100%;\r\n\r\n  display: flex;\r\n\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 28px;\r\n}\r\n"; });
define('text!notebooks/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./index.css\"></require>\r\n\r\n  <section class=\"notebook-list au-animate\">\r\n    <form role=\"form\" submit.trigger=\"createNotebook()\">\r\n        <input type=\"text\" placeholder=\"Notebook name\" value.bind=\"notebookName\" />\r\n          <button type=\"submit\">Create Notebook</button>\r\n    </form>\r\n    <div>\r\n      <ul>\r\n        <li repeat.for=\"notebook of notebookList\">\r\n          <a route-href=\"route: notes; params.bind: { filter : notebook.id }\">\r\n            <h3>${notebook.title}</h3>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </section>\r\n</template>\r\n"; });
define('text!notebooks/index.css', ['module'], function(module) { module.exports = "section.notebook-list {\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n\r\nsection.notebook-list ul {\r\n  margin: 0;\r\n  padding: 0;\r\n  list-style: none;\r\n}\r\n\r\nsection.notebook-list li {\r\n  border-bottom: 1px solid #F1F0F0;\r\n  padding: 12px;\r\n}\r\n\r\nsection.notebook-list h3 {\r\n  margin: 0;\r\n}\r\n\r\nsection.notebook-list a {\r\n  text-decoration: none;\r\n  color: black;\r\n}\r\n\r\nsection.notebook-list > form {\r\n  background-color: #F1F0F0;\r\n  padding: 12px;\r\n  border-bottom: 1px solid rgba(128, 128, 128, 0.25);\r\n}\r\n\r\nsection.notebook-list > form input {\r\n  font-size: 20px;\r\n  position: relative;\r\n  top: 2px;\r\n}\r\n\r\nsection.notebook-list > div {\r\n  flex: 1;\r\n}\r\n"; });
define('text!notes/detail.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./detail.css\"></require>\r\n\r\n  <form class=\"note\" submit.trigger=\"save()\">\r\n    <div class=\"title\">\r\n      <input type=\"text\" value.bind=\"note.title\" placeholder=\"title\">\r\n\r\n      <div class=\"notebook-selector\">\r\n        <span>In </span>\r\n        <select value.bind=\"note.notebookId\">\r\n          <option repeat.for=\"notebook of notebooks\" model.bind=\"notebook.id\">${notebook.title}</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"body\">\r\n      <textarea value.bind=\"note.body\" placeholder=\"body\"></textarea>\r\n    </div>\r\n\r\n    <div class=\"button-bar\">\r\n      <button type=\"submit\">Save</button>\r\n    </div>\r\n  </form>\r\n</template>\r\n"; });
define('text!notes/detail.css', ['module'], function(module) { module.exports = ".note {\r\n  padding: 12px;\r\n  display: flex;\r\n  flex-direction: column;\r\n  height: 100%;\r\n}\r\n\r\n.note div.body {\r\n  flex: 1;\r\n  position: relative;\r\n}\r\n\r\n.note div.notebook-selector {\r\n  float: right;\r\n  margin-top: 8px;\r\n}\r\n\r\n.note div.notebook-selector span {\r\n  position: relative;\r\n  top: 2px;\r\n}\r\n\r\n.note input {\r\n  font-size: 28px;\r\n  background-color: transparent;\r\n  border: none;\r\n  outline: none;\r\n}\r\n\r\n.note textarea {\r\n  background: transparent;\r\n  resize: none;\r\n  outline: none;\r\n  border: none;\r\n  height: 100%;\r\n  font-size: 18px;\r\n  position: absolute;\r\n  top: 0;\r\n  left: 0;\r\n  width: 100%;\r\n  bottom: 0;\r\n}\r\n\r\n.note .button-bar {\r\n  text-align: right;\r\n}\r\n"; });
define('text!notes/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./index.css\"></require>\r\n  <require from=\"resources/value-converters/truncate\"></require>\r\n\r\n  <section class=\"notes au-animate\">\r\n    <nav class=\"list\">\r\n      <ul>\r\n        <li repeat.for=\"note of noteList\" class=\"${note.isActive ? 'active' : ''}\">\r\n          <a route-href=\"route: edit; params.bind: {noteId: note.id}\">\r\n            <h3>${note.title}</h3>\r\n            <p>${note.body | truncate:50}</p>\r\n          </a>\r\n        </li>\r\n      </ul>\r\n    </nav>\r\n\r\n    <section class=\"detail\">\r\n      <router-view></router-view>\r\n    </section>\r\n  </section>\r\n</template>\r\n"; });
define('text!notes/index.css', ['module'], function(module) { module.exports = ".notes {\r\n  display: flex;\r\n  flex-direction: row;\r\n  height: 100%;\r\n}\r\n\r\n.notes .list {\r\n  padding: 8px;\r\n  width: 264px;\r\n  border-right: 1px solid rgba(128, 128, 128, 0.25);\r\n}\r\n\r\n.notes .list li {\r\n  padding: 12px;\r\n  border: 1px solid rgba(128, 128, 128, 0.25);\r\n  margin: 4px;\r\n  border-radius: 4px;\r\n}\r\n\r\n.notes .list li.active {\r\n  border-color: #0092C3;\r\n  box-shadow: 0 0 5px #0092C3;\r\n}\r\n\r\n.notes .list p, .notes .list h3 {\r\n  margin: 0;\r\n}\r\n\r\n.notes .list a {\r\n  text-decoration: none;\r\n  color: black;\r\n}\r\n\r\n.notes .detail {\r\n  flex: 1;\r\n  height: 100%;\r\n}\r\n"; });
define('text!notes/no-selection.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./no-selection.css\"></require>\r\n  <div class=\"no-note-selected\">\r\n    Please select a note or&nbsp;<a route-href=\"route: new\">create a new note</a>.\r\n  </div>\r\n</template>\r\n"; });
define('text!notes/no-selection.css', ['module'], function(module) { module.exports = ".no-note-selected {\r\n  width: 100%;\r\n  height: 100%;\r\n\r\n  display: flex;\r\n\r\n  align-items: center;\r\n  justify-content: center;\r\n  font-size: 28px;\r\n}\r\n"; });
define('text!settings/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./index.css\"></require>\r\n\r\n  <section class=\"settings au-animate\">\r\n    <form role=\"form\" submit.trigger=\"submit()\">\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" placeholder=\"First Name\" value.bind=\"firstName\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <input type=\"text\" class=\"form-control\" placeholder=\"Second Name\" value.bind=\"lastName\" />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>Full Name</label>\r\n        <p class=\"help-block\">${fullName}</p>\r\n      </div>\r\n      <button type=\"submit\" class=\"btn btn-default\">Save</button>\r\n    </form>\r\n  </section>\r\n</template>\r\n"; });
define('text!settings/index.css', ['module'], function(module) { module.exports = "section.settings {\r\n  padding: 12px;\r\n}\r\n"; });
define('text!resources/dialogs/message-box.html', ['module'], function(module) { module.exports = "<template>\r\n  <ai-dialog style=\"max-width: 325px\">\r\n    <ai-dialog-header>${model.title}</ai-dialog-header>\r\n\r\n    <ai-dialog-body>\r\n      ${model.message}\r\n    </ai-dialog-body>\r\n\r\n    <ai-dialog-footer>\r\n      <button repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n    </ai-dialog-footer>\r\n  </ai-dialog>\r\n</template>\r\n"; });
//# sourceMappingURL=app-bundle.js.map