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

        this._httpRequest.sendRequest(message, 'POST')
          .then(() => {
            this._render();
          })
          .catch((error) => {
            console.log(error);
          });
      };

      this._httpRequest.sendRequest()
        .then((serverData) => {
          let messages = Object.values(serverData);
          this._messages.setMessages(messages);
          this._messages.render();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // export
  window.App = App;
}());
