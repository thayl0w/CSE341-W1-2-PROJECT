const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

const getAll = async (req, res) => {
    //#swagger.tags = ['Users'];
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
        //#swagger.tags = ['Users'];
    try {
        const userId = new ObjectId(req.params.id);
        const db = mongodb.getDatabase().db('Contacts');
        const user = await db.collection('users').findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch user", error });
    }
};

const createUser = async (req, res) => {
        //#swagger.tags = ['Users'];
    try {
        const user = { 
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        };

        const response = await mongodb.getDatabase()
            .db('Contacts')
            .collection('users')
            .insertOne(user);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId, ...user });
        } else {
            res.status(500).json({ message: "Failed to create user" });
        }
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
};


const updateUser = async (req, res) => {
        //#swagger.tags = ['Users'];
    const userId = new ObjectId(req.params.id);
    const user = { 
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        favoriteColor: req.body.favoriteColor,
        birthday: req.body.birthday
    };
    const response = await mongodb.getDatabase().db('Contacts').collection('users').replaceOne({ _id: userId }, user);
    if (response.modifiedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while updating the user.');
    }   
};

const deleteUser = async (req, res) => {
        //#swagger.tags = ['Users'];
    const userId = new ObjectId(req.params.id);
    const response = await mongodb.getDatabase().db('Contacts').collection('users').deleteOne({ _id: userId });
    if (response.deletedCount > 0) {
        res.status(204).send();
    } else {
        res.status(500).json(response.error || 'Some error occurred while deleting the user.');
    }   
};

module.exports = {
    getAll,
    getSingle,
    createUser,
    updateUser,
    deleteUser
};
