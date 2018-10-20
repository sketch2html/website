'use strict';

import xhr from 'xhr';

let net = {
  xhr,
  postJSON(options, callback, error) {
    options = options || {};
    let csrfToken = $util.cookie('csrfToken');
    options.headers = {
      'x-csrf-token': csrfToken,
    };
    options.method = 'post';
    options.json = true;
    xhr(options, function(err, resp, body) {
      if(err) {
        error && error(err);
      }
      else {
        callback(body);
      }
    });
  },
};

export default net;
