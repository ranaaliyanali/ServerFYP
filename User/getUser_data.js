const mongoose = require('mongoose');

const getUser = async (req, res) => {
    try {
        const userData = req.user;

        return res.status(200).json({ userData});
    } catch (error) {
        console.error("Error: from the owner route", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = getUser;
