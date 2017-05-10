(function () {
  'use strict';

  // import
  const Messages = window.Messages;
  const MsgForm = window.MsgForm;

  class App {
    constructor(options) {
      this._elem = options.elem;

      this._messages = new Messages({
        elem: document.querySelector('.js-messages'),
      });

      this._msgForm = new MsgForm({
        elem: document.querySelector('.js-msg-form'),
      });

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
        this._render();
      };
    }
  }

  // export
  window.App = App;
}());
