(function () {
  'use strict';

  // import
  const messagesTmpl = window.messagesTmpl;

  class Messages {
    /**
     * @param {Object} options - Настройки компоненты.
     * @param {Object} options.elem - DOM element
     * @param {Object} options.data - Данные сообщений.
     * @param {Array} options.data.messages - Массив объектов сообщений.
     */
    constructor(options) {
      this._elem = options.elem;
      this._data = options.data || { messages: [] };
    }

    /**
     * Добавление сообщения.
     * @param {Object} message - Объект сообщения.
     * @param {String} message.username - Имя пользователя.
     * @param {String} message.message - Сообщение.
     * @param {String} message.timestamp - Время сообщения.
     */
    addMessage(message) {
      this._data.messages.push(message);
    }

    render() {
      this._elem.innerHTML = messagesTmpl(this._data);
    }
  }

  // export
  window.Messages = Messages;
}());
