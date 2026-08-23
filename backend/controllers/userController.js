const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");


// GET all users
const getUsers = async (req, res) => {
    try {
        logger.info("Fetching users");

        const users = await User.find()
            .populate("favoritePaintings")
            .select("-password");


        logger.info("Users fetched successfully", {
            count: users.length,
        });


        res.json(users);

    } catch (err) {
        logger.error("Failed to fetch users", {
            error: err,
        });

        res.status(500).json({
            message: "Server error",
        });
    }
};



// GET single user
const getUserById = async (req, res) => {
    try {
        logger.info("Fetching user", {
            userId: req.params.id,
        });


        const user = await User.findById(req.params.id)
            .populate("favoritePaintings")
            .select("-password");


        if (!user) {
            logger.warn("User not found", {
                userId: req.params.id,
            });

            return res.status(404).json({
                message: "User not found",
            });
        }


        logger.info("User fetched successfully", {
            userId: user._id,
            username: user.username,
        });


        res.json(user);


    } catch (err) {
        logger.error("Failed to fetch user", {
            userId: req.params.id,
            error: err,
        });

        res.status(500).json({
            message: "Server error",
        });
    }
};



// CREATE user
const createUser = async (req, res) => {
    try {
        const {
            username,
            email,
            password,
        } = req.body;


        logger.info("Creating user", {
            username,
            email,
        });


        if (!username || !email || !password) {
            return res.status(400).json({
                message: "Username, email and password are required",
            });
        }



        const existingUser = await User.findOne({
            $or: [
                { username },
                { email },
            ],
        });



        if (existingUser) {
            return res.status(409).json({
                message: "Username or email already exists",
            });
        }



        const hashedPassword = await bcrypt.hash(
            password,
            10
        );



        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });



        logger.info("User created successfully", {
            userId: user._id,
        });



        res.status(201).json({
            id: user._id,
            username: user.username,
            email: user.email,
        });



    } catch (err) {

        logger.error("Failed to create user", {
            error: err,
        });


        res.status(500).json({
            message: "Server error",
        });
    }
};



// LOGIN user
const loginUser = async (req, res) => {
    try {

        const {
            email,
            password,
        } = req.body;



        logger.info("User login attempt", {
            email,
        });



        const user = await User.findOne({
            email,
        });



        if (!user) {
            logger.warn("Login failed - user not found", {
                email,
            });


            return res.status(401).json({
                message: "Invalid email or password",
            });
        }



        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );



        if (!passwordMatch) {

            logger.warn("Login failed - incorrect password", {
                email,
            });


            return res.status(401).json({
                message: "Invalid email or password",
            });
        }



        const token = jwt.sign(
            {
                id: user._id,
                username: user.username,
                email: user.email,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );



        logger.info("Login successful", {
            userId: user._id,
        });



        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
            },
        });



    } catch (err) {

        logger.error("Login failed", {
            error: err,
        });


        res.status(500).json({
            message: "Server error",
        });
    }
};

// UPDATE user
const updateUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (username !== undefined) {
            user.username = username;
        }

        if (email !== undefined) {
            user.email = email;
        }

        if (password !== undefined) {
            user.password = await bcrypt.hash(password, 10);
        }

        await user.save();

        res.json({
            id: user._id,
            username: user.username,
            email: user.email,
        });
    } catch (err) {
        logger.error("Failed to update user", {
            userId: req.params.id,
            error: err,
        });

        res.status(500).json({
            message: "Server error",
        });
    }
};

// DELETE user
const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        await User.findByIdAndDelete(req.params.id);

        res.json({
            message: "User deleted successfully",
        });
    } catch (err) {
        logger.error("Failed to delete user", {
            userId: req.params.id,
            error: err,
        });

        res.status(500).json({
            message: "Server error",
        });
    }
};



module.exports = {
    getUsers,
    getUserById,
    createUser,
    loginUser,
    updateUser,
    deleteUser
};