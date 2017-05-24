import styles from './app.css';
import Messages from '../messages/messages';
import MsgForm from '../msg-form/msg-form';
import HttpRequest from '../../modules/httpRequest';

class App {
  constructor(options) {
    this._elem = options.elem;
    this._databaseURL = options.databaseURL;

    this._createComponents();

    this._httpRequest = new HttpRequest(this._databaseURL);

    this._render();
    this._initApp();
  }

  _createComponents() {
    this._messages = new Messages({
      elem: document.createElement('div'),
    });

    this._msgForm = new MsgForm({
      elem: document.createElement('div'),
    });

    this._elem.appendChild(this._messages.elem);
    this._elem.appendChild(this._msgForm.elem);
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
   * Send messages to the server.
   * @param {Object} message - Message object.
   * @param {string} message.username - Username.
   * @param {string} message.message - Message.
   * @param {string} message.timestamp - Message timestamp.
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
   * Receive messages from the server.
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
   * Render chat messages only if there are new messages.
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
   * Check for new messages at the specified interval.
   * @private
   */
  _checkNewMessages() {
    setTimeout(() => {
      this._getRequest();
      this._checkNewMessages();
    }, 3000);
  }
}

export default App;
