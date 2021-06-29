import axios from 'axios';

export default function handleApi(endpoint, method, params, success, error) {
  axios
    .request({
      method: method,
      url: endpoint,
      data: params,
      timeout: 5000,
    })
    .then((response) => {
      success(response);
    })
    .catch((e) => {
      error(e);
      console.log(e);
    });
}
