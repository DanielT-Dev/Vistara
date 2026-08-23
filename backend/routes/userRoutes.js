const express = require("express");

const {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
} = require("../controllers/userController");


const router = express.Router();


// CREATE ACCOUNT
router.post("/", createUser);


// LOGIN
router.post("/login", loginUser);


// GET USERS
router.get("/", getUsers);


// GET USER
router.get("/:id", getUserById);

// UPDATE USER
router.put("/:id", updateUser);

// DELETE USER
router.delete("/:id", deleteUser);

module.exports = router;