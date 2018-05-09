(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("OUYO", [], factory);
	else if(typeof exports === 'object')
		exports["OUYO"] = factory();
	else
		root["OUYO"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Entity.js":
/*!***********************!*\
  !*** ./src/Entity.js ***!
  \***********************/
/*! exports provided: Entity */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Entity", function() { return Entity; });
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assert */ "./src/assert.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Entity = function () {
  function Entity(registerChange) {
    _classCallCheck(this, Entity);

    this._components = Object.create(null);
    this._changeRegistered = false;
    this._registerChange = registerChange;
  }

  _createClass(Entity, [{
    key: 'add',
    value: function add(instance) {
      Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(instance != null, 'Entity.add :: Argument is ' + instance + '.');

      var Component = instance.constructor;

      Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(Component && Component.id, 'Entity.add :: Argument is not a component instance.');
      Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(!this._components[Component.id], 'Entity.add :: Component "' + Component.id + '" is already present.');

      this._components[Component.id] = instance;
      this._onChange();

      return this;
    }
  }, {
    key: 'has',
    value: function has(Component) {
      Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(Component && Component.id, 'Entity.has :: Argument is not a component.');
      return !!this._components[Component.id];
    }
  }, {
    key: 'get',
    value: function get(Component) {
      Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(Component && Component.id, 'Entity.get :: Argument is not a component.');
      var component = this._components[Component.id];
      Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(component, 'Entity.get :: Component "' + Component.id + '" is not present.');
      return component;
    }
  }, {
    key: 'remove',
    value: function remove(Component) {
      Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(Component && Component.id, 'Entity.remove :: Argument is not a component.');

      this._components[Component.id] = undefined;
      this._onChange();

      return this;
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      if (!this._changeRegistered) {
        this._registerChange(this);
      }
      this._changeRegistered = true;
    }
  }, {
    key: '_onChangeRegistered',
    value: function _onChangeRegistered() {
      this._changeRegistered = false;
    }
  }]);

  return Entity;
}();

/***/ }),

/***/ "./src/Events.js":
/*!***********************!*\
  !*** ./src/Events.js ***!
  \***********************/
/*! exports provided: Events */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Events", function() { return Events; });
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
  function Events() {
    _classCallCheck(this, Events);

    this._events = [];
    this._eventTimes = {};
  }

  _createClass(Events, [{
    key: 'emit',
    value: function emit(event, time) {
      if (typeof event === 'string') {
        event = { type: event };
      }
      var lastTime = this._eventTimes[event.type] != null ? this._eventTimes[event.type] : time;

      event.timeDelta = (time - lastTime) / 1000;
      this._eventTimes[event.type] = time;
      this._events.push(event);
    }
  }, {
    key: 'get',
    value: function get(eventType) {
      return this._events.filter(function (event) {
        return event.type === eventType;
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      this._events.length = 0;
    }
  }]);

  return Events;
}();

/***/ }),

/***/ "./src/Game.js":
/*!*********************!*\
  !*** ./src/Game.js ***!
  \*********************/
/*! exports provided: Game */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return Game; });
/* harmony import */ var _Entity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Entity */ "./src/Entity.js");
/* harmony import */ var _Events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Events */ "./src/Events.js");
/* harmony import */ var _Query__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Query */ "./src/Query.js");
!(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module \"./component\""); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _ticker__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ticker */ "./src/ticker.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








