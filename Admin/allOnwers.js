const Admins = require("../model/adminSchema");

const getAllOwners = async (req, res) => {
    try {
        const owners = await Admins.find();
        if (!owners || owners.length === 0) {
            return res.status(404).json({ message: "No owners found" });
        }
        return res.status(200).json(owners);
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = getAllOwners;
