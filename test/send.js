const adAxios = require('../dist/index');
// const axios =  require('axios');

// axios.post('http://172.16.6.201/base/api/v1/base/user/login', { username : 'L10044', password: '456' }).then(res => {
//   console.log(res, '1234')
// })
const request = new adAxios({
  baseUrl: ''
});

request.getPureInstance('http://172.16.6.201/base/api/v1/base/user/login', {})({
  username: 'L10044',
  password: '456'
}).then(res => {
  console.log(res, '11223344')
});