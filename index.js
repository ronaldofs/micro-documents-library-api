var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

var Document = require('./document'),
    events = require('./events'),
    server = express(),
    port = process.env.PORT || 3003,
    dbUrl = process.env.DB_URL || 'mongodb://localhost/microservices-documents',
    busUrl = process.env.BUS_URL;

mongoose.connect(dbUrl);
events.initialize(busUrl);

server.use(bodyParser.json());

server.get('/', function(req, res, next){
  Document.find(function(err, documents) {
    if (err) return next(err);
    res.status(200).json(documents);
  });
});

server.get('/:id', function(req, res, next){
  Document.findById(req.params.id, function(err, document) {
    if (err) return next(err);
    if (!document) return res.status(404).json({ error: 'Not found' });
    res.status(200).json(document);
  });
});

server.use(function(err, req, res, next) {
  res.status(500).json(err);
});

server.listen(port);
