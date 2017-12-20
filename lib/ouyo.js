(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("OUYO", [], factory);
	else if(typeof exports === 'object')
		exports["OUYO"] = factory();
	else
		root["OUYO"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });

// CONCATENATED MODULE: ./src/Key.js
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var KEY_BITS = 31;

var POWERS = [];
for (var i = 0; i < KEY_BITS; i++) {
  POWERS[i] = Math.pow(2, i);
}

var Key = function () {
  function Key(length) {
    _classCallCheck(this, Key);

    this.values = [];
    for (var _i = 0; _i < length / KEY_BITS; _i++) {
      this.values.push(0);
    }
  }

  _createClass(Key, [{
    key: "set",
    value: function set(index) {
      this.setBit(index, true);
      return this;
    }
  }, {
    key: "unset",
    value: function unset(index) {
      this.setBit(index, false);
      return this;
    }
  }, {
    key: "setBit",
    value: function setBit(index, value) {
      var valueIndex = 0;
      while (index >= KEY_BITS) {
        valueIndex++;
        index -= KEY_BITS;
      }

      var previousValue = (this.values[valueIndex] & POWERS[index]) !== 0;
      if (value && !previousValue) {
        this.values[valueIndex] += POWERS[index];
      } else if (!value && previousValue) {
        this.values[valueIndex] -= POWERS[index];
      }
    }
  }, {
    key: "matches",
    value: function matches(other) {
      for (var _i2 = 0; _i2 < other.values.length; _i2++) {
        var currentValue = this.values[_i2] || 0;
        var otherValue = other.values[_i2];
        if ((currentValue & otherValue) !== otherValue) {
          return false;
        }
      }
      return true;
    }
  }]);

  return Key;
}();
// CONCATENATED MODULE: ./src/utils.js
function map(array, fn) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    result[i] = fn(array[i]);
  }
  return result;
}

function filter(array, fn) {
  var result = [];
  for (var i = 0; i < array.length; i++) {
    var value = array[i];
    if (fn(value)) {
      result.push(value);
    }
  }
  return result;
}

function forEach(array, fn) {
  for (var i = 0; i < array.length; i++) {
    fn(array[i]);
  }
}

function forEach2(a, b, fn) {
  for (var i = 0; i < a.length; i++) {
    var aItem = a[i];
    for (var j = 0; j < b.length; j++) {
      fn(aItem, b[j]);
    }
  }
}

function assert(condition, errorMessage) {
  if (!condition) {
    throw new Error(errorMessage);
  }
}
// CONCATENATED MODULE: ./src/Entity.js
var Entity__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Entity__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Entity_index = 0;

var Entity_Entity = function () {
  function Entity(componentCount, onKeyChanged) {
    Entity__classCallCheck(this, Entity);

    this.id = Entity_index++;

    this.key = new Key(componentCount);
    this._components = makeNullArray(componentCount);

    this._changeAnnounced = false;
    this._onKeyChanged = onKeyChanged;
  }

  Entity__createClass(Entity, [{
    key: 'add',
    value: function add(componentInstance) {
      var index = componentInstance._id;

      assert(!this._components[index], 'Cannot add another instance of the same component.');
      assert(index < this._components.length, 'Unknown component passed as argument.');

      this.key.setBit(index, true);
      this._components[index] = componentInstance;

      this._onChange();
      return this;
    }
  }, {
    key: 'has',
    value: function has(Component) {
      return !!this._components[Component.id];
    }
  }, {
    key: 'get',
    value: function get(Component) {
      var component = this._components[Component.id];
      assert(component, 'Requested component is not present.');
      return component;
    }
  }, {
    key: 'remove',
    value: function remove(Component) {
      var index = Component.id;
      var component = this._components[index];

      assert(component, 'Cannot remove component instance, because it doesn\'t  exist on target entity.');

      this.key.unset(index);
      this._components[index] = null;
      this._onChange();
      return this;
    }
  }, {
    key: '_onChange',
    value: function _onChange() {
      if (!this._changeAnnounced) {
        this._onKeyChanged(this);
      }
      this._changeAnnounced = true;
    }
  }, {
    key: 'onChangeRegistered',
    value: function onChangeRegistered() {
      this._changeAnnounced = false;
    }
  }]);

  return Entity;
}();

