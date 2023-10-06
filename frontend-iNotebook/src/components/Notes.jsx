import React, { useState, useContext, useEffect, useRef } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    let history = useNavigate();
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;

    const [state, setState] = useState('hidden')
    const [Id, setId] = useState('');
    const [noteModal, setnoteModal] = useState({})

    useEffect(() => {
        if (localStorage.getItem('token')) {
            getNotes();
        }else{
            history('/login');
        }
        // eslint-disable-next-line
    }, [])

    const modalShow = (id, note) => {
        setnoteModal(note)
        setId(id);
        setState('block')
    }

    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
        setnoteModal({ [e.target.name]: e.target.value })
    }

    const handleClick = () => {
        editNote(Id, note.title, note.description, note.tag)
        props.showAlert('Note Edited');
        setState('hidden')
    }

    const onclick = function () {
        setState('hidden')
    }

    window.onclick = function (event) {
        if (event.target == document.getElementById('defaultModal')) {
            setState('hidden')
        }
    }

    return (
        <>
            <div id="defaultModal" tabIndex="-1" className={`${state} flex fixed z-50 w-screen p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen items-center justify-center bg-opacity-50 bg-gray-500`}>
                <div className="relative w-full max-w-2xl max-h-full">

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div className="flex items-start justify-between p-3 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                Edit note
                            </h3>
                            <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="defaultModal" onClick={onclick}>
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                            </button>
                        </div>

                        <div className="p-6 space-y-3">
                            <label htmlFor="title" className="ml-[10%] block text-xl font-semibold text-gray-900 dark:text-white">Title</label>
                            <input onChange={onChange} type="text" id="title" name="title" className="mx-[auto] w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required value={noteModal.title}></input>
                            <label htmlFor="tag" className="ml-[10%] block text-xl font-semibold text-gray-900 dark:text-white">Tag</label>
                            <input onChange={onChange} type="text" id="tag" name="tag" className="mx-[auto] w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tag" value={noteModal.tag}></input>
                            <label htmlFor="description" className="block text-2xl font-semibold ml-[10%] text-gray-900 dark:text-white">Enter your note</label>
                            <textarea onChange={onChange} id="description" name="description" rows="4" className="block mx-[auto] p-2.5 text-sm w-4/5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your note here" value={noteModal.description}></textarea>
                            <button type="button" disabled={note.title.length < 5 || note.description.length < 5} className="w-fit ml-[10%] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-900 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <AddNote showAlert={props.showAlert}/>
            <div className='mx-[10%] my-6 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10 items-center'>
                {notes.map(note => {
                    return <NoteItem key={note._id} note={note} modalShow={modalShow} showAlert={props.showAlert}/>
                })}
            </div>
        </>
    )
}

export default Notes