/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pug_has_own_property = Object.prototype.hasOwnProperty;

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = pug_merge;
function pug_merge(a, b) {
  if (arguments.length === 1) {
    var attrs = a[0];
    for (var i = 1; i < a.length; i++) {
      attrs = pug_merge(attrs, a[i]);
    }
    return attrs;
  }

  for (var key in b) {
    if (key === 'class') {
      var valA = a[key] || [];
      a[key] = (Array.isArray(valA) ? valA : [valA]).concat(b[key] || []);
    } else if (key === 'style') {
      var valA = pug_style(a[key]);
      var valB = pug_style(b[key]);
      a[key] = valA + valB;
    } else {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Process array, object, or string as a string of classes delimited by a space.
 *
 * If `val` is an array, all members of it and its subarrays are counted as
 * classes. If `escaping` is an array, then whether or not the item in `val` is
 * escaped depends on the corresponding item in `escaping`. If `escaping` is
 * not an array, no escaping is done.
 *
 * If `val` is an object, all the keys whose value is truthy are counted as
 * classes. No escaping is done.
 *
 * If `val` is a string, it is counted as a class. No escaping is done.
 *
 * @param {(Array.<string>|Object.<string, boolean>|string)} val
 * @param {?Array.<string>} escaping
 * @return {String}
 */
exports.classes = pug_classes;
function pug_classes_array(val, escaping) {
  var classString = '', className, padding = '', escapeEnabled = Array.isArray(escaping);
  for (var i = 0; i < val.length; i++) {
    className = pug_classes(val[i]);
    if (!className) continue;
    escapeEnabled && escaping[i] && (className = pug_escape(className));
    classString = classString + padding + className;
    padding = ' ';
  }
  return classString;
}
function pug_classes_object(val) {
  var classString = '', padding = '';
  for (var key in val) {
    if (key && val[key] && pug_has_own_property.call(val, key)) {
      classString = classString + padding + key;
      padding = ' ';
    }
  }
  return classString;
}
function pug_classes(val, escaping) {
  if (Array.isArray(val)) {
    return pug_classes_array(val, escaping);
  } else if (val && typeof val === 'object') {
    return pug_classes_object(val);
  } else {
    return val || '';
  }
}

/**
 * Convert object or string to a string of CSS styles delimited by a semicolon.
 *
 * @param {(Object.<string, string>|string)} val
 * @return {String}
 */

exports.style = pug_style;
function pug_style(val) {
  if (!val) return '';
  if (typeof val === 'object') {
    var out = '';
    for (var style in val) {
      /* istanbul ignore else */
      if (pug_has_own_property.call(val, style)) {
        out = out + style + ':' + val[style] + ';';
      }
    }
    return out;
  } else {
    val += '';
    if (val[val.length - 1] !== ';') 
      return val + ';';
    return val;
  }
};

/**
 * Render the given attribute.
 *
 * @param {String} key
 * @param {String} val
 * @param {Boolean} escaped
 * @param {Boolean} terse
 * @return {String}
 */
exports.attr = pug_attr;
function pug_attr(key, val, escaped, terse) {
  if (val === false || val == null || !val && (key === 'class' || key === 'style')) {
    return '';
  }
  if (val === true) {
    return ' ' + (terse ? key : key + '="' + key + '"');
  }
  if (typeof val.toJSON === 'function') {
    val = val.toJSON();
  }
  if (typeof val !== 'string') {
    val = JSON.stringify(val);
    if (!escaped && val.indexOf('"') !== -1) {
      return ' ' + key + '=\'' + val.replace(/'/g, '&#39;') + '\'';
    }
  }
  if (escaped) val = pug_escape(val);
  return ' ' + key + '="' + val + '"';
};

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} terse whether to use HTML5 terse boolean attributes
 * @return {String}
 */
exports.attrs = pug_attrs;
function pug_attrs(obj, terse){
  var attrs = '';

  for (var key in obj) {
    if (pug_has_own_property.call(obj, key)) {
      var val = obj[key];

      if ('class' === key) {
        val = pug_classes(val);
        attrs = pug_attr(key, val, false, terse) + attrs;
        continue;
      }
      if ('style' === key) {
        val = pug_style(val);
      }
      attrs += pug_attr(key, val, false, terse);
    }
  }

  return attrs;
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

var pug_match_html = /["&<>]/;
exports.escape = pug_escape;
function pug_escape(_html){
  var html = '' + _html;
  var regexResult = pug_match_html.exec(html);
  if (!regexResult) return _html;

  var result = '';
  var i, lastIndex, escape;
  for (i = regexResult.index, lastIndex = 0; i < html.length; i++) {
    switch (html.charCodeAt(i)) {
      case 34: escape = '&quot;'; break;
      case 38: escape = '&amp;'; break;
      case 60: escape = '&lt;'; break;
      case 62: escape = '&gt;'; break;
      default: continue;
    }
    if (lastIndex !== i) result += html.substring(lastIndex, i);
    lastIndex = i + 1;
    result += escape;
  }
  if (lastIndex !== i) return result + html.substring(lastIndex, i);
  else return result;
};

/**
 * Re-throw the given `err` in context to the
 * the pug in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @param {String} str original source
 * @api private
 */

exports.rethrow = pug_rethrow;
function pug_rethrow(err, filename, lineno, str){
  if (!(err instanceof Error)) throw err;
  if ((typeof window != 'undefined' || !filename) && !str) {
    err.message += ' on line ' + lineno;
    throw err;
  }
  try {
    str = str || __webpack_require__(11).readFileSync(filename, 'utf8')
  } catch (ex) {
    pug_rethrow(err, null, lineno)
  }
  var context = 3
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Pug') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_css__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__app_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messages_messages__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__msg_form_msg_form__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_httpRequest__ = __webpack_require__(5);





class App {
  constructor(options) {
    this._elem = options.elem;
    this._databaseURL = options.databaseURL;

    this._createComponents();

    this._httpRequest = new __WEBPACK_IMPORTED_MODULE_3__modules_httpRequest__["a" /* default */](this._databaseURL);

    this._render();
    this._initApp();
  }

  _createComponents() {
    this._messages = new __WEBPACK_IMPORTED_MODULE_1__messages_messages__["a" /* default */]({
      elem: document.createElement('div'),
    });

    this._msgForm = new __WEBPACK_IMPORTED_MODULE_2__msg_form_msg_form__["a" /* default */]({
      elem: document.createElement('div'),
    });

    this._elem.appendChild(this._messages.elem);
    this._elem.appendChild(this._msgForm.elem);
  }

  _render() {
    this._messages.render();
    this._msgForm.render();
  }

  _initApp() {
    this._msgForm.onSubmit = (message) => {
      this._messages.addMessage(message);

      this._setRequest(message);
    };

    this._getRequest();
    this._checkNewMessages();
  }

  /**
   * Send messages to the server.
   * @param {Object} message - Message object.
   * @param {string} message.username - Username.
   * @param {string} message.message - Message.
   * @param {string} message.timestamp - Message timestamp.
   * @private
   */
  _setRequest(message) {
    this._httpRequest.sendRequest(message, 'POST')
      .then(() => {
        this._render();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Receive messages from the server.
   * @private
   */
  _getRequest() {
    this._httpRequest.sendRequest()
      .then((serverData) => {
        this._renderNewMessages(serverData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  /**
   * Render chat messages only if there are new messages.
   * @param {Object} serverData
   * @private
   */
  _renderNewMessages(serverData) {
    let serverMessages = Object.values(serverData);
    if (JSON.stringify(this._databaseMessages) !== JSON.stringify(serverMessages)) {
      this._databaseMessages = serverMessages;
      this._messages.setMessages(this._databaseMessages);
      this._messages.render();
    }
  }

  /**
   * Check for new messages at the specified interval.
   * @private
   */
  _checkNewMessages() {
    setTimeout(() => {
      this._getRequest();
      this._checkNewMessages();
    }, 3000);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (App);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messages_css__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__messages_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__messages_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messages_tmpl_pug__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__messages_tmpl_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__messages_tmpl_pug__);



class Messages {
  /**
   * @param {Object} options - Настройки компоненты.
   * @param {Object} options.elem - DOM element
   * @param {Object} options.data - Данные сообщений.
   * @param {Array} options.data.messages - Массив объектов сообщений.
   */
  constructor(options) {
    this.elem = options.elem;
    this._data = options.data || { messages: [] };
  }

  /**
   * Add a message.
   * @param {Object} message - Message object.
   * @param {string} message.username - Username.
   * @param {string} message.message - Message.
   * @param {string} message.timestamp - Message timestamp.
   */
  addMessage(message) {
    this._data.messages.push(message);
  }

  /**
   * Connect an array of messages from the server, for example.
   * @param {Object[]} messages - An array of message objects.
   * @param {string} messages.username - Username.
   * @param {string} messages.message - Message.
   * @param {string} messages.timestamp - Message timestamp.
   */
  setMessages(messages) {
    this._data.messages = messages;
  }

  render() {
    this.elem.innerHTML = __WEBPACK_IMPORTED_MODULE_1__messages_tmpl_pug___default()(this._data);
    this._scrollToBottom();
  }

  _scrollToBottom() {
    let messagesFeed = this.elem.querySelector('.messages__feed');
    messagesFeed.scrollTop = messagesFeed.scrollHeight - messagesFeed.clientHeight;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Messages);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__msg_form_css__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__msg_form_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__msg_form_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__msg_form_tmpl_pug__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__msg_form_tmpl_pug___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__msg_form_tmpl_pug__);



class MsgForm {
  constructor({ elem }) {
    this.elem = elem;

    this._onSubmit = this._onSubmit.bind(this);
    this._username = this._getUserName();
    this._initEvents();
  }

  /**
   * Request a chat username.
   * @returns {string}
   * @private
   */
  _getUserName() {
    while (!this._username) {
      this._username = prompt('Enter your nickname for chat', '');

      if (this._username) break;

      alert('You dod not enter a nickname, the query will be repeated');
    }

    // Temporary value
    // this._username = 'Aleksei';

    return this._username;
  }

  _initEvents() {
    this.on('submit', this._onSubmit);
  }

  /**
   * Assign an event handler to the form.
   * @param {string} event
   * @param {Function} callback
   */
  on(event, callback) {
    this.elem.addEventListener(event, callback);
  }

  _onSubmit(event) {
    event.preventDefault();

    let dataForm = this._getMessageData();

    this.onSubmit(dataForm);
  }

  /**
   * Get the data for the message from the form.
   * @returns {Object} { username: String, message: String, timestamp: Date }
   * @private
   */
  _getMessageData() {
    let data = {};

    data.username = this._username;
    data.message = this.elem.querySelector('[name=message]').value;
    data.timestamp = Date.now();

    return data;
  }

  /**
   * A form message handler that is assigned from the outside.
   * @param {Object} message - Message object.
   * @param {string} message.username - Username.
   * @param {string} message.message - Message.
   * @param {string} message.timestamp - Message timestamp.
   */
  onSubmit(message) {
    console.warn('You should define your own onSubmit');
    console.info(`message: ${message}`);
  }

  render() {
    this.elem.innerHTML = __WEBPACK_IMPORTED_MODULE_1__msg_form_tmpl_pug___default()();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MsgForm);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_app_app__ = __webpack_require__(1);


let app = new __WEBPACK_IMPORTED_MODULE_0__components_app_app__["a" /* default */]({
  elem: document.querySelector('.app'),
  databaseURL: 'https://simple-chat-7db27.firebaseio.com/simple-chat/messages.json',
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class HttpRequest {
  constructor(databaseURL) {
    this._databaseURL = databaseURL;
  }

  /**
   * Запросить или передать данные с/на сервер.
   * @param {Object} data - Передаваемые данные на сервер.
   * @param {String} type - Метод запроса.
   * @return {Promise}
   */
  sendRequest(data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open(type, this._databaseURL);

      xhr.onload = () => {
        if (xhr.status === 200) {
          let json = JSON.parse(xhr.responseText);
          resolve(json);
        } else {
          reject(xhr.statusText);
        }
      };

      xhr.onerror = (error) => {
        reject(error);
      };

      xhr.send(JSON.stringify(data));
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (HttpRequest);


/***/ }),
/* 6 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;;var locals_for_with = (locals || {});(function (Date, messages) {pug_html = pug_html + "\u003Cdiv class=\"messages\"\u003E\u003Cdiv class=\"messages__header\"\u003E\u003Ch2\u003ELIVE CHAT\u003C\u002Fh2\u003E\u003C\u002Fdiv\u003E\u003Cdiv class=\"messages__feed\"\u003E";
// iterate messages
;(function(){
  var $$obj = messages;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"messages__container\"\u003E\u003Cspan class=\"messages__author\"\u003E" + (pug.escape(null == (pug_interp = message.username) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"messages__timestamp\"\u003E" + (pug.escape(null == (pug_interp = (new Date(message.timestamp).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"messages_msg\"\u003E" + (pug.escape(null == (pug_interp = message.message) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var message = $$obj[pug_index0];
pug_html = pug_html + "\u003Cdiv class=\"messages__container\"\u003E\u003Cspan class=\"messages__author\"\u003E" + (pug.escape(null == (pug_interp = message.username) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"messages__timestamp\"\u003E" + (pug.escape(null == (pug_interp = (new Date(message.timestamp).toLocaleString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' }))) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003Cspan class=\"messages_msg\"\u003E" + (pug.escape(null == (pug_interp = message.message) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";}.call(this,"Date" in locals_for_with?locals_for_with.Date:typeof Date!=="undefined"?Date:undefined,"messages" in locals_for_with?locals_for_with.messages:typeof messages!=="undefined"?messages:undefined));;return pug_html;};
module.exports = template;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var pug = __webpack_require__(0);

function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;pug_html = pug_html + "\u003Cform class=\"msg-form\"\u003E\u003Ctextarea class=\"msg-form__input-text\" name=\"message\" rows=\"3\" required=\"\" placeholder=\"Введите сообщение...\"\u003E\u003C\u002Ftextarea\u003E\u003Cbr\u003E\u003Cinput class=\"msg-form__submit\" type=\"submit\" value=\"Отправить\"\u003E\u003C\u002Fform\u003E";;return pug_html;};
module.exports = template;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })
/******/ ]);