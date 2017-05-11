(function () {
  'use strict';

  class Messages {
    constructor({ elem, data = { messages: [] } }) {
      this._elem = elem;
      this._data = data;
    }

    /**
     * Добавление сообщения.
     * @param {Object} message - Объект сообщения.
     * @param {String} message.username - Имя пользователя.
     * @param {String} message.message - Сообщение.
     * @param {String} message.timestamp - время сообщения.
     */
    addMessage(message) {
      this._data.messages.push(message);
    }

    render() {
      let messagesFeed = this._data.messages.map(data => `
        <div class="messages__container">
          <span class="messages__author">${data.username}</span>
          <span class="messages__timestamp">${data.timestamp}</span>
          <br>
          <span class="messages_msg">${data.message}</span>
        </div>
      `).join('<br>');

      this._elem.innerHTML = `
        <div class="messages">
        <div class="messages__header">
            <h2>LIVE CHAT</h2>
        </div>
        <div class="messages__feed">
          ${messagesFeed}
        </div>
        </div>
      `;
    }
  }

  // export
  window.Messages = Messages;
}());
