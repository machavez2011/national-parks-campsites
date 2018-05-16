const router = require("express").Router();
const contactsRoutes = require("./contacts.routes");
const nationalParksRoutes = require("./nationalParks.routes");

module.exports = router;

router.use("/api/contacts", contactsRoutes);
router.use("/api/national-parks", nationalParksRoutes);
