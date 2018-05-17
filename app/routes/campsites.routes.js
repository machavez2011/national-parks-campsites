const router = require("express").Router();
const mongodb = require("../mongodb");
const conn = mongodb.connection;
const ObjectId = mongodb.ObjectId;
const responses = require("../responses");

module.exports = router;

//CRUD router functions

router.get("/", function(req, res) {
  readAll()
    .then(campsites => {
      const responseModel = new responses.ItemsResponse();
      responseModel.items = campsites;
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
});

router.get("/:id([0-9a-fA-F]{24})", function(req, res) {
  readById(req.params.id)
    .then(campsite => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = campsite;
      res.status(200).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
});

router.post("/", function(req, res) {
  const campsite = req.body;
  create(campsite)
    .then(newCampcampsite => {
      const responseModel = new responses.ItemResponse();
      responseModel.item = newCampcampsite;
      res.status(201).json(responseModel);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(new responses.ErrorResponse(err));
    });
});

router.put("/:id([0-9a-fA-F]{24})", function(req, res) {
  update(req.params.id, req.body)
    .then(updatedCampsite => {
      res.status(200).json(updatedCampsite);
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
    .collection("campsites")
    .find()
    .toArray()
    .then(campsites => {
      return campsites;
    });
}

function readById(id) {
  return conn
    .db()
    .collection("campsites")
    .findOne({ _id: new ObjectId(id) })
    .then(campsite => {
      return campsite;
    });
}

function create(campsite) {
  return conn
    .db()
    .collection("campsites")
    .insert(campsite)
    .then(campsite => {
      return campsite;
    });
}

function update(id, doc) {
  doc._id = new ObjectId(doc._id);
  // if (doc._id) {
  //   doc._id = new ObjectId(doc._id)
  // }
  return conn
    .db()
    .collection("campsites")
    .replaceOne({ _id: new ObjectId(id) }, doc)
    .then(updatedCampsite => {
      return updatedCampsite;
    });
}

function _delete(id) {
  return conn
    .db()
    .collection("campsites")
    .deleteOne({ _id: new ObjectId(id) })
    .then(result => Promise.resolve());
}
