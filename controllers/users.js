const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    try {
        const db = mongodb.getDatabase().db('Contacts'); // use correct DB
        const result = await db.collection('users').find();
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users);
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
};

const getSingle = async (req, res) => {
    try {
        const userId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db('Contacts'); // use correct DB
        const result = await db.collection('users').find({ _id: userId });
        result.toArray().then((users) => {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(users[0]);
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user", error });
    }
};

module.exports = {
    getAll,
    getSingle
};
