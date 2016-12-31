//Unix epic Jan 1st 1970 00:00:00 am
var moment = require('moment');
var date = new Date();
console.log(date.getMonth());

var date = moment();
date.add(1, 'year').subtract(9, 'months');
console.log(date.format('MMM Do YYYY'));


//10:35 am
var createAt = 1234;
var date = moment(1234);
var someTimeStamp = moment().valueOf();
console.log(someTimeStamp);
console.log(date.format('h:mm a'));
