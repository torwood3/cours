/**
 * Created by plume on 25/07/2015.
 */
var express = require('express');
var request = require('request');
var api_key = process.env.API_KEY;

module.exports = function() {

  var router = express.Router();
  router.get('/', function (req, res) {
    res.render("index");
  });

  router.post('/questionnaire', function (req, res) {
    request.post({url : "http://localhost:3000/api/" + api_key + "/users",  form :
      {username : req.body.username, firstName : req.body.firstName, lastName: req.body.lastName, groupID: req.body.groupID,
        class: req.body.class, github: req.body.github, category: "student", email: req.body.email} },
      function (error, response, body) {
        if (!error && response.statusCode == 200) {
          res.json({});
        } else res.status(response.statusCode).end();
      });
  });

  return router;
};
