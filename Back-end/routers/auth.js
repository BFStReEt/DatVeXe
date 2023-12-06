const authController = require("../controller/authController")

const routes = require("express").Router();

routes.post("/register", authController.registerUser);

module.exports = routes;