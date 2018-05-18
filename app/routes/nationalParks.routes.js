const router = require("express").Router();
const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;
const responses = require("../responses");

module.exports = router;

//CRUD router functions

router.get("/", function(req, res) {
  readAll()
    .then(nationalParks => {
      const responsesModel = new responses.ItemResponse();
      responsesModel.items = nationalParks;
      res.status(200).json(responsesModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(new responses.ErrorResponse(err));
    });
});

router.get("/:id([0-9a-fA-F]{24})", function(req, res) {
  readById(req.params.id)
    .then(nationalPark => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = nationalPark;
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(new responses.ErrorResponse(err));
    });
});

router.post("/", function(req, res) {
  const nationalPark = req.body;
  create(nationalPark)
    .then(id => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = id;
      res.status(201).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(new responses.ErrorResponse(err));
    });
});

router.put("/:id([0-9a-fA-F]{24})", function(req, res) {
  update(req.params.id, req.body)
    .then(updatedNationalPark => {
      res.status(200).json(updatedNationalPark);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(new responses.ErrorResponse(err));
    });
});

router.delete("/:id([0-9a-fA-F]{24})", function(req, res) {
  _delete(req.params.id)
    .then(() => {
      res.status(200).json(new responses.SuccessResponse());
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(new responses.ErrorResponse(err));
    });
});

//server side functions

function readAll() {
  return conn
    .db()
    .collection("nationalParks")
    .find()
    .toArray()
    .then(nationalParks => {
      return nationalParks;
    });
}

function readById(id) {
  return conn
    .db()
    .collection("nationalParks")
    .findOne({ _id: new ObjectId(id) })
    .then(nationalPark => {
      return nationalPark;
    });
}

function create(nationalPark) {
  return conn
    .db()
    .collection("nationalParks")
    .insert(nationalPark)
    .then(newNationalPark => newNationalPark.insertedIds[0].toString());
}

function update(id, doc) {
  //doc._id = new ObjectId(doc._id);
  if (doc._id) {
    doc._id = new ObjectId(doc._id);
  }
  return conn
    .db()
    .collection("nationalParks")
    .replaceOne({ _id: new ObjectId(id) }, doc)
    .then(updatedNationalPark => {
      return updatedNationalPark;
    });
}

function _delete(id) {
  return conn
    .db()
    .collection("nationalParks")
    .deleteOne({ _id: new ObjectId(id) })
    .then(result => Promise.resolve());
}
