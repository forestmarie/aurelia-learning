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
    aurelia.use.standardConfiguration().plugin('aurelia-dialog').feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot('login/login');
    });
  }
});
define('login/login',['exports', 'aurelia-dependency-injection', 'aurelia-framework', 'backend/server'], function (exports, _aureliaDependencyInjection, _aureliaFramework, _server) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Login = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Login = exports.Login = (_dec = (0, _aureliaDependencyInjection.inject)(_aureliaFramework.Aurelia, _server.Server), _dec(_class = function () {
    function Login(aurelia, server) {
      _classCallCheck(this, Login);

      this.aurelia = aurelia;
      this.server = server;
      this.username = 'un';
      this.password = 'pw';
      this.message = '';
    }

    Login.prototype.login = function login() {
      var _this = this;

      this.server.login(this.username, this.password).then(function (result) {
        if (result) {
          _this.message = 'Login Succeeded';

          _this.aurelia.use.instance(_server.User, result);

          _this.aurelia.setRoot('shell/shell');
        } else {
          _this.message = 'Incorrect Username or Password!';
        }
      });
    };

    return Login;
  }()) || _class);
});
define('home/home',['exports', 'aurelia-framework', 'backend/server'], function (exports, _aureliaFramework, _server) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Home = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Home = exports.Home = (_dec = (0, _aureliaFramework.inject)(_server.Server), _dec(_class = function () {
    function Home(server) {
      _classCallCheck(this, Home);

      this.server = server;
      this.activity = null;
      this.news = null;
    }

    Home.prototype.activate = function activate() {
      var _this = this;

      return Promise.all([this.server.getRecentActivity().then(function (activity) {
        return _this.activity = activity;
      }), this.server.getNews().then(function (news) {
        return _this.news = news;
      })]);
    };

    return Home;
  }()) || _class);
});
define('backend/lorem',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.generateSentence = generateSentence;
  exports.generateTitle = generateTitle;
  var text = 'In tempus neque mollis, pharetra arcu et, varius lacus. Sed nunc elit, cursus eget convallis sit amet, congue eget ligula. Nullam nec finibus arcu. Suspendisse vitae lectus mollis nunc laoreet dignissim vitae ut ligula. Vestibulum ut sodales libero. Pellentesque accumsan enim nunc, a facilisis magna porttitor quis. Pellentesque faucibus, erat nec aliquet consequat, turpis orci sollicitudin ante, et ultricies libero eros a diam. Aliquam pharetra sapien non gravida aliquet. Aliquam sed ante accumsan, auctor arcu ut, pretium arcu. Nullam nulla diam, suscipit in mollis sed, auctor ut risus. Maecenas lacinia non mauris quis rhoncus. Nunc purus sem, fringilla vitae pulvinar ac, egestas nec massa. Pellentesque imperdiet vitae ex nec eleifend. Vivamus dictum congue ex nec varius. Praesent ut augue sem. Vivamus commodo, risus sit amet tincidunt dignissim, nunc lectus feugiat odio, quis congue turpis ipsum sed sapien. Cras id dui dignissim, faucibus quam facilisis, congue ligula. Nunc sollicitudin justo a odio molestie, quis posuere magna tempor. Aliquam sodales nisi ex, in malesuada dolor posuere a. Cras iaculis pretium ipsum, mollis maximus urna. Proin fermentum lectus maximus efficitur pulvinar. Maecenas ac consequat velit, eget dapibus elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent venenatis tortor a enim lobortis posuere quis non nisi. Morbi accumsan mauris et lectus fringilla rutrum sed in ante. Nulla velit purus, tristique eleifend lacinia quis, consectetur non justo. Duis vulputate efficitur facilisis. Cras a auctor libero. Proin pellentesque dolor in pretium tempus. In auctor ut lacus in viverra. Aenean pulvinar consequat lobortis. Phasellus luctus odio dui, vel tristique ipsum luctus id. Ut tincidunt diam quis quam tincidunt consequat sed sit amet elit. Nulla facilisi. Aenean elementum malesuada libero ac ultrices. Vivamus fermentum quis ex vel ultrices. Nullam urna dolor, pretium vel massa et, vestibulum lobortis lorem. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut varius pretium leo. Nulla in euismod nibh. Curabitur tempus varius mauris, vitae consequat urna mollis sed. Vivamus efficitur justo id nisl sodales, non vehicula lectus pretium. Donec vel mi lorem. Integer dolor tortor, finibus eget semper nec, scelerisque et lacus. Integer id imperdiet ante. Integer placerat enim luctus luctus efficitur. Quisque eros enim, cursus id volutpat ac, finibus vel arcu. Donec a nibh nibh. Cras ligula enim, pretium nec sapien non, tempor feugiat urna. In ultricies diam ac eleifend feugiat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Donec in velit sit amet est feugiat suscipit in sollicitudin odio. Suspendisse aliquam est vel neque dignissim consequat. Maecenas a diam id felis ultricies euismod. Nullam lacus urna, egestas ut orci volutpat, imperdiet commodo ante. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Sed eleifend mattis diam, ac consectetur est cursus sit amet. Nam euismod risus vitae libero aliquet, viverra pellentesque sem pulvinar. Praesent tincidunt et enim et volutpat. Vestibulum vel lorem vitae purus facilisis ultrices. Nam dictum sodales justo, efficitur accumsan tortor posuere sit amet. Suspendisse imperdiet id lectus id suscipit. Duis ornare commodo bibendum. Fusce justo ante, scelerisque quis ex vel, auctor lacinia mauris. Maecenas elementum id dolor sit amet consequat. Phasellus sed nibh bibendum enim accumsan volutpat. Curabitur rhoncus euismod nibh, sit amet vestibulum arcu iaculis et. Ut eleifend ligula non lectus consequat, ut aliquam nunc accumsan. Curabitur eget justo ut ipsum maximus egestas. Praesent tempus, sapien vel lacinia euismod, odio enim blandit sem, eget congue mi enim ornare erat. Proin ornare, sem non sagittis mattis, nisi lorem porttitor erat, id euismod arcu diam ut augue. Ut tincidunt hendrerit nisl, sit amet tempor neque rutrum vitae. Sed dictum ante ac sem volutpat auctor. Fusce at fringilla neque. Cras vel nulla non arcu porttitor finibus. Aenean placerat condimentum enim luctus auctor. Pellentesque sit amet elit consequat, vulputate eros nec, ultrices mauris. Sed blandit sed diam id interdum. Proin vitae lectus non urna interdum imperdiet. Donec et velit ut lacus congue gravida. Aliquam efficitur a augue a pulvinar. Pellentesque sollicitudin nunc id mauris elementum fermentum. Praesent pellentesque mauris lorem, sit amet cursus nunc tristique ac. In pulvinar ullamcorper lacus, ac venenatis felis ultricies vitae. Etiam dolor nisi, fringilla non libero et, mollis blandit est. Fusce ultrices rhoncus elementum. Quisque et tortor nec sapien sodales ultricies. Phasellus commodo est massa, nec posuere lectus tristique vel. Etiam sagittis lacus eu sodales semper. In porta sit amet dolor et dignissim. In convallis nunc vel feugiat tincidunt. Nunc hendrerit pretium magna et mattis. Mauris et gravida justo. Mauris eleifend metus non odio eleifend, id iaculis dui consequat. Ut aliquam luctus vulputate. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Sed ut sapien gravida, consequat lectus vitae, aliquam felis. Pellentesque eget placerat ligula. In hac habitasse platea dictumst. In nec nulla feugiat, tincidunt tellus a, congue nibh. Morbi cursus condimentum arcu, sed faucibus metus ultrices quis. Aenean nec maximus justo. Nullam non justo velit. Nunc vestibulum pharetra neque eget sagittis. Phasellus volutpat semper massa, a accumsan dui bibendum id. Sed in egestas magna, nec blandit libero. Suspendisse ut lectus rutrum, imperdiet nisl in, imperdiet nisl. Pellentesque non bibendum lacus, sit amet sollicitudin ligula. Cras egestas tincidunt arcu, at porta justo ultricies sed. Suspendisse quam nisl, volutpat sed quam in, ornare mattis augue. Suspendisse eget ex mollis, hendrerit mauris sed, molestie leo. Pellentesque efficitur aliquam scelerisque. Vivamus at eros at metus semper suscipit. In neque enim, imperdiet id mattis sed, viverra non purus. Sed accumsan sodales ex, hendrerit scelerisque augue. In et eleifend sapien, vitae aliquam felis. Pellentesque faucibus sed tortor nec ullamcorper. Nulla tempus diam et gravida imperdiet. Ut volutpat dignissim porta. Etiam a finibus sem. Nulla facilisi. Nulla ac suscipit orci. Cras sit amet magna odio. Curabitur vel sapien dapibus, feugiat lacus vel, pellentesque justo. Donec vitae consectetur velit. Pellentesque ut risus a erat scelerisque mattis. Sed pellentesque lorem varius dictum pulvinar. Suspendisse vestibulum nec quam et sagittis. Nunc suscipit molestie.';

  var sentences = text.split('. ');

  var count = sentences.length;

  function generateSentence() {
    return sentences[Math.floor(Math.random() * count)] + '.';
  }

  function generateTitle() {
    return sentences[Math.floor(Math.random() * count)].trim().split(' ').slice(0, 3).join(' ').slice(0, -1);
  }
});
define('backend/server',['exports', './lorem'], function (exports, _lorem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Server = exports.User = undefined;

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

  var latency = 0;

  function wait() {
    var ms = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : latency;

    return new Promise(function (resolve) {
      return setTimeout(resolve, ms);
    });
  }

  function _clone(data) {
    return JSON.parse(JSON.stringify(data));
  }

  var User = exports.User = function () {
    function User(attrs) {
      _classCallCheck(this, User);

      if (attrs) {
        Object.assign(this, attrs);
      }
    }

    User.prototype.clone = function clone() {
      return new User(_clone(this));
    };

    _createClass(User, [{
      key: 'fullName',
      get: function get() {
        return this.firstName + ' ' + this.lastName;
      }
    }, {
      key: 'ticketCount',
      get: function get() {
        var _this = this;

        return ticketData.filter(function (t) {
          return t.fromId === _this.id;
        }).length;
      }
    }, {
      key: 'postCount',
      get: function get() {
        var _this2 = this;

        return ticketData.reduce(function (a, b) {
          return a.concat(b.posts);
        }, []).filter(function (p) {
          return p.fromId === _this2.id;
        }).length;
      }
    }]);

    return User;
  }();

  var userData = [new User({
    id: 1,
    username: 'EisenbergEffect',
    email: 'rob@eisenberg.com',
    firstName: 'Rob',
    lastName: 'Eisenberg',
    iconUrl: '/img/users/icon/1.jpg',
    avatarUrl: '/img/users/avatar/1.jpg',
    isActive: true
  }), new User({
    id: 2,
    username: 'bryanrsmith',
    email: 'bryan@smith.com',
    firstName: 'Bryan',
    lastName: 'Smith',
    iconUrl: '/img/users/icon/2.jpg',
    avatarUrl: '/img/users/avatar/2.jpg',
    isActive: true
  }), new User({
    id: 3,
    username: 'cmichaelgraham',
    email: 'mike@graham.com',
    firstName: 'Mike',
    lastName: 'Graham',
    iconUrl: '/img/users/icon/3.jpg',
    avatarUrl: '/img/users/avatar/3.jpg',
    isActive: true
  }), new User({
    id: 4,
    username: 'jdanyow',
    email: 'jeremy@danyow.com',
    firstName: 'Jeremy',
    lastName: 'Danyow',
    iconUrl: '/img/users/icon/4.jpg',
    avatarUrl: '/img/users/avatar/4.jpg',
    isActive: true
  }), new User({
    id: 5,
    username: 'martingust',
    email: 'martin@gust.com',
    firstName: 'Martin',
    lastName: 'Gust',
    iconUrl: '/img/users/icon/5.jpg',
    avatarUrl: '/img/users/avatar/5.jpg',
    isActive: true
  }), new User({
    id: 6,
    username: 'AshleyGrant',
    email: 'ashley@grant.com',
    firstName: 'Ashley',
    lastName: 'Grant',
    iconUrl: '/img/users/icon/6.jpg',
    avatarUrl: '/img/users/avatar/6.jpg',
    isActive: true
  }), new User({
    id: 7,
    username: 'davismj',
    email: 'matthew@davis.com',
    firstName: 'Matthew',
    lastName: 'Davis',
    iconUrl: '/img/users/icon/7.jpg',
    avatarUrl: '/img/users/avatar/7.jpg',
    isActive: true
  }), new User({
    id: 8,
    username: 'PWKad',
    email: 'patrick@walters.com',
    firstName: 'Patrick',
    lastName: 'Walters',
    iconUrl: '/img/users/icon/8.jpg',
    avatarUrl: '/img/users/avatar/8.jpg',
    isActive: true
  })];

  function randomDateInLastThirtyDays() {
    return new Date(new Date().getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
  }

  function addRandomNumberOfDaysToDate(start, maxDays) {
    return new Date(Math.min(new Date(start.getTime() + Math.random() * Math.floor(Math.random() * maxDays) * 24 * 60 * 60 * 1000), new Date()));
  }

  var ticketData = [{
    id: 1,
    title: null,
    createdAt: new Date(),
    fromId: 1,
    status: 'Open',
    priority: 'Normal',
    type: 'Problem',
    participants: [],
    posts: [{
      createdAt: null,
      fromId: null,
      content: null
    }]
  }];

  for (var i = 0; i < 100; i++) {
    ticketData[i] = _clone(ticketData[0]);
    ticketData[i].id = i + 1;
    ticketData[i].title = (0, _lorem.generateTitle)();
    ticketData[i].participants[0] = _clone(userData[Math.floor(Math.random() * 8)]);
    ticketData[i].fromId = ticketData[i].participants[0].id;
    ticketData[i].createdAt = randomDateInLastThirtyDays();
    ticketData[i].posts[0].createdAt = addRandomNumberOfDaysToDate(ticketData[i].createdAt, 30);
    ticketData[i].posts[0].fromId = ticketData[i].participants[0].id;
    ticketData[i].posts[0].content = (0, _lorem.generateSentence)();
  }

  ticketData.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });

  var activityData = [{
    id: 1,
    createdAt: new Date(),
    content: (0, _lorem.generateSentence)(),
    type: 'ticket',
    associatedId: 1
  }];

  var _loop = function _loop(_i) {
    activityData[_i] = _clone(activityData[0]);
    activityData[_i].id = _i + 1;
    activityData[_i].createdAt = randomDateInLastThirtyDays();
    activityData[_i].associatedId = _i + 1;
    activityData[_i].createdBy = _clone(userData[Math.floor(Math.random() * 8)]);

    var ticket = ticketData.find(function (t) {
      return t.id === activityData[_i].associatedId;
    });
    activityData[_i].title = activityData[_i].createdBy.firstName + ' ' + activityData[_i].createdBy.lastName + ' <strong>posted</strong> a message to the ticket "' + ticket.title + '"';
  };

  for (var _i = 0; _i < 100; _i++) {
    _loop(_i);
  }

  activityData.sort(function (a, b) {
    return b.createdAt - a.createdAt;
  });

  var Server = exports.Server = function () {
    function Server() {
      _classCallCheck(this, Server);
    }

    Server.prototype.login = function login(username, password) {
      return wait().then(function () {
        if (username === 'un' && password === 'pw') {
          return userData[0].clone();
        }
      });
    };

    Server.prototype.createUser = function createUser() {
      return new User({
        id: 0,
        username: 'NewUser',
        email: '',
        firstName: 'New',
        lastName: 'User',
        iconUrl: '/img/users/icon/1.jpg',
        avatarUrl: '/img/users/avatar/1.jpg',
        isActive: false
      });
    };

    Server.prototype.saveUser = function saveUser(user) {
      return wait().then(function () {
        var clone = user.clone();

        if (clone.id == 0) {
          clone.id = userData.length + 1;
          userData.unshift(clone);
        } else {
          var existing = userData.find(function (c) {
            return c.id === clone.id;
          });
          var index = userData.indexOf(existing);
          userData.splice(index, 1, clone);
        }

        return clone.clone();
      });
    };

    Server.prototype.getUser = function getUser(userId) {
      return wait().then(function () {
        var existing = userData.find(function (c) {
          return c.id === userId;
        });
        return existing ? existing.clone() : null;
      });
    };

    Server.prototype.getUserSummaries = function getUserSummaries() {
      return wait().then(function () {
        return userData.map(function (x) {
          return x.clone();
        });
      });
    };

    Server.prototype.createTicket = function createTicket(title) {
      var currentUser = _clone(userData[0]);

      return {
        id: 0,
        title: title,
        createdAt: new Date(),
        fromId: currentUser.id,
        status: 'Open',
        priority: 'Normal',
        type: 'Problem',
        participants: [currentUser],
        posts: []
      };
    };

    Server.prototype.saveTicket = function saveTicket(ticket) {
      return wait().then(function () {
        if (ticketData.indexOf(ticket) === -1) {
          ticket.id = ticketData.length + 1;
          ticketData.unshift(ticket);
        }

        return ticket;
      });
    };

    Server.prototype.getTicketSummaries = function getTicketSummaries() {
      return wait().then(function () {
        return _clone(ticketData);
      });
    };

    Server.prototype.getTicketDetails = function getTicketDetails(ticketId) {
      return wait().then(function () {
        return ticketData.find(function (x) {
          return x.id === ticketId;
        });
      });
    };

    Server.prototype.getRecentActivity = function getRecentActivity() {
      return wait().then(function () {
        return _clone(activityData);
      });
    };

    Server.prototype.getNews = function getNews() {
      return wait().then(function () {
        return [{
          title: "New Features Launched",
          content: "'You ought to be ashamed of yourself for asking such a simple question,' added the Gryphon; and then they both sat silent and looked at poor Alice, who felt ready to sink into the earth. At last the Gryphon said to the Mock Turtle, 'Drive on, old fellow! Don't be all day about it!' and he went on in these words: 'Yes, we went to school in the sea, though you mayn't believe it—' 'I never said I didn't!' interrupted Alice. 'You did,' said the Mock Turtle.",
          createdAt: new Date(),
          tags: ["release", "features", "blog"]
        }, {
          title: "Satisfaction Guaranteed",
          content: "'I am bound to Tahiti for more men.' 'Very good. Let me board you a moment—I come in peace.' With that he leaped from the canoe, swam to the boat; and climbing the gunwale, stood face to face with the captain. 'Cross your arms, sir; throw back your head. Now, repeat after me. As soon as Steelkilt leaves me, I swear to beach this boat on yonder island, and remain there six days. If I do not, may lightning strike me!'A pretty scholar,' laughed the Lakeman. 'Adios, Senor!' and leaping into the sea, he swam back to his comrades.",
          createdAt: new Date(),
          tags: ["release", "launch", "blog"]
        }];
      });
    };

    return Server;
  }();
});
define('resources/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {
    config.globalResources(['./value-converters/activity-type-to-route', './value-converters/date', './elements/rich-text-editor', './elements/data-grid']);
  }
});
define('shell/routes',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = [{
    name: 'home',
    route: ['', 'home'],
    moduleId: 'home/home',
    nav: true,
    title: 'Home',
    settings: { iconClass: 'fa-home' }
  }, {
    route: 'tickets',
    moduleId: 'tickets/tickets',
    nav: true,
    title: 'Tickets',
    settings: { iconClass: 'fa-ticket' }
  }, {
    name: 'thread',
    route: 'tickets/:id',
    moduleId: 'tickets/thread'
  }, {
    name: 'user',
    route: ['users', 'users/:id'],
    moduleId: 'users/users',
    href: '#users',
    nav: true,
    title: 'Users',
    settings: { iconClass: 'fa-group' }
  }, {
    name: 'settings',
    route: 'settings',
    moduleId: 'settings/index',
    href: '#settings',
    nav: true,
    title: 'Settings',
    settings: { iconClass: 'fa-cog' }
  }, {
    name: 'help',
    route: 'help',
    moduleId: 'help/help'
  }];
});
define('shell/shell',['exports', 'aurelia-framework', 'backend/server', 'resources/messages/tab-opened', 'resources/dialogs/common-dialogs', './routes'], function (exports, _aureliaFramework, _server, _tabOpened, _commonDialogs, _routes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Shell = undefined;

  var _routes2 = _interopRequireDefault(_routes);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Shell = exports.Shell = (_dec = (0, _aureliaFramework.inject)(_aureliaFramework.Aurelia, _server.User, _commonDialogs.CommonDialogs), _dec(_class = function () {
    function Shell(aurelia, user, commonDialogs) {
      _classCallCheck(this, Shell);

      this.aurelia = aurelia;
      this.commonDialogs = commonDialogs;
      this.user = user;
      this.tabs = [];
    }

    Shell.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.map(_routes2.default);
    };

    Shell.prototype.bind = function bind() {
      var _this = this;

      this.navigationCompleteSub = this.aurelia.subscribe('router:navigation:complete', function (msg) {
        return _this.onNavigationComplete(msg);
      });
      this.tabOpenedSub = this.aurelia.subscribe(_tabOpened.TabOpened, function (msg) {
        return _this.onTabOpened(msg);
      });
    };

    Shell.prototype.unbind = function unbind() {
      this.navigationCompleteSub.dispose();
      this.tabOpenedSub.dispose();
    };

    Shell.prototype.closeTab = function closeTab(tab) {
      var index = this.tabs.indexOf(tab);

      if (index === -1) {
        return;
      }

      this.tabs.splice(index, 1);

      if (!tab.isActive) {
        return;
      }

      var next = this.tabs[0];

      if (next) {
        this.router.navigateToRoute(next.route, next.params, true);
      } else {
        this.router.navigateToRoute('home', true);
      }
    };

    Shell.prototype.logout = function logout() {
      var _this2 = this;

      var message = 'You have tabs open. If you leave now, these changes will be lost. Are you sure you want to log out?';

      if (this.tabs.length > 0) {
        return this.commonDialogs.showMessage(message, 'Logout', ['Yes', 'No']).then(function (response) {
          if (!response.wasCancelled) {
            _this2._doLogout();
          }
        });
      } else {
        this._doLogout();
      }
    };

    Shell.prototype._doLogout = function _doLogout() {
      this.aurelia.setRoot('login/login');
      this.aurelia.container.unregister(_server.User);
      this.router.reset();
      this.router.deactivate();
      this.tabs = [];
    };

    Shell.prototype.onTabOpened = function onTabOpened(tab) {
      var existing = this.tabs.find(function (x) {
        return x.matches(tab);
      });

      if (!existing) {
        this.tabs.push(tab);
      }
    };

    Shell.prototype.onNavigationComplete = function onNavigationComplete(msg) {
      if (!msg.result.completed) {
        return;
      }

      this.tabs.forEach(function (x) {
        return x.updateActivation(msg.instruction);
      });
    };

    return Shell;
  }()) || _class);
});
define('tickets/thread',['exports', 'aurelia-framework', 'aurelia-event-aggregator', 'aurelia-router', 'resources/dialogs/common-dialogs', 'resources/messages/tab-opened', 'backend/server'], function (exports, _aureliaFramework, _aureliaEventAggregator, _aureliaRouter, _commonDialogs, _tabOpened, _server) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Thread = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Thread = exports.Thread = (_dec = (0, _aureliaFramework.inject)(_server.Server, _aureliaRouter.Router, _commonDialogs.CommonDialogs, _aureliaEventAggregator.EventAggregator, _server.User), _dec(_class = function () {
    function Thread(server, router, commonDialogs, eventAggregator, user) {
      _classCallCheck(this, Thread);

      this.server = server;
      this.router = router;
      this.commonDialogs = commonDialogs;
      this.eventAggregator = eventAggregator;
      this.user = user;
    }

    Thread.prototype.getParticipant = function getParticipant(id) {
      return this.ticket.participants.find(function (x) {
        return x.id === id;
      });
    };

    Thread.prototype.save = function save() {
      var _this = this;

      var isNew = this.ticket.id === 0;
      this.server.saveTicket(this.ticket).then(function (ticket) {
        _this.ticket = ticket;

        if (isNew) {
          _this.router.navigateToRoute('thread', { id: ticket.id }, { replace: true, trigger: false });
          _this.eventAggregator.publish(new _tabOpened.TabOpened(ticket.title, 'thread', { id: ticket.id }));
        }
      });
    };

    Thread.prototype.submit = function submit(status) {
      if (this.message) {
        if (!this.getParticipant(this.user.id)) {
          this.ticket.participants.push(this.user);
        }

        this.ticket.posts.unshift({
          createdAt: new Date(),
          fromId: this.user.id,
          content: this.message
        });

        this.message = '';
      }

      this.ticket.status = status;
      this.save();
    };

    Thread.prototype.canActivate = function canActivate(params) {
      var _this2 = this;

      if (params.id === 'new') {
        if (params.title) {
          this.ticket = this.server.createTicket(params.title);
          this.from = this.getParticipant(this.ticket.fromId);
          return true;
        }

        return this.commonDialogs.prompt('What would you like to name the ticket?').then(function (response) {
          if (response.wasCancelled) {
            return false;
          }

          return new _aureliaRouter.RedirectToRoute('thread', { id: 'new', title: response.output });
        });
      }

      return this.server.getTicketDetails(parseInt(params.id, 10)).then(function (ticket) {
        if (ticket) {
          _this2.ticket = ticket;
          _this2.from = _this2.getParticipant(ticket.fromId);
          _this2.eventAggregator.publish(new _tabOpened.TabOpened(ticket.title, 'thread', { id: ticket.id }));
          return true;
        }

        return new _aureliaRouter.RedirectToRoute('home');
      });
    };

    Thread.prototype.activate = function activate(params) {
      this.message = '';
    };

    Thread.prototype.canDeactivate = function canDeactivate() {
      if (this.ticket.id === 0) {
        var message = 'You have created a ticket but have not yet posted it with a status. If you leave now, your work will be lost. Do you wish to continue?';

        return this.commonDialogs.showMessage(message, 'Ticket Not Saved', ['Yes', 'No']).then(function (response) {
          return !response.wasCancelled;
        });
      }

      return true;
    };

    return Thread;
  }()) || _class);
});
define('resources/dialogs/common-dialogs',['exports', 'aurelia-framework', 'aurelia-dialog', './message-box', './prompt'], function (exports, _aureliaFramework, _aureliaDialog, _messageBox, _prompt) {
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

      return this.dialogService.open({ viewModel: _messageBox.MessageBox, model: { message: message, title: title, options: options } });
    };

    CommonDialogs.prototype.prompt = function prompt(message) {
      var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Prompt';

      return this.dialogService.open({ viewModel: _prompt.Prompt, model: { message: message, title: title } });
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
define('resources/dialogs/prompt',['exports', 'aurelia-dialog', 'aurelia-framework'], function (exports, _aureliaDialog, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Prompt = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Prompt = exports.Prompt = (_dec = (0, _aureliaFramework.inject)(_aureliaDialog.DialogController), _dec(_class = function () {
    function Prompt(dialogController) {
      _classCallCheck(this, Prompt);

      this.dialogController = dialogController;
      this.answer = null;
    }

    Prompt.prototype.activate = function activate(model) {
      this.model = model;
    };

    Prompt.prototype.ok = function ok() {
      if (this.answer) {
        this.dialogController.ok(this.answer);
      }
    };

    Prompt.prototype.cancel = function cancel() {
      this.dialogController.cancel();
    };

    return Prompt;
  }()) || _class);
});
define('resources/messages/tab-opened',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var TabOpened = exports.TabOpened = function () {
    function TabOpened(title, route, params) {
      _classCallCheck(this, TabOpened);

      this.title = title;
      this.route = route;
      this.params = params || {};
      this.isActive = true;
    }

    TabOpened.prototype.updateActivation = function updateActivation(instruction) {
      if (this.route !== instruction.config.name) {
        this.isActive = false;
        return;
      }

      var params = instruction.params;

      for (var key in params) {
        if (params[key] !== this.params[key].toString()) {
          this.isActive = false;
          return;
        }
      }

      this.isActive = true;
    };

    TabOpened.prototype.matches = function matches(other) {
      if (this.route !== other.route) {
        return false;
      }

      for (var key in other.params) {
        if (other.params[key] !== this.params[key]) {
          return false;
        }
      }

      return true;
    };

    return TabOpened;
  }();
});
define('resources/value-converters/activity-type-to-route',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ActivityTypeToRouteValueConverter = exports.ActivityTypeToRouteValueConverter = function () {
    function ActivityTypeToRouteValueConverter() {
      _classCallCheck(this, ActivityTypeToRouteValueConverter);
    }

    ActivityTypeToRouteValueConverter.prototype.toView = function toView(value) {
      switch (value) {
        case 'ticket':
          return 'thread';
        default:
          throw new Error('Unknown ticket type: ' + value + '.');
      }
    };

    return ActivityTypeToRouteValueConverter;
  }();
});
define('resources/value-converters/date',['exports', 'moment'], function (exports, _moment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DateValueConverter = undefined;

  var _moment2 = _interopRequireDefault(_moment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var DateValueConverter = exports.DateValueConverter = function () {
    function DateValueConverter() {
      _classCallCheck(this, DateValueConverter);
    }

    DateValueConverter.prototype.toView = function toView(value) {
      var format = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'dddd, MMMM D, YYYY';

      return (0, _moment2.default)(value).format(format);
    };

    return DateValueConverter;
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
define('resources/elements/rich-text-editor',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.RichTextEditor = undefined;

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

  var _dec, _dec2, _dec3, _class, _desc, _value, _class2, _descriptor;

  CKEDITOR.config.skin = 'bootstrapck';

  var RichTextEditor = exports.RichTextEditor = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaFramework.TaskQueue), _dec2 = (0, _aureliaFramework.noView)(), _dec3 = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.twoWay }), _dec(_class = _dec2(_class = (_class2 = function () {
    function RichTextEditor(element, taskQueue) {
      _classCallCheck(this, RichTextEditor);

      _initDefineProp(this, 'value', _descriptor, this);

      this.element = element;
      this.taskQueue = taskQueue;
      this.guard = false;
    }

    RichTextEditor.prototype.created = function created(owningView) {
      var _this = this;

      var original = owningView.removeNodes;
      var that = this;

      owningView.removeNodes = function () {
        _this.editor.destroy();
        original.call(owningView);
      };
    };

    RichTextEditor.prototype.bind = function bind() {
      var _this2 = this;

      this.editor = CKEDITOR.appendTo(this.element, { removePlugins: 'resize, elementspath' }, this.value);

      this.editor.on('change', function () {
        var newValue = _this2.editor.getData();

        if (_this2.value === newValue) {
          return;
        }

        _this2.guard = true;

        _this2.value = newValue;

        _this2.taskQueue.queueMicroTask(function () {
          return _this2.guard = false;
        });
      });
    };

    RichTextEditor.prototype.valueChanged = function valueChanged(newValue, oldValue) {
      if (this.guard || !this.editor) {
        return;
      }

      this.editor.setData(newValue);
    };

    return RichTextEditor;
  }(), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, 'value', [_dec3], {
    enumerable: true,
    initializer: null
  })), _class2)) || _class) || _class);
});
define('tickets/tickets',['exports', 'backend/server', 'aurelia-framework'], function (exports, _server, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Tickets = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _class;

  var Tickets = exports.Tickets = (_dec = (0, _aureliaFramework.inject)(_server.Server), _dec(_class = function () {
    function Tickets(server) {
      _classCallCheck(this, Tickets);

      this.server = server;
    }

    Tickets.prototype.activate = function activate() {
      var _this = this;

      return this.server.getTicketSummaries().then(function (tickets) {
        return _this.tickets = tickets;
      });
    };

    return Tickets;
  }()) || _class);
});
define('resources/elements/data-grid',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.DataGrid = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _dec, _dec2, _class;

  var DataGrid = exports.DataGrid = (_dec = (0, _aureliaFramework.inject)(Element), _dec2 = (0, _aureliaFramework.processContent)(parseColumns), _dec(_class = _dec2(_class = function () {
    function DataGrid(element) {
      var _this = this;

      _classCallCheck(this, DataGrid);

      this.element = element;
      this.onResize = function () {
        return _this.size();
      };
    }

    DataGrid.prototype.bind = function bind() {
      window.addEventListener('resize', this.onResize);
    };

    DataGrid.prototype.attached = function attached() {
      this.headerCells = this.element.getElementsByClassName('header-row')[0].children;
      this.sizingCells = this.element.getElementsByClassName('sizing-row')[0].children;
      this.size();
    };

    DataGrid.prototype.unbind = function unbind() {
      window.removeEventListener('resize', this.onResize);
    };

    DataGrid.prototype.size = function size() {
      for (var i = 0, ii = this.headerCells.length - 1; i < ii; ++i) {
        this.sizingCells[i].style.width = this.headerCells[i].offsetWidth + 'px';
      }
    };

    return DataGrid;
  }()) || _class) || _class);

  function parseColumns(compiler, resources, node, instruction) {
    var columns = node.querySelectorAll('grid-column');
    var headerCells = '';
    var dataCells = '';
    var sizingCells = '';
    var itemsExpression = node.getAttribute('items.bind');

    node.removeAttribute('items.bind');

    for (var i = 0, ii = columns.length; i < ii; ++i) {
      var column = columns[i];
      var cellTemplate = void 0;

      headerCells += '<th>' + column.getAttribute('heading') + '</th>';
      sizingCells += '<td></td>';

      cellTemplate = column.innerHTML.trim();

      if (cellTemplate) {
        dataCells += '<td>' + cellTemplate + '</td>';
      } else {
        dataCells += '<td>${item.' + column.getAttribute('property') + '}</td>';
      }
    }

    node.innerHTML = '\n  <table class="grid-header table">\n    <thead>\n      <tr class="header-row">' + headerCells + '</tr>\n    </thead>\n  </table>\n  <div class="grid-container">\n    <table class="grid-rows table table-striped">\n      <tbody>\n        <tr class="sizing-row">' + sizingCells + '</tr>\n        <tr repeat.for="item of ' + itemsExpression + '" class="item-row">' + dataCells + '</tr>\n      </tbody>\n    </table>\n  </div>\n  ';

    return true;
  }
});
define('settings/index',['exports', './routes'], function (exports, _routes2) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CategoriesValueConverter = exports.SettingsIndex = undefined;

  var _routes3 = _interopRequireDefault(_routes2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var SettingsIndex = exports.SettingsIndex = function () {
    function SettingsIndex() {
      _classCallCheck(this, SettingsIndex);
    }

    SettingsIndex.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.map(_routes3.default);
    };

    return SettingsIndex;
  }();

  var CategoriesValueConverter = exports.CategoriesValueConverter = function () {
    function CategoriesValueConverter() {
      _classCallCheck(this, CategoriesValueConverter);
    }

    CategoriesValueConverter.prototype.toView = function toView(navModels) {
      var categories = new Map();

      for (var _iterator = navModels, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
          if (_i >= _iterator.length) break;
          _ref = _iterator[_i++];
        } else {
          _i = _iterator.next();
          if (_i.done) break;
          _ref = _i.value;
        }

        var model = _ref;

        var _routes = categories.get(model.settings.category);

        if (!_routes) {
          categories.set(model.settings.category, _routes = []);
        }

        _routes.push(model);
      }

      return categories;
    };

    return CategoriesValueConverter;
  }();
});
define('settings/routes',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var adminHome = {
    title: 'Admin Home',
    iconClass: 'fa-home'
  };

  var channels = {
    title: 'Channels',
    iconClass: 'fa-external-link'
  };

  var settings = {
    title: 'Settings',
    iconClass: 'fa-cog'
  };

  exports.default = [{ route: '', moduleId: './overview/index', title: 'Overview', nav: true, settings: { category: adminHome } }, { route: 'email', moduleId: './email/index', title: 'Email', nav: true, settings: { category: channels } }, { route: 'web-portal', moduleId: './webportal/index', title: 'Web Portal', nav: true, settings: { category: channels } }, { route: 'twitter', moduleId: './twitter/index', title: 'Twitter', nav: true, settings: { category: channels } }, { route: 'facebook', moduleId: './facebook/index', title: 'Facebook', nav: true, settings: { category: channels } }, { route: 'feedback-tab', moduleId: './feedbacktab/index', title: 'Feedback Tab', nav: true, settings: { category: channels } }, { route: 'api', moduleId: './api/index', title: 'API', nav: true, settings: { category: channels } }, { route: 'account', moduleId: './account/index', title: 'Account', nav: true, settings: { category: settings } }, { route: 'subscription', moduleId: './subscription/index', title: 'Subscription', nav: true, settings: { category: channels } }, { route: 'security', moduleId: './security/index', title: 'Security', nav: true, settings: { category: settings } }];
});
define('settings/account/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'Account';
  };
});
define('settings/email/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'Email';
  };
});
define('settings/api/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'API';
  };
});
define('settings/facebook/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'Facebook';
  };
});
define('settings/feedbacktab/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'Feedback Tab';
  };
});
define('settings/overview/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'Overview';
  };
});
define('settings/security/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'Security';
  };
});
define('settings/subscription/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'Subscription';
  };
});
define('settings/twitter/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'Twitter';
  };
});
define('settings/webportal/index',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Index = exports.Index = function Index() {
    _classCallCheck(this, Index);

    this.heading = 'Web Portal';
  };
});
define('text!login/login.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"login\">\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4 col-md-offset-4 logo\"></div>\r\n    </div>\r\n    <div class=\"row\">\r\n      <div class=\"col-md-4 col-md-offset-4 well\">\r\n        <div show.bind=\"message\" class=\"alert alert-danger\">${message}</div>\r\n\r\n        <form role=\"form\" submit.trigger=\"login()\" class=\"form-horizontal\">\r\n          <div class=\"form-group\">\r\n            <label class=\"col-sm-2 control-label\">Username</label>\r\n            <div class=\"col-sm-10\">\r\n              <input type=\"text\" value.bind=\"username\" class=\"form-control\" placeholder=\"username\"><!--Bind the username.-->\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label class=\"col-sm-2 control-label\">Password</label>\r\n            <div class=\"col-sm-10\">\r\n              <input type=\"password\" value.bind=\"password\" class=\"form-control\" placeholder=\"password\"><!--Bind the password.-->\r\n            </div>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <div class=\"col-sm-offset-2 col-sm-10 text-right\">\r\n              <!--Disable the button if there isn't both a username and password.-->\r\n              <button disabled.bind=\"!username || !password\" type=\"submit\" class=\"btn btn-success\">Log In</button>\r\n            </div>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!home/activity-list.html', ['module'], function(module) { module.exports = "<template bindable=\"activity\">\r\n  <ul>\r\n    <li repeat.for=\"a of activity\" class=\"activity\">\r\n      <a route-href=\"route.bind: a.type | activityTypeToRoute; params.bind: { id: a.associatedId }\">\r\n        <div class=\"well\">\r\n          <div class=\"avatar\">\r\n            <img src=\"${a.createdBy.iconUrl}\">\r\n          </div>\r\n          <div class=\"body\">\r\n            <div class=\"title\" innerhtml.bind=\"a.title\"></div>\r\n            <div class=\"content\">${a.content}</div>\r\n            <div class=\"date\">${a.createdAt | date}</div>\r\n          </div>\r\n        </div>\r\n      </a>\r\n    </li>\r\n  </ul>\r\n</template>\r\n"; });
define('text!home/home.html', ['module'], function(module) { module.exports = "<template>\r\n  <require from=\"./activity-list.html\"></require>\r\n  <require from=\"./news-list.html\"></require>\r\n\r\n  <div>\r\n    <div class=\"header\">\r\n      <div class=\"header-left\">Activity</div>\r\n      <div class=\"header-right\">Benchmarks &amp; News</div>\r\n    </div>\r\n\r\n    <div class=\"sidebar\">\r\n      <activity-list activity.bind=\"activity\"></activity-list>\r\n    </div>\r\n\r\n    <div class=\"detail-container\">\r\n      <div class=\"row1x2\">\r\n        <!--TODO: Add Charts Here-->\r\n      </div>\r\n      <div class=\"row2x2\">\r\n        <news-list news.bind=\"news\"></news-list>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!home/news-list.html', ['module'], function(module) { module.exports = "<template bindable=\"news\" class=\"news\">\r\n\r\n  <!--One of these for each item in the news array.-->\r\n  <template repeat.for=\"item of news\">\r\n    <h1>${item.title}</h1>\r\n    <p>${item.content}</p>\r\n    <div>\r\n      <span class=\"badge badge-success\">${item.createdAt | date}</span>\r\n      <div class=\"pull-right\">\r\n        <span repeat.for=\"tag of item.tags\" class=\"badge\">${tag}</span>\r\n      </div>\r\n    </div>\r\n    <hr>\r\n  </template>\r\n</template>\r\n"; });
define('text!shell/header.html', ['module'], function(module) { module.exports = "<template>\r\n  <nav class=\"navbar navbar-default navbar-fixed-top\" role=\"navigation\">\r\n    <ul class=\"nav navbar-nav tabs\">\r\n\r\n      <li repeat.for=\"tab of tabs\" class=\"${tab.isActive ? 'active' : ''}\">\r\n        <a route-href=\"route.bind: tab.route; params.bind: tab.params\">${tab.title}</a>\r\n        <a href=\"#\" click.trigger=\"closeTab(tab)\">\r\n          <i class=\"fa fa-times\"></i>\r\n        </a>\r\n      </li>\r\n\r\n      <li class=\"dropdown add\">\r\n        <a href=\"#\" class=\"dropdown-toggle\" data-toggle=\"dropdown\">\r\n          <i class=\"fa fa-plus\"></i>add\r\n        </a>\r\n        <ul class=\"dropdown-menu\">\r\n          <li>\r\n            <a route-href=\"route: thread; params.bind: { id:'new' }\"><i class=\"icon-ticket\"></i> New Ticket</a>\r\n          </li>\r\n          <li>\r\n            <a route-href=\"route: user; params.bind: { id:'new' }\"><i class=\"icon-group\"></i> New User</a>\r\n          </li>\r\n        </ul>\r\n      </li>\r\n    </ul>\r\n\r\n    <ul class=\"nav navbar-nav navbar-right\">\r\n      <li class=\"dropdown\">\r\n        <a href=\"#\" class=\"avatar dropdown-toggle\" data-toggle=\"dropdown\">\r\n          <img src=\"${user.iconUrl}\" title.bind=\"user.username\">\r\n          <b class=\"caret\"></b>\r\n        </a>\r\n        <ul class=\"dropdown-menu\" role=\"menu\">\r\n          <li role=\"presentation\">\r\n            <a route-href=\"route: settings\"><i class=\"fa fa-cog\"></i> Settings</a>\r\n          </li>\r\n          <li role=\"presentation\">\r\n            <a route-href=\"route: help\"><i class=\"fa fa-envelope\"></i> Help</a>\r\n          </li>\r\n          <li role=\"presentation\" class=\"divider\"></li>\r\n          <li role=\"presentation\">\r\n            <a href=\"#\" click.trigger=\"logout()\"><i class=\"fa fa-power-off\"></i> Logout</a>\r\n          </li>\r\n        </ul>\r\n      </li>\r\n    </ul>\r\n  </nav>\r\n</template>\r\n"; });
define('text!shell/shell.html', ['module'], function(module) { module.exports = "<template>\r\n  <compose view=\"./header.html\"></compose>\r\n  <compose view=\"./sidebar.html\"></compose>\r\n\r\n  <div class=\"page-host\">\r\n    <router-view></router-view>\r\n  </div>\r\n</template>\r\n"; });
define('text!shell/sidebar.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"main-nav\">\r\n    <ul class=\"nav nav-list\">\r\n      <li repeat.for=\"route of router.navigation\" class=\"${route.isActive ? 'active' : ''}\">\r\n        <a href.bind=\"route.href\" title.bind=\"route.title\">\r\n          <i class=\"fa ${route.settings.iconClass}\"></i>\r\n        </a>\r\n      </li>\r\n    </ul>\r\n  </div>\r\n</template>\r\n"; });
define('text!tickets/thread.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"ticket\">\r\n    <div class=\"header\">\r\n      <div class=\"btn-group\">\r\n        <a class=\"btn btn-default creator\" route-href=\"route: user; params.bind: { id:ticket.participants[0].id}\" class=\"btn\">\r\n          <span>${ticket.participants[0].username}</span>\r\n        </a>\r\n        <button class=\"btn status active\">\r\n          <span class=\"badge ${ticket.status}\">${ticket.status}</span>\r\n        </button>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"sidebar\">\r\n      <div class=\"well\">\r\n        <form>\r\n          <div class=\"form-group\">\r\n            <label class=\"control-label\">Type</label>\r\n            <select class=\"form-control\">\r\n              <option>Question</option>\r\n              <option>Incident</option>\r\n              <option>Problem</option>\r\n              <option>Task</option>\r\n            </select>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label class=\"control-label\">Priority</label>\r\n            <select class=\"form-control\">\r\n              <option>Low</option>\r\n              <option>Normal</option>\r\n              <option>High</option>\r\n              <option>Urgent</option>\r\n            </select>\r\n          </div>\r\n          <div class=\"form-group\">\r\n            <label class=\"control-label\">Tags</label>\r\n            <input class=\"form-control\" type=\"text\" placeholder=\"tags\" />\r\n          </div>\r\n        </form>\r\n      </div>\r\n      <div class=\"well\">\r\n        <form>\r\n          <div class=\"form-group\">\r\n            <label class=\"control-label\">Internal Notes</label>\r\n            <textarea class=\"form-control\"></textarea>\r\n          </div>\r\n        </form>\r\n      </div>\r\n    </div>\r\n\r\n    <div class=\"detail-container\">\r\n      <div class=\"header\">\r\n        <i class=\"fa fa-comments\"></i>\r\n        <div class=\"content\">\r\n          <div class=\"title\">${ticket.title}</div>\r\n          <div class=\"description\">\r\n            <span>${ticket.createdAt | date}</span>\r\n            <i class=\"fa fa-circle separator\"></i>\r\n            <span>${from.firstName} ${from.lastName}</span> &lt;\r\n            <span>${from.email}</span>&gt;\r\n          </div>\r\n        </div>\r\n      </div>\r\n\r\n      <div class=\"thread\">\r\n        <form class=\"message\">\r\n          <rich-text-editor value.bind=\"message\"></rich-text-editor>\r\n        </form>\r\n\r\n        <div class=\"btn-group dropup pull-right\">\r\n          <button click.trigger=\"submit('Solved')\" class=\"btn btn-success\">Submit as Solved</button>\r\n          <button class=\"btn btn-default dropdown-toggle\" data-toggle=\"dropdown\">\r\n            <span class=\"caret\"></span>\r\n          </button>\r\n          <ul class=\"dropdown-menu\">\r\n            <li>\r\n              <a href=\"#\" click.trigger=\"submit('Open')\">Submit as Open</a>\r\n              <a href=\"#\" click.trigger=\"submit('Pending')\">Submit as Pending</a>\r\n              <a href=\"#\" click.trigger=\"submit('Solved')\">Submit as Solved</a>\r\n            </li>\r\n          </ul>\r\n        </div>\r\n\r\n        <div class=\"post-list\">\r\n          <div repeat.for=\"post of ticket.posts\" class=\"post\">\r\n            <input type=\"hidden\" model.one-time=\"getParticipant(post.fromId)\" ref=\"participant\">\r\n            <div class=\"avatar\">\r\n              <img src=\"${participant.model.avatarUrl}\">\r\n            </div>\r\n            <div class=\"body\">\r\n              <div>\r\n                <strong>${participant.model.firstName}</strong>\r\n                <strong>${participant.model.lastName}</strong>\r\n                <span class=\"createdAt\">${post.createdAt | date}</span>\r\n              </div>\r\n              <div>\r\n                <div>\r\n                  <p innerhtml.bind=\"post.content\"></p>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>\r\n"; });
define('text!resources/dialogs/message-box.html', ['module'], function(module) { module.exports = "<template>\r\n  <ai-dialog style=\"max-width: 325px\">\r\n    <ai-dialog-header>${model.title}</ai-dialog-header>\r\n\r\n    <ai-dialog-body>\r\n      ${model.message}\r\n    </ai-dialog-body>\r\n\r\n    <ai-dialog-footer>\r\n      <button repeat.for=\"option of model.options\" click.trigger=\"selectOption(option)\">${option}</button>\r\n    </ai-dialog-footer>\r\n  </ai-dialog>\r\n</template>"; });
define('text!resources/dialogs/prompt.html', ['module'], function(module) { module.exports = "<template>\r\n  <ai-dialog>\r\n    <ai-dialog-header>${model.title}</ai-dialog-header>\r\n\r\n    <ai-dialog-body>\r\n      <p>${model.message}</p>\r\n      <form submit.delegate=\"ok()\">\r\n        <input value.bind=\"answer\" type=\"text\" class=\"form-control\" attach-focus=\"true\">\r\n      </form>\r\n    </ai-dialog-body>\r\n\r\n    <ai-dialog-footer>\r\n      <button click.trigger=\"cancel()\">Cancel</button>\r\n      <button disabled.bind=\"!answer\" click.trigger=\"ok()\">Ok</button>\r\n    </ai-dialog-footer>\r\n  </ai-dialog>\r\n</template>\r\n"; });
define('text!tickets/tickets.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"header-single\">Tickets</div>\r\n  </div>\r\n\r\n  <data-grid items.bind=\"tickets\">\r\n    <grid-column heading=\"Title\">\r\n      <a route-href=\"route: thread; params.bind: { id:item.id }\">${item.title}</a>\r\n    </grid-column>\r\n    <grid-column heading=\"Submitted By\">\r\n      ${item.participants[0].firstName} ${item.participants[0].lastName}\r\n    </grid-column>\r\n    <grid-column heading=\"Submitted On\">\r\n      ${item.createdAt | date}\r\n    </grid-column>\r\n    <grid-column heading=\"Type\" property=\"type\"></grid-column>\r\n    <grid-column heading=\"Status\" property=\"status\"></grid-column>\r\n    <grid-column heading=\"Priority\" property=\"priority\"></grid-column>\r\n  </data-grid>\r\n</template>"; });
define('text!resources/elements/data-grid.html', ['module'], function(module) { module.exports = "<template>\r\n  <slot></slot>\r\n</template>\r\n"; });
define('text!settings/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"header-left\">Settings</div>\r\n    <div class=\"header-right\"></div>\r\n  </div>\r\n\r\n  <div class=\"sidebar\">\r\n    <ul class=\"nav nav-pills nav-stacked\">\r\n      <template repeat.for=\"[category, routes] of router.navigation | categories\">\r\n        <li class=\"nav-header\">\r\n          <i class=\"fa\" class.bind=\"category.iconClass\"></i>\r\n          <span>${category.title}</span>\r\n        </li>\r\n        \r\n        <li repeat.for=\"nav of routes\" class=\"${nav.isActive ? 'active' : ''}\">\r\n          <a href.bind=\"nav.href\">${nav.title}</a>\r\n        </li>\r\n      </template>\r\n    </ul>\r\n  </div>\r\n\r\n  <div class=\"detail-container settings-container\">\r\n    <router-view></router-view>\r\n  </div>\r\n</template>"; });
define('text!settings/account/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!settings/email/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!settings/feedbacktab/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!settings/overview/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!settings/api/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!settings/facebook/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!settings/subscription/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!settings/security/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!settings/twitter/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
define('text!settings/webportal/index.html', ['module'], function(module) { module.exports = "<template>\r\n  <div class=\"header\">\r\n    <div class=\"content\">\r\n      <div class=\"title\">${heading}</div>\r\n    </div>\r\n  </div>\r\n  <div class=\"grid-container container-fluid\">\r\n    <div class=\"row-fluid\">\r\n      <div class=\"alert alert-danger text-center\">\r\n        <span>${heading} Settings Not Implemented</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</template>"; });
//# sourceMappingURL=app-bundle.js.map