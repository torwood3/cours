/**
 * Created by Tor on 18/10/2015.
 */

var express = require('express');

module.exports = function() {

    var router = express.Router();
    var todos = [];


    router.get('/:person', function(req, res){
        if( typeof todos[req.params.person] === 'undefined' )
            res.json({message: "Not found!!"}).end();
        else
            res.json(todos[req.params.person]).end();
    });


    router.post('/:person', function(req, res){
        if( typeof todos[req.params.person] === 'undefined')
            todos[req.params.person] = [];

        todos[req.params.person].push(req.body.message);
        res.status(200).end();
    });


    router.post('/:person/delete', function(req, res){
        if( typeof todos[req.params.person] === 'undefined' )
            res.json({message: "Not found!"}).end();
        else {
            todos[req.params.person]=[];
            res.status(200).end();
        }
    });

    return router;
};

