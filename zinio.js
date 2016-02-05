'use strict';
var fs = require("fs");
console.log("\n *START* \n");
const logins = JSON.parse(fs.readFileSync("logins.json"));
var request = require('request');
var cheerio = require('cheerio');
var FileCookieStore = require('tough-cookie-filestore');
var j = request.jar(new FileCookieStore('cookies.json'));
var options = {
  url: 'https://api.github.com/repos/request/request',
  headers: {
    'User-Agent': 'request'
  }
};
let formData = {
  form:{
    username:logins.zinio.un,
    password:logins.zinio.pw,
    login:'Log In'
  }
};
const zinioDate = {
  form:{
    start_date:logins.dt.start,
    end_date:logins.dt.end,
    lib_id:520,
    inc_zeros:0,
    inc_barcode:0,
    inc_email:0,
    inc_library:0,
    inc_inactive:0,
    country:'',
    state:'',
    county:''
  }
};
request = request.defaults({ jar : j });
request(options,'https://www.rbdigital.com/login', function (error, response, html) {
  if (!error && response.statusCode == 200) {
    request.post('https://www.rbdigital.com/login',formData,
    function(err,response,html){
      request.post('https://www.rdbdigital.com/ajaxd.php?action=zinio_report_libmagazineclick',zinioDate,function (err, response, html) {
        console.log(err);
        console.log(html);
        console.log(response);
      });
    });
  }
});
