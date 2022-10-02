// List of Dependencies imported using require
const api = require('express').Router();
const path = require ('path');
const fs = require ('fs');
var uniqid = require('uniqid');

// ########################################################################
// Route 1: Return all notes
// ########################################################################
api.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
});

// ########################################################################
// Route 2: Add notes to the local json file
// ########################################################################
api.post('/notes', (req,res) => {
    //Step 1: Recived information from call in req variable
    let auxNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqid(), //Will add a unique ID to each note.
    };

    //Step 2: Get the current data file state, to add the new note, else privious infromation is erased.
    let db = JSON.parse(fs.readFileSync('./db/db.json', "utf8")); 

    //Step 3: with the current information push the new object.
    db.push(auxNote);

    //Step 4: Update the data base
    fs.writeFileSync('./db/db.json', JSON.stringify(db))
    res.json(db);

});

// ########################################################################
// Extra: Delete notes from the json file.
// ########################################################################

api.delete('/notes/:id', (req,res) => {

    //Step 1: Get the current data file state, to add the new note, else privious infromation is erased.
    let database = JSON.parse(fs.readFileSync('./db/db.json', "utf8")); 

    //Step 2: Use the unique id to delete the note
    const result = database.filter(db => db.id !== req.params.id);

    //Step 1: Push the current data json state, to delete the note.
    const updatedNotes = fs.writeFileSync('./db/db.json', JSON.stringify (result));

});


module.exports = api;