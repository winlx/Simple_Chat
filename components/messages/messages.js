import styles from './messages.css';
import messagesTmpl from './messages.tmpl.pug';

class Messages {
  /**
   * @param {Object} options - Настройки компоненты.
   * @param {Object} options.elem - DOM element
   * @param {Object} options.data - Данные сообщений.
   * @param {Array} options.data.messages - Массив объектов сообщений.
   */
  constructor(options) {
    this.elem = options.elem;
    this._data = options.data || { messages: [] };
  }

  /**
   * Add a message.
   * @param {Object} message - Message object.
   * @param {string} message.username - Username.
   * @param {string} message.message - Message.
   * @param {string} message.timestamp - Message timestamp.
   */
  addMessage(message) {
    this._data.messages.push(message);
  }

  /**
   * Connect an array of messages from the server, for example.
   * @param {Object[]} messages - An array of message objects.
   * @param {string} messages.username - Username.
   * @param {string} messages.message - Message.
   * @param {string} messages.timestamp - Message timestamp.
   */
  setMessages(messages) {
    this._data.messages = messages;
  }

  render() {
    this.elem.innerHTML = messagesTmpl(this._data);
    this._scrollToBottom();
  }

  _scrollToBottom() {
    let messagesFeed = this.elem.querySelector('.messages__feed');
    messagesFeed.scrollTop = messagesFeed.scrollHeight - messagesFeed.clientHeight;
  }
}

export default Messages;
