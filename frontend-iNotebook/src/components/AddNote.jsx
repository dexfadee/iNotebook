import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context;

    const [note, setNote] = useState({title: "", description: "", tag: ""})

    const handleClick = () => {
        addNote(note.title, note.description, note.tag);
        props.showAlert('Note Added!')
        setNote({title: "", description: "", tag: ""})
    }

    const onChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value})
    }

    return (
        <div className='w-full flex flex-col py-6'>
            <label htmlFor="title" className="ml-[10%] block mb-2 text-xl font-bold text-gray-900 dark:text-white">Title</label>
            <input onChange={onChange} type="text" id="title" name="title" className="mx-[auto] mb-3 w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" required value={note.title} />
            <label htmlFor="tag" className="ml-[10%] block mb-2 text-xl font-bold text-gray-900 dark:text-white">Tag</label>
            <input onChange={onChange} type="text" id="tag" name="tag" className="mx-[auto] mb-3 w-4/5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tag" value={note.tag} />
            <label htmlFor="description" className="block mb-2 text-2xl font-bold ml-[10%] text-gray-900 dark:text-white">Enter your note</label>
            <textarea onChange={onChange} id="description" name="description" rows="4" className="block mx-[auto] p-2.5 text-sm w-4/5 text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your note here" required value={note.description} />
            <button type="button" disabled={note.title.length < 5 || note.description.length < 5} className="w-fit ml-[10%] text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mt-3 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={handleClick}>Add Note</button>
        </div>
    )
}

export default AddNote