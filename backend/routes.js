const express = require("express");
const router = express.Router();
const path = require("path");

// MIDDEWARE
const upload = require("./middleware/upload-image");

// CONTROLLER DIFINE HIRE
const UserController = require("./controllers/user-controller");

// AKSES IMAGE
router.get("/image/:image", (req, res) => {
    res.sendFile(__dirname + "/public/images/" + req.params.filename);
});

// AUTH HANDLING
router.post("/login", UserController.Login);
router.post("/register", UserController.Register);
router.get("/user/:id", UserController.getUserById);
router.patch("/update-password/:id", upload.single("image") , UserController.updatePasswordUserById);
router.patch("/update-image/:id", upload.single("image") , UserController.updateImageUserById);
router.delete("/user/:id", UserController.deleteUserById);

module.exports = router;
