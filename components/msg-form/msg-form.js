import styles from './msg-form.css';
import msgFormTmpl from './msg-form.tmpl.pug';

class MsgForm {
  constructor({ elem }) {
    this.elem = elem;

    this._onSubmit = this._onSubmit.bind(this);
    this._username = this._getUserName();
    this._initEvents();
  }

  /**
   * Request a chat username.
   * @returns {string}
   * @private
   */
  _getUserName() {
    while (!this._username) {
      this._username = prompt('Enter your nickname for chat', '');

      if (this._username) break;

      alert('You dod not enter a nickname, the query will be repeated');
    }

    // Temporary value
    // this._username = 'Aleksei';

    return this._username;
  }

  _initEvents() {
    this.on('submit', this._onSubmit);
  }

  /**
   * Assign an event handler to the form.
   * @param {string} event
   * @param {Function} callback
   */
  on(event, callback) {
    this.elem.addEventListener(event, callback);
  }

  _onSubmit(event) {
    event.preventDefault();

    let dataForm = this._getMessageData();

    this.onSubmit(dataForm);
  }

  /**
   * Get the data for the message from the form.
   * @returns {Object} { username: String, message: String, timestamp: Date }
   * @private
   */
  _getMessageData() {
    let data = {};

    data.username = this._username;
    data.message = this.elem.querySelector('[name=message]').value;
    data.timestamp = Date.now();

    return data;
  }

  /**
   * A form message handler that is assigned from the outside.
   * @param {Object} message - Message object.
   * @param {string} message.username - Username.
   * @param {string} message.message - Message.
   * @param {string} message.timestamp - Message timestamp.
   */
  onSubmit(message) {
    console.warn('You should define your own onSubmit');
    console.info(`message: ${message}`);
  }

  render() {
    this.elem.innerHTML = msgFormTmpl();
  }
}

export default MsgForm;