function makeNullArray(size) {
  var array = [];
  for (var i = 0; i < size; i++) {
    array[i] = null;
  }
  return array;
}
// CONCATENATED MODULE: ./src/Events.js
var Events__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Events__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Events_Events = function () {
  function Events() {
    Events__classCallCheck(this, Events);

    this._events = [];
    this._eventTimes = {};
  }

  Events__createClass(Events, [{
    key: 'emit',
    value: function emit(event, time) {
      if (typeof event === 'string') {
        event = { type: event };
      }
      var lastTime = safeGet(this._eventTimes[event.type], time);
      event.timeDelta = (time - lastTime) / 1000;
      this._eventTimes[event.type] = time;
      this._events.push(event);
    }
  }, {
    key: 'get',
    value: function get(eventType) {
      return filter(this._events, function (e) {
        return e.type === eventType;
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

function safeGet(value, fallback) {
  return value !== undefined ? value : fallback;
}
// CONCATENATED MODULE: ./src/IndexedArray.js
var IndexedArray__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function IndexedArray__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IndexedArray = function () {
  function IndexedArray() {
    IndexedArray__classCallCheck(this, IndexedArray);

    this._indices = {};
    this.elements = [];
  }

  IndexedArray__createClass(IndexedArray, [{
    key: "put",
    value: function put(object) {
      this._indices[object.id] = this.elements.length;
      this.elements.push(object);
    }
  }, {
    key: "has",
    value: function has(object) {
      return this._indices[object.id] !== undefined;
    }
  }, {
    key: "remove",
    value: function remove(object) {
      var index = this._indices[object.id];
      if (index !== undefined) {
        delete this._indices[object.id];
        var otherObject = this.elements.pop();
        if (otherObject.id !== object.id) {
          this.elements[index] = otherObject;
          this._indices[otherObject.id] = index;
        }
      }
    }
  }]);

  return IndexedArray;
}();
// CONCATENATED MODULE: ./src/Query.js
var Query__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Query__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var Query_Query = function () {
  function Query() {
    var _this = this;

    Query__classCallCheck(this, Query);

    this._entities = new IndexedArray();
    this._one = false;

    this.subQueries = [this];

    for (var _len = arguments.length, components = Array(_len), _key = 0; _key < _len; _key++) {
      components[_key] = arguments[_key];
    }

    this.key = new Key(Query_maxId(components) + 1);
    forEach(components, function (_ref) {
      var id = _ref.id;
      return _this.key.set(id);
    });
  }

  Query__createClass(Query, [{
    key: 'one',
    value: function one() {
      this._one = true;
      return this;
    }
  }, {
    key: 'onChange',
    value: function onChange(entity) {
      var isInQuery = this._entities.has(entity);
      var matched = entity.key.matches(this.key);

      if (!isInQuery && matched) {
        this._entities.put(entity);
      } else if (isInQuery && !matched) {
        this._entities.remove(entity);
      }
    }
  }, {
    key: 'onRemove',
    value: function onRemove(entity) {
      this._entities.remove(entity);
    }
  }, {
    key: 'entities',
    get: function get() {
      return this._one ? this._entities.elements[0] : this._entities.elements;
    }
  }]);

  return Query;
}();

function Query_maxId(components) {
  var maxId = 0;
  forEach(components, function (_ref2) {
    var id = _ref2.id;
    return id > maxId && (maxId = id);
  });
  return maxId;
}

var Query_QueryArray = function () {
  function QueryArray(queries) {
    Query__classCallCheck(this, QueryArray);

    this.subQueries = queries;
  }

  Query__createClass(QueryArray, [{
    key: 'entities',
    get: function get() {
      return map(this.subQueries, function (query) {
        return query.entities;
      });
    }
  }]);

  return QueryArray;
}();

var emptyQuery = {
  entities: [],
  subQueries: []
};

function unifyQuery() {
  var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : emptyQuery;

  return Array.isArray(query) ? new Query_QueryArray(query) : query;
}
// CONCATENATED MODULE: ./src/component.js


function component_createComponent(fields, id) {
  var body = '';
  forEach(fields, function (field) {
    assert(isValid(field), 'Invalid identifier: ' + field);
    body += 'this.' + field + '=' + field + ';';
  });
  /* eslint-disable no-new-func */
  return decorate(new Function(fields, body), id);
}

function isValid(field) {
  return (/^[a-zA-Z]\w*$/.exec(field)
  );
}

function decorate(constructor, id) {
  constructor.id = id;
  constructor.prototype._id = id;
  return constructor;
}
// CONCATENATED MODULE: ./src/ticker.js
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
// CONCATENATED MODULE: ./src/Game.js
var Game__createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function Game__classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }








var Game_Game = function () {
  function Game() {
    var _this = this;

    var onTick = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultTicker;

    Game__classCallCheck(this, Game);

    this._changed = [];
    this._removed = [];

    this._systems = [];
    this._queries = [];

    this._events = new Events_Events();

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

  Game__createClass(Game, [{
    key: 'createComponent',
    value: function createComponent() {
      assert(!this._started, 'Cannot create component after the game was started.');

      for (var _len = arguments.length, fields = Array(_len), _key = 0; _key < _len; _key++) {
        fields[_key] = arguments[_key];
      }

      return component_createComponent(fields, this._componentCount++);
    }
  }, {
    key: 'registerSystems',
    value: function registerSystems(systems) {
      var _this2 = this;

      forEach(systems, function (system) {
        return _this2.registerSystem(system);
      });
    }
  }, {
    key: 'registerSystem',
    value: function registerSystem(system) {
      var _this3 = this;

      assert(!this._started, 'Cannot register systems after the game was started.');

      var query = unifyQuery(system.query);

      this._systems.push({
        query: query,
        on: system.on || 'tick',
        process: system.process || createProcess(system.processEntity)
      });

      forEach(query.subQueries, function (subQuery) {
        return _this3._queries.push(subQuery);
      });
    }
  }, {
    key: 'start',
    value: function start(init) {
      var _this4 = this;

      assert(!this._started, 'A game can only be started once!');
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
      forEach(this._systems, function (system) {
        return _this5._runSystem(system);
      });
    }
  }, {
    key: '_runSystem',
    value: function _runSystem(system, timeDelta) {
      var _this6 = this;

      forEach(this._events.get(system.on), function (event) {
        _this6._handleChanges();
        system.process(system.query.entities, event, _this6._proxy);
      });
    }
  }, {
    key: '_handleChanges',
    value: function _handleChanges() {
      forEach2(this._changed, this._queries, handleEntityChange);
      this._changed.length = 0;

      forEach2(this._removed, this._queries, handleEntityRemove);
      this._removed.length = 0;
    }
  }, {
    key: '_createEntity',
    value: function _createEntity(assemblage) {
      assert(this._started, 'Entities cannot be created before the game is started.');
      var entity = new Entity_Entity(this._componentCount, this._onEntityChange);
      if (assemblage) {
        assemblage(entity);
      }
      return entity;
    }
  }, {
    key: '_removeEntity',
    value: function _removeEntity(entity) {
      assert(this._started, 'Entities cannot be removed before the game is started.');
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
}

function handleEntityRemove(entity, query) {
  query.onRemove(entity);
}
// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Game", function() { return Game_Game; });
/* concated harmony reexport */__webpack_require__.d(__webpack_exports__, "Query", function() { return Query_Query; });



/***/ })
/******/ ]);
});
//# sourceMappingURL=ouyo.js.map