var Game = function () {
  function Game() {
    var _this = this;

    var onTick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _ticker__WEBPACK_IMPORTED_MODULE_4__["defaultTicker"];

    _classCallCheck(this, Game);

    this._changed = [];
    this._removed = [];

    this._systems = [];
    this._queries = [];

    this._events = new _Events__WEBPACK_IMPORTED_MODULE_1__["Events"]();

    this._componentCount = 0;

    this._started = false;
    this._time = 0;
    this._onTick = onTick;

    this._onEntityChange = function (entity) {
      return _this._changed.push(entity);
    };

    this._proxy = {
      createEntity: function createEntity(assemblage) {
        return _this._createEntity(assemblage);
      },
      removeEntity: function removeEntity(entity) {
        return _this._removeEntity(entity);
      },
      emit: function emit(event) {
        return _this._emit(event);
      }
    };
  }

  _createClass(Game, [{
    key: 'createComponent',
    value: function createComponent() {
      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(!this._started, 'Cannot create component after the game was started.');

      for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
        fields[_key] = arguments[_key];
      }

      return !(function webpackMissingModule() { var e = new Error("Cannot find module \"./component\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(fields, this._componentCount++);
    }
  }, {
    key: 'registerSystems',
    value: function registerSystems(systems) {
      var _this2 = this;

      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(systems, function (system) {
        return _this2.registerSystem(system);
      });
    }
  }, {
    key: 'registerSystem',
    value: function registerSystem(system) {
      var _this3 = this;

      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(!this._started, 'Cannot register systems after the game was started.');

      var query = Object(_Query__WEBPACK_IMPORTED_MODULE_2__["unifyQuery"])(system.query);

      this._systems.push({
        query: query,
        on: system.on || 'tick',
        process: system.process || createProcess(system.processEntity)
      });

      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(query.subQueries, function (subQuery) {
        return _this3._queries.push(subQuery);
      });
    }
  }, {
    key: 'start',
    value: function start(init) {
      var _this4 = this;

      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(!this._started, 'A game can only be started once!');
      this._started = true;

      init(this._proxy);

      this._onTick(function (timeDelta) {
        return _this4._update(timeDelta);
      });
    }
  }, {
    key: '_update',
    value: function _update(timeDelta) {
      var _this5 = this;

      this._time += timeDelta;
      this._events.clear();
      this._emit('tick');
      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._systems, function (system) {
        return _this5._runSystem(system);
      });
    }
  }, {
    key: '_runSystem',
    value: function _runSystem(system, timeDelta) {
      var _this6 = this;

      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._events.get(system.on), function (event) {
        _this6._handleChanges();
        system.process(system.query.entities, event, _this6._proxy);
      });
    }
  }, {
    key: '_handleChanges',
    value: function _handleChanges() {
      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._changed, this._queries, handleEntityChange);
      this._changed.length = 0;

      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._removed, this._queries, handleEntityRemove);
      this._removed.length = 0;
    }
  }, {
    key: '_createEntity',
    value: function _createEntity(assemblage) {
      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._started, 'Entities cannot be created before the game is started.');
      var entity = new _Entity__WEBPACK_IMPORTED_MODULE_0__["Entity"](this._componentCount, this._onEntityChange);
      if (assemblage) {
        assemblage(entity);
      }
      return entity;
    }
  }, {
    key: '_removeEntity',
    value: function _removeEntity(entity) {
      !(function webpackMissingModule() { var e = new Error("Cannot find module \"./utils\""); e.code = 'MODULE_NOT_FOUND'; throw e; }())(this._started, 'Entities cannot be removed before the game is started.');
      this._removed.push(entity);
    }
  }, {
    key: '_emit',
    value: function _emit(event) {
      this._events.emit(event, this._time);
    }
  }]);

  return Game;
}();

function createProcess(processEntity) {
  return function (entities, event, game) {
    for (var i = 0; i < entities.length; ++i) {
      processEntity(entities[i], event, game);
    }
  };
}

function handleEntityChange(entity, query) {
  query.onChange(entity);
  entity.onChangeRegistered();
}

function handleEntityRemove(entity, query) {
  query.onRemove(entity);
}

/***/ }),

/***/ "./src/Query.js":
/*!**********************!*\
  !*** ./src/Query.js ***!
  \**********************/
/*! exports provided: Query */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return Query; });
/* harmony import */ var _assert__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./assert */ "./src/assert.js");
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Query = function () {
  function Query(selector) {
    _classCallCheck(this, Query);

    Object(_assert__WEBPACK_IMPORTED_MODULE_0__["assert"])(typeof selector === 'function', 'new Query :: selector must be a function');
    this._selector = selector;
    this._entities = new Set();
  }

  _createClass(Query, [{
    key: 'onChange',
    value: function onChange(entity) {
      if (this._selector(entity)) {
        this._entities.add(entity);
      } else {
        this._entities.delete(entity);
      }
    }
  }, {
    key: 'onRemove',
    value: function onRemove(entity) {
      this._entities.delete(entity);
    }
  }, {
    key: 'entities',
    get: function get() {
      return this._entities;
    }
  }]);

  return Query;
}();

/***/ }),

/***/ "./src/assert.js":
/*!***********************!*\
  !*** ./src/assert.js ***!
  \***********************/
/*! exports provided: assert */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "assert", function() { return assert; });
function assert(condition, errorMessage) {
  if (!condition) {
    throw new Error(errorMessage);
  }
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Game, Query */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Game */ "./src/Game.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return _Game__WEBPACK_IMPORTED_MODULE_0__["Game"]; });

/* harmony import */ var _Query__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Query */ "./src/Query.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Query", function() { return _Query__WEBPACK_IMPORTED_MODULE_1__["Query"]; });




/***/ }),

/***/ "./src/ticker.js":
/*!***********************!*\
  !*** ./src/ticker.js ***!
  \***********************/
/*! exports provided: defaultTicker */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTicker", function() { return defaultTicker; });
var defaultTicker = function defaultTicker(update) {
  window.requestAnimationFrame(onAnimationFrame);
  var lastTime = Date.now();
  function onAnimationFrame() {
    window.requestAnimationFrame(onAnimationFrame);
    var now = Date.now();
    update(Math.min(now - lastTime, 100));
    lastTime = now;
  }
};

/***/ })

/******/ });
});
//# sourceMappingURL=ouyo.js.map