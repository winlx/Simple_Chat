(function () {
  'use strict';

  class MsgForm {
    constructor({ elem }) {
      this._elem = elem;

      /**
       * Привязывает this, чтобы можно было использовать в removeEventListener
       * @private
       */
      this._onSubmit = this._onSubmit.bind(this);
      this._username = this._getUserName();
      this._initEvents();
    }

    /**
     * Запросить имя для чата.
     * @returns {String}
     * @private
     */
    _getUserName() {
      while (!this._username) {
        this._username = prompt('Введите ваше имя для чата', '');

        if (this._username) break;

        alert('Вы не ввели имя, запрос повторится.');
      }

      // Временное значение
      // this._username = 'Aleksei';

      return this._username;
    }

    _initEvents() {
      this.on('submit', this._onSubmit);
    }

    /**
     * Назначить обработчик события на форме.
     * @param {string} event
     * @param {function} callback
     */
    on(event, callback) {
      this._elem.addEventListener(event, callback);
    }

    _onSubmit(event) {
      event.preventDefault();

      let dataForm = this._getMessageData();

      this.onSubmit(dataForm);
    }

    /**
     * Получить данные для сообщения в виде объекта.
     * @returns {Object} { username: String, message: String, timestamp: Date }
     * @private
     */
    _getMessageData() {
      let data = {};

      data.username = this._username;
      data.message = this._elem.querySelector('[name=message]').value;
      data.timestamp = Date.now();

      return data;
    }

    /**
     * Обработчик сообщений формы, который назначается снаружи.
     * @param {Object} message - Объект сообщения.
     * @param {String} message.username - Имя пользователя.
     * @param {String} message.message - Сообщение.
     * @param {String} message.timestamp - Время сообщения.
     */
    onSubmit(message) {
      console.warn('You should define your own onSubmit');
      console.info(`message: ${message}`);
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
