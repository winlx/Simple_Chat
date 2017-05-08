(function () {
  'use strict';

  class MsgForm {
    constructor({ elem }) {
      this._elem = elem;

      // Определим здесь, чтобы можно было использовать в removeEventListener
      this._onSubmit = this._onSubmit.bind(this);
      this._initEvents();
    }

    _initEvents() {
      this._elem.addEventListener('submit', this._onSubmit);
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
          <input type="text" name="username" required placeholder="Имя пользователя">
          <br>
          <textarea name="message" rows="3" cols="35" required placeholder="Введите сообщение"></textarea>
          <br>
          <input type="submit" value="Отправить">
         </form>
      `;
    }
  }

  // export
  window.MsgForm = MsgForm;
}());
