(function () {
  'use strict';

  class Messages {
    constructor({ elem, data = { messages: [] } }) {
      this._elem = elem;
      this._data = data;
    }

    addMessage(message) {
      this._data.messages.push(message);
    }

    render() {
      let messagesFeed = this._data.messages.map(data => `
        <div class="messages__container messages__container_my">
          <span class="messages__author">${data.username}</span>
          <br>
          <span class="messages_msg">${data.message}</span>
        </div>
      `).join('<br>');

      this._elem.innerHTML = `
        <div class="messages">
          ${messagesFeed}
        </div>
      `;
    }
  }

  // export
  window.Messages = Messages;
}());
