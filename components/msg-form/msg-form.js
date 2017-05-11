(function () {
  'use strict';

  class MsgForm {
    /**
     * @param {Object} options
     */
    constructor(options) {
      this._elem = options.elem;

      /**
       * Привязывает this, чтобы можно было использовать в removeEventListener
       * @private
       */
      this._onSubmit = this._onSubmit.bind(this);
      this._username = this._getUserName();
      this._initEvents();
    }

    /**
     * Назначение обработчика события на форме.
     * @param {string} event
     * @param {function} callback
     */
    on(event, callback) {
      this._elem.addEventListener(event, callback);
    }

    _initEvents() {
      this.on('submit', this._onSubmit);
    }

    onSubmit(message) {
      console.warn('You should define your own onSubmit');
      console.info(`message: ${message}`);
    }

    _onSubmit(event) {
      event.preventDefault();

      let dataForm = this._getMessageData();

      this.onSubmit(dataForm);
    }

    _getUserName() {
      while (!this._username) {
        this._username = prompt('Введите ваше имя для чата', '');

        if (this._username) break;

        alert('Вы не ввели имя, запрос повторится.');
      }

      return this._username;
    }

    /**
     * Получение данных для сообщения в виде объекта.
     * @returns {Object} { username: String, message: String }
     * @private
     */
    _getMessageData() {
      let data = {};

      data.username = this._username;
      data.message = this._elem.querySelector('[name=message]').value;
      data.timestamp = new Date().toLocaleString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });

      return data;
    }

    render() {
      this._elem.innerHTML = `
        <form class="msg-form">
          <textarea class="msg-form__input-text" name="message" rows="3" required placeholder="Введите сообщение..."></textarea>
          <br>
          <input class="msg-form__submit" type="submit" value="Отправить">
         </form>
      `;
    }
  }

  // export
  window.MsgForm = MsgForm;
}());
