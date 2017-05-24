import App from './components/app/app';

let app = new App({
  elem: document.querySelector('.app'),
  databaseURL: 'https://simple-chat-7db27.firebaseio.com/simple-chat/messages.json',
});
