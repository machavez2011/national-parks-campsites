const router = require("express").Router();
const campsitesRoutes = require("./campsites.routes");
const nationalParksRoutes = require("./nationalParks.routes");

module.exports = router;

router.use("/api/campsites", campsitesRoutes);
router.use("/api/national-parks", nationalParksRoutes);
