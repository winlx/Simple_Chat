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
     * Добавить сообщение.
     * @param {Object} message - Объект сообщения.
     * @param {String} message.username - Имя пользователя.
     * @param {String} message.message - Сообщение.
     * @param {String} message.timestamp - Время сообщения.
     */
    addMessage(message) {
      this._data.messages.push(message);
    }

    /**
     * Подключить массив сообщений, например с сервера.
     * @param {Object[]} messages - Массив объектов сообщений.
     * @param {String} messages.username - Массив объектов сообщений.
     * @param {String} messages.message - Массив объектов сообщений.
     * @param {String} messages.timestamp - Массив объектов сообщений.
     */
    setMessages(messages) {
      this._data.messages = messages;
    }

    render() {
      this._elem.innerHTML = messagesTmpl(this._data);
      this._scrollToBottom();
    }

    _scrollToBottom() {
      let messagesFeed = this._elem.querySelector('.messages__feed');
      messagesFeed.scrollTop = messagesFeed.scrollHeight - messagesFeed.clientHeight;

    }
  }

  // export
  window.Messages = Messages;
}());
