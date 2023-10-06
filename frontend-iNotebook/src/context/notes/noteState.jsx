import { useState } from "react";
import NoteContext from "./noteContext";

const noteState = (props) => {

    const host = 'http://localhost:5000'

    const [notes, setNotes] = useState([])

    // Getting all notes
    const getNotes = async () => {
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: "GET",
            headers: {
                "token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json);
    }

    // Adding notes
    const addNote = async (title, description, tag) => {
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        let note = {title, description, tag};
        setNotes(notes.concat(note));
    }

    // Editing notes
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        getNotes();
    }

    // Deleting note
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE",
            headers: {
                "token": localStorage.getItem('token')
            }
        });
        let newNote = notes.filter((note)=>{return note._id!==id})
        setNotes(newNote);
    }

    return (
        <NoteContext.Provider value={{notes, addNote, deleteNote, editNote, getNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default noteState;