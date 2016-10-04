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
    aurelia.use.standardConfiguration().feature('resources');

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
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
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
define('app0',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

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
      config.map([{ route: '', moduleId: 'welcome' }]);

      this.router = router;
    };

    return App;
  }();
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
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n\n  <header>\n    <h1>Aurelia Notes</h1>\n    <a class=\"button\" href=\"#/notes/new\">New Note</a>\n  </header>\n\n  <main>\n    <nav class=\"main\">\n      <!--TODO: Create sidebar nav-->\n    </nav>\n\n    <router-view></router-view>\n  </main>\n</template>\n"; });
define('text!app0.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n\n  <header>\n    <h1>Aurelia Notes</h1>\n    <a class=\"button\" href=\"#/notes/new\">New Note</a>\n  </header>\n\n  <main>\n    <nav class=\"main\">\n      <!--TODO: Create sidebar nav-->\n    </nav>\n\n    <router-view></router-view>\n  </main>\n</template>\n"; });
define('text!app.css', ['module'], function(module) { module.exports = "* {\n  box-sizing: border-box;\n}\n\nhtml, body {\n  margin: 0;\n  padding: 0;\n  width: 100%;\n  height: 100%;\n}\n\nheader {\n  padding: 12px;\n  background-color: #F1F0F0;\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  height: 64px;\n}\n\nheader h1 {\n  margin: 0;\n  padding: 0;\n  float: left;\n}\n\nheader a.button {\n  float: right;\n  text-decoration: none;\n  margin-top: 4px;\n}\n\nmain {\n  position: absolute;\n  top: 64px;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  display: flex;\n  flex-direction: row;\n}\n\nnav.main {\n  background: #0092C3;\n  border-right: 1px solid gray;\n}\n\nnav > ul {\n  margin: 0;\n  padding: 0;\n  list-style: none;\n}\n\nnav.main > ul > li > a {\n  padding: 16px;\n  display: block;\n}\n\nnav.main > ul > li > a > i {\n  color: white;\n  font-size: 22px !important;\n}\n\nnav.main > ul > li.active > a > i {\n  text-shadow: 0 0 20px white;\n}\n\nnav.main > ul > li:last-child {\n  position: absolute;\n  bottom: 0;\n}\n\nmain > router-view {\n  flex: 1;\n  border-top: 1px solid rgba(128, 128, 128, 0.25);\n}\n\nbutton, a.button {\n  padding: 6px 12px;\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #4cae4c;\n  border: 1px solid transparent;\n  border-radius: 4px;\n  font-size: 14px;\n}\n\nrouter-view {\n  display: block;\n  height: 100%;\n  width: 100%;\n}\n\nsection.au-enter-active {\n  -webkit-animation: fadeIn 1s;\n  animation: fadeIn 1s;\n}\n\n@-webkit-keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\n@keyframes fadeIn {\n  0% {\n    opacity: 0;\n  }\n  100% {\n    opacity: 1;\n  }\n}\n\nai-dialog > ai-dialog-header {\n  background: #0092C3;\n  color: white;\n  border-radius: 4px 4px 0 0;\n  font-weight: bold;\n  letter-spacing: 1px;\n  font-size: 16px;\n}\n"; });
define('text!welcome.css', ['module'], function(module) { module.exports = ".welcome {\n  width: 100%;\n  height: 100%;\n\n  display: flex;\n\n  align-items: center;\n  justify-content: center;\n  font-size: 28px;\n}\n"; });
define('text!welcome.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./welcome.css\"></require>\n\n  <section class=\"welcome\">\n    Welcome to Aurelia Notes!\n  </section>\n</template>\n"; });
define('text!settings/index.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./index.css\"></require>\n\n  <section class=\"settings au-animate\">\n    <form role=\"form\" submit.trigger=\"submit()\">\n      <div class=\"form-group\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"First Name\" value.bind=\"firstName\" />\n      </div>\n      <div class=\"form-group\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Second Name\" value.bind=\"lastName\" />\n      </div>\n      <div class=\"form-group\">\n        <label>Full Name</label>\n        <p class=\"help-block\">${fullName}</p>\n      </div>\n      <button type=\"submit\" class=\"btn btn-default\">Save</button>\n    </form>\n  </section>\n</template>\n"; });
define('text!settings/index.css', ['module'], function(module) { module.exports = "section.settings {\n  padding: 12px;\n}\n"; });
//# sourceMappingURL=app-bundle.js.map