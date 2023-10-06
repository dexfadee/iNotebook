const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// ROUTE 1: Creating an endpoint to fetch all notes for a user, Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {

    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)

})

// ROUTE 2: Add a new Note using POST, login required
router.post('/addnote', fetchUser, async (req, res) => {

    try {

        // Returning bad requests with errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;

        // Creating a new note
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        // Saving note and sending it in response
        const savedNote = await note.save();

        res.json(savedNote)

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server Error');
    }
})

// ROUTE 3: Update an existing note PUT, login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    try {

        // Returning bad requests with errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;

        // Creating a new note Object
        const newNote = {};

        // Updating note based on condition
        if (title) {newNote.title = title};
        if (description) {newNote.description = description};
        if (tag) {newNote.tag = tag};

        // Find the note to be updated
        let note = await Notes.findById(req.params.id);

        // Checking if note exist or not
        if(!note){ return res.status(400).send('Not found');}

        // Checking if the user is valid
        if(note.user.toString() != req.user.id){ return res.status(401).send('Not Allowed'); }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})

        res.json(note)

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server Error');
    }
})

// ROUTE 4: Deleting an existing note DELETE, login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {

        // Returning bad requests with errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Find the note to be deleted
        let note = await Notes.findById(req.params.id);

        // Checking if note exist or not
        if(!note){ return res.status(400).send('Not found');}

        // Checking if the user is valid - Don't allow if user does not own the note
        if(note.user.toString() != req.user.id){ return res.status(401).send('Not Allowed'); }

        // Deleting note
        note = await Notes.findByIdAndDelete(req.params.id);
        res.send("Deleted!")

    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internal server Error');
    }
})

module.exports = router;