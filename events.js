var servicebus = require('servicebus'),
    Document = require('./document');

module.exports = {
  initialize: initialize
};

function initialize(busUrl) {
  var bus = servicebus.bus({ url: busUrl });

  bus.subscribe('documentUpdated', documentUpdated);
}

function documentUpdated(document) {
  var query = { _id: document._id },
      options = { upsert: true },
      update = {
        $set: {
          title: document.title,
          content: document.content,
          updatedAt: document.updatedAt
        }
      };

  Document.findOneAndUpdate(query, update, options, function(err, document) {
    if (err) return console.log(err);
    console.log('Document updated:', document);
  });
}
