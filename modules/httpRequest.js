(function () {
  'use strict';

  class HttpRequest {
    constructor(databaseURL) {
      this._databaseURL = databaseURL;
    }

    /**
     * Запросить и передать данных с/на сервер.
     * @param {Object} data - Передаваемые данные на сервер.
     * @param {String} type - Метод запроса.
     * @return {Promise}
     */
    sendRequest(data = {}, type = 'GET') {
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(type, this._databaseURL);

        xhr.onload = () => {
          if (xhr.status === 200) {
            let json = JSON.parse(xhr.responseText);
            resolve(json);
          } else {
            reject(xhr.statusText);
          }
        };

        xhr.onerror = (error) => {
          reject(error);
        };

        xhr.send(JSON.stringify(data));
      });
    }
  }

  // export
  window.HttpRequest = HttpRequest;
}());
