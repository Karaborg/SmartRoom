var express = require('express');
var router = express.Router();

var async = require("async");
var mongoose = require('mongoose');
var database = require('../core/database.js');
var model = require('../core/Model/model.js');

require('dotenv').config();

var gpio = require('rpi-gpio');

gpio.setup(process.env.GPIO_1, gpio.DIR_OUT);
gpio.setup(process.env.GPIO_2, gpio.DIR_OUT);
gpio.setup(process.env.GPIO_3, gpio.DIR_OUT);
gpio.setup(process.env.GPIO_4, gpio.DIR_OUT);

var gpioArray = [process.env.GPIO_1, process.env.GPIO_2, process.env.GPIO_3, process.env.GPIO_4];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

createDatabase();
setup();

router.post('/switch',function (req, res) {
  var data = req.body;
  try {
    model.findById(data.switchName, function (param) {
      var newState;
      if (param.account.state) {
        newState = false;
        var number = param.account.switchName.replace("slot", "");
        whichOneToClose(number)
      }else{
        newState = true;
        var number = param.account.switchName.replace("slot", "");
        whichOneToOpen(number)
      }
      var newData = {
        switchName: param.account.switchName,
        state: newState
      }
      model.deleteById(param.account.switchName, function (params) {
        model.create(newData, function(response){
          console.log(" Updated: " + param.account.switchName);

        })
      })
    })
    res.send(true)
  } catch (error) {
    res.send(false)
  }
});

router.post('/getNames',function (req, res) {
  var array = [process.env.Header, process.env.Title, process.env.SubTitle_1, process.env.SubTitle_2, process.env.SubTitle_3, process.env.SubTitle_4]
  res.send(array);
});

router.post('/connection',function (req, res) {
  var data = req.body;
  try {
    var database = require('../core/database.js');
    res.send(true);
  } catch (error) {
    console.log("Database Connection Fail: " + error)
    res.send(false);
  }
});

router.post('/setup', function (req, res) {
  var data = req.body;
  var array = [];
  model.list(function (response) {
    for (let i = 0; i < response.accounts.length; i++) {
      if (response.accounts[i].state) {
        array.push(response.accounts[i].switchName)
      }
    }
    res.send(array)
  })
});

function createDatabase() {
  model.list(function (response) {
    if (response.accounts.length < 4) {
      for (let i = 0; i < 4; i++) {
        model.findById('slot' + (i + 1), function (param) {
          if (param.account == null) {
            var data = {
              switchName: 'slot' + (i + 1),
              state: false
            }
            model.create(data, function(response){
              console.log("Database Created/Updated");
            })
          }
        })
      }
    }
  })
}

function setup() {
  model.list(function (response) {
    for (let i = 0; i < response.accounts.length; i++) {
      if (response.accounts[i].state) {
        whichOneToOpen(response.accounts[i].switchName.replace("slot", ""))
      } else {
        whichOneToClose(response.accounts[i].switchName.replace("slot", ""))
      }
    }
  })
}

function whichOneToOpen(number) {
  openGPIO(gpioArray[number - 1]);
}

function whichOneToClose(number) {
  closeGPIO(gpioArray[number - 1]);
}

function closeGPIO(i){
  gpio.write(i, true, function(err) {
    if (err) throw err;
  });
  console.log("Close GPIO #" + i)
}

function openGPIO(i){
  gpio.write(i, false, function(err) {
    if (err) throw err;
  });
  console.log("Open GPIO #" + i)
}

module.exports = router;
