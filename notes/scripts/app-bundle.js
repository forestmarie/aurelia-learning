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
    aurelia.use.standardConfiguration().feature('resources').plugin('aurelia-animator-css');

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
define('notes/detail',['exports', 'backend/server', 'aurelia-router', 'aurelia-framework'], function (exports, _server, _aureliaRouter, _aureliaFramework) {
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

  var Detail = exports.Detail = (_dec = (0, _aureliaFramework.inject)(_server.Server, _aureliaRouter.Router), _dec(_class = function () {
    function Detail(server, router) {
      _classCallCheck(this, Detail);

      this.server = server;
      this.router = router;
    }

    Detail.prototype.canActivate = function canActivate(params) {
      var _this = this;

      return this.server.getNotebookList().then(function (notebooks) {
        return _this.notebooks = notebooks;
      }).then(function () {
        if (!params.noteId) {
          return _this.server.newNote();
        }
        return _this.server.getNote(params.noteId);
      }).then(function (note) {
        if (note) {
          _this.edit(note);
        } else {
          return new _aureliaRouter.Redirect('');
        }
      });
    };

    Detail.prototype.edit = function edit(note) {
      this.note = note;
      this.original = JSON.parse(JSON.stringify(note));
    };

    Detail.prototype.save = function save() {
      var _this2 = this;

      var isNew = !this.note.id;
      this.server.saveNote(this.note).then(function (note) {
        _this2.edit(note);
      });
    };

    return Detail;
  }()) || _class);
});
define('notes/index',['exports', 'backend/server', 'aurelia-framework'], function (exports, _server, _aureliaFramework) {
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

  var Notes = exports.Notes = (_dec = (0, _aureliaFramework.inject)(_server.Server), _dec(_class = function () {
    function Notes(server) {
      _classCallCheck(this, Notes);

      this.server = server;
      this.filter = 'none';
      this.noteList = [];
    }

    Notes.prototype.configureRouter = function configureRouter(config, router) {
      config.map([{ route: '', moduleId: './no-selection' }, { route: 'new', moduleId: './detail', name: 'new' }, { route: 'edit/:noteId', name: 'edit', moduleId: './detail' }]);

      this.router = router;
    };

    Notes.prototype.activate = function activate(params) {
      var _this = this;

      this.filter = params.filter ? params.filter : this.filter;
      return this.server.getNoteList(this.filter).then(function (x) {
        return _this.noteList = x;
      });
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <require from=\"./resources/elements/loading-indicator\"></require>\n\n  <header>\n    <h1>Aurelia Notes</h1>\n    <a class=\"button\" href=\"#/notes/new\">New Note</a>\n  </header>\n\n  <loading-indicator loading.bind=\"router.isNavigating\"></loading-indicator>\n\n  <main>\n    <nav class=\"main\">\n      <ul>\n        <li repeat.for=\"route of router.navigation\" class=\"${route.isActive ? 'active' : ''}\">\n          <a href.bind=\"route.href\" title.bind=\"route.title\">\n            <i class=\"fa fa-${route.settings.icon}\"></i>\n          </a>\n        </li>\n      </ul>\n    </nav>\n\n    <router-view></router-view>\n  </main>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "* {\n  box-sizing: border-box;\n}\n\nhtml, body {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n}\n\nheader {\n  padding: 12px;\n  background-color: #F1F0F0;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 64px;\n}\n\nheader h1 {\n  margin: 0;\n  padding: 0;\n  float: left;\n}\n\nheader a.button {\n  float: right;\n  text-decoration: none;\n  margin-top: 4px;\n}\n\nmain {\n  position: absolute;\n  top: 64px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: row;\n}\n\nnav.main {\n  background: #0092C3;\n  border-right: 1px solid gray;\n}\n\nnav > ul {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\nnav.main > ul > li > a {\n  padding: 16px;\n  display: block;\n}\n\nnav.main > ul > li > a > i {\n  color: white;\n  font-size: 22px !important;\n}\n\nnav.main > ul > li.active > a > i {\n  text-shadow: 0 0 20px white;\n}\n\nnav.main > ul > li:last-child {\n  position: absolute;\n  bottom: 0;\n}\n\nmain > router-view {\n  flex: 1;\n  border-top: 1px solid rgba(128, 128, 128, 0.25);\n}\n\nbutton, a.button {\n  padding: 6px 12px;\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  font-size: 14px;\n}\n\nrouter-view {\n  display: block;\n  height: 100%;\n  width: 100%;\n}\n\nsection.au-enter-active {\n  -webkit-animation: fadeIn 1s;\n  animation: fadeIn 1s;\n}\n\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\nai-dialog > ai-dialog-header {\n  background: #0092C3;\n  color: white;\n  border-radius: 4px 4px 0 0;\n  font-weight: bold;\n  letter-spacing: 1px;\n  font-size: 16px;\n}\n"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./welcome.css\"></require>\n\n  <section class=\"welcome\">\n    Welcome to Aurelia Notes!\n  </section>\n</template>\n"; });
define('text!welcome.css', ['module'], function(module) { module.exports = ".welcome {\n  width: 100%;\n  height: 100%;\n\n  display: flex;\n\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n}\n"; });
define('text!notebooks/index.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./index.css\"></require>\n\n  <section class=\"notebook-list au-animate\">\n    <form role=\"form\" submit.trigger=\"createNotebook()\">\n        <input type=\"text\" placeholder=\"Notebook name\" value.bind=\"notebookName\" />\n          <button type=\"submit\">Create Notebook</button>\n    </form>\n    <div>\n      <ul>\n        <li repeat.for=\"notebook of notebookList\">\n          <a route-href=\"route: notes; params.bind: { filter : notebook.id }\">\n            <h3>${notebook.title}</h3>\n          </a>\n        </li>\n      </ul>\n    </div>\n  </section>\n</template>\n"; });
define('text!notebooks/index.css', ['module'], function(module) { module.exports = "section.notebook-list {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\nsection.notebook-list ul {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\nsection.notebook-list li {\n  border-bottom: 1px solid #F1F0F0;\n  padding: 12px;\n}\n\nsection.notebook-list h3 {\n  margin: 0;\n}\n\nsection.notebook-list a {\n  text-decoration: none;\n  color: black;\n}\n\nsection.notebook-list > form {\n  background-color: #F1F0F0;\n  padding: 12px;\n  border-bottom: 1px solid rgba(128, 128, 128, 0.25);\n}\n\nsection.notebook-list > form input {\n  font-size: 20px;\n  position: relative;\n  top: 2px;\n}\n\nsection.notebook-list > div {\n  flex: 1;\n}\n"; });
define('text!notes/detail.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./detail.css\"></require>\n\n  <form class=\"note\" submit.trigger=\"save()\">\n    <div class=\"title\">\n      <input type=\"text\" value.bind=\"note.title\" placeholder=\"title\">\n\n      <div class=\"notebook-selector\">\n        <span>In </span>\n        <select value.bind=\"note.notebookId\">\n          <option repeat.for=\"notebook of notebooks\" model.bind=\"notebook.id\">${notebook.title}</option>\n        </select>\n      </div>\n    </div>\n\n    <div class=\"body\">\n      <textarea value.bind=\"note.body\" placeholder=\"body\"></textarea>\n    </div>\n\n    <div class=\"button-bar\">\n      <button type=\"submit\">Save</button>\n    </div>\n  </form>\n</template>\n"; });
define('text!notes/detail.css', ['module'], function(module) { module.exports = ".note {\n  padding: 12px;\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n\n.note div.body {\n  flex: 1;\n  position: relative;\n}\n\n.note div.notebook-selector {\n  float: right;\n  margin-top: 8px;\n}\n\n.note div.notebook-selector span {\n  position: relative;\n  top: 2px;\n}\n\n.note input {\n  font-size: 28px;\n  background-color: transparent;\n  border: none;\n  outline: none;\n}\n\n.note textarea {\n  background: transparent;\n  resize: none;\n  outline: none;\n  border: none;\n  height: 100%;\n  font-size: 18px;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  bottom: 0;\n}\n\n.note .button-bar {\n  text-align: right;\n}\n"; });
define('text!notes/index.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./index.css\"></require>\n  <require from=\"resources/value-converters/truncate\"></require>\n\n  <section class=\"notes au-animate\">\n    <nav class=\"list\">\n      <ul>\n        <li repeat.for=\"note of noteList\" class=\"${note.isActive ? 'active' : ''}\">\n          <a route-href=\"route: edit; params.bind: {noteId: note.id}\">\n            <h3>${note.title}</h3>\n            <p>${note.body | truncate:50}</p>\n          </a>\n        </li>\n      </ul>\n    </nav>\n\n    <section class=\"detail\">\n      <router-view></router-view>\n    </section>\n  </section>\n</template>\n"; });
define('text!notes/index.css', ['module'], function(module) { module.exports = ".notes {\n  display: flex;\n  flex-direction: row;\n  height: 100%;\n}\n\n.notes .list {\n  padding: 8px;\n  width: 264px;\n  border-right: 1px solid rgba(128, 128, 128, 0.25);\n}\n\n.notes .list li {\n  padding: 12px;\n  border: 1px solid rgba(128, 128, 128, 0.25);\n  margin: 4px;\n  border-radius: 4px;\n}\n\n.notes .list li.active {\n  border-color: #0092C3;\n  box-shadow: 0 0 5px #0092C3;\n}\n\n.notes .list p, .notes .list h3 {\n  margin: 0;\n}\n\n.notes .list a {\n  text-decoration: none;\n  color: black;\n}\n\n.notes .detail {\n  flex: 1;\n  height: 100%;\n}\n"; });
define('text!notes/no-selection.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./no-selection.css\"></require>\r\n  <div class=\"no-note-selected\">\r\n    Please select a note or&nbsp;<a route-href=\"route: new\">create a new note</a>.\r\n  </div>\r\n</template>\r\n"; });
define('text!notes/no-selection.css', ['module'], function(module) { module.exports = ".no-note-selected {\n  width: 100%;\n  height: 100%;\n\n  display: flex;\n\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n}\n"; });
define('text!settings/index.css', ['module'], function(module) { module.exports = "section.settings {\n  padding: 12px;\n}\n"; });
define('text!settings/index.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./index.css\"></require>\n\n  <section class=\"settings au-animate\">\n    <form role=\"form\" submit.trigger=\"submit()\">\n      <div class=\"form-group\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"First Name\" value.bind=\"firstName\" />\n      </div>\n      <div class=\"form-group\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Second Name\" value.bind=\"lastName\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Full Name</label>\n        <p class=\"help-block\">${fullName}</p>\n      </div>\n      <button type=\"submit\" class=\"btn btn-default\">Save</button>\n    </form>\n  </section>\n</template>\n"; });
//# sourceMappingURL=app-bundle.js.map