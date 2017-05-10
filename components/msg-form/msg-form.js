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

    // /**
    //  * Удаление обработчика события на форме.
    //  * @param {string} event
    //  * @param {function} callback
    //  */
    // off(event, callback) {
    //   this._elem.removeEventListener(event, callback);
    // }

    _initEvents() {
      this.on('submit', this._onSubmit);
    }

    onSubmit(message) {
      console.warn('You should define your own onSubmit');
      console.info(`message: ${message}`);
    }

    _onSubmit(event) {
      event.preventDefault();

      let dataForm = this._getFormData();

      this.onSubmit(dataForm);
    }

    /**
     * Получение данных из формы в виде объекта.
     * @returns {Object} { username: String, message: String }
     */
    _getFormData() {
      let formNames = this._elem.querySelectorAll('[name]');
      let data = {};

      formNames.forEach((elem) => {
        data[elem.name] = elem.value;
      });

      return data;
    }

    render() {
      this._elem.innerHTML = `
        <form class="msg-form">
          <input class="msg-form__username" type="text" name="username" required placeholder="Имя пользователя">
          <br>
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
