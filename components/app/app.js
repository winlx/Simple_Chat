(function () {
  'use strict';

  // import
  const Messages = window.Messages;
  const MsgForm = window.MsgForm;
  const HttpRequest = window.HttpRequest;

  class App {
    constructor(options) {
      this._elem = options.elem;
      this._databaseURL = options.databaseURL;

      this._messages = new Messages({
        elem: document.querySelector('.js-messages'),
      });

      this._msgForm = new MsgForm({
        elem: document.querySelector('.js-msg-form'),
      });

      this._httpRequest = new HttpRequest(this._databaseURL);

      this._render();
      this._initApp();
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
     * Передать сообщения на сервер.
     * @param {Object} message - Объект сообщения.
     * @param {String} message.username - Имя пользователя.
     * @param {String} message.message - Сообщение.
     * @param {String} message.timestamp - Время сообщения.
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
     * Получить сообщения с сервера.
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
     * Рендерить чат только в случае новых сообщений.
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
     * Проверять новые сообщения с указанным интервалом.
     * @private
     */
    _checkNewMessages() {
      setTimeout(() => {
        this._getRequest();
        this._checkNewMessages();
      }, 3000);
    }
  }

  // export
  window.App = App;
}());
