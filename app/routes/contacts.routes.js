const router = require("express").Router();
const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;
const responses = require("../responses");

module.exports = router;

//CRUD router functions

router.get("/", function(req, res) {
  readAll()
    .then(contacts => {
      const responseModel = new responses.ItemsResponse();
      responseModel.items = contacts;
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
});

router.get("/:id([0-9a-fA-F]{24})", function(req, res) {
  readById(req.params.id)
    .then(contact => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = contact;
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
});

router.post("/", function(req, res) {
  const contact = req.body;
  create(contact)
    .then(newContact => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = newContact;
      res.status(201).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
});

router.put("/:id([0-9a-fA-F]{24})", function(req, res) {
  update(req.params.id, req.body)
    .then(updatedContact => {
      res.status(200).json(updatedContact);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
});

router.delete("/:id([0-9a-fA-F]{24})", function(req, res) {
  _delete(req.params.id)
    .then(() => {
      const responseModel = new responses.SuccessResponse();
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
});

//Server side functions

function readAll() {
  return conn
    .db()
    .collection("contacts")
    .find()
    .toArray()
    .then(contacts => {
      return contacts;
    });
}

function readById(id) {
  return conn
    .db()
    .collection("contacts")
    .findOne({ _id: new ObjectId(id) })
    .then(contact => {
      return contact;
    });
}

function create(contact) {
  return conn
    .db()
    .collection("contacts")
    .insert(contact)
    .then(contact => {
      return contact;
    });
}

function update(id, doc) {
  doc._id = new ObjectId(doc._id);
  // if (doc._id) {
  //   doc._id = new ObjectId(doc._id)
  // }
  return conn
    .db()
    .collection("contacts")
    .replaceOne({ _id: new ObjectId(id) }, doc)
    .then(updatedContact => {
      return updatedContact;
    });
}

function _delete(id) {
  return conn
    .db()
    .collection("contacts")
    .deleteOne({ _id: new ObjectId(id) })
    .then(result => Promise.resolve());
}
