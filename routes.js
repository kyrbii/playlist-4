const express = require("express");
const router = express.Router();

const home = require("./controllers/home.js");
const about = require("./controllers/about.js");
const dashboard = require("./controllers/dashboard.js");
const playlist = require("./controllers/playlist.js");
const accounts = require("./controllers/accounts.js");

const auth = require("./utils/auth.js");

router.get("/", home.index);
router.get("/login", accounts.login);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);
router.get("/about", about.index);

//protected routes
router.get("/dashboard", auth.protected, dashboard.index);
router.get("/dashboard/deleteplaylist/:id", auth.protected, dashboard.deletePlaylist);
router.post("/dashboard/addplaylist", auth.protected, dashboard.addPlaylist);
router.get("/playlist/:id", auth.protected, playlist.index);
router.get("/playlist/:id/deletesong/:songid", auth.protected, playlist.deleteSong);
router.post("/playlist/:id/addsong", auth.protected, playlist.addSong);
router.get("/song/:id/editsong/:songid", auth.protected, playlist.editSong); 
router.post("/song/:id/updatesong/:songid", playlist.updateSong); 

module.exports = router;
