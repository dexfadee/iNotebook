import React from 'react'

const Alert = (props) => {
    return (
        <>
        {props.message && <div className="w-full p-4 z-2 text-sm text-blue-700 bg-blue-200 dark:bg-gray-800 dark:text-blue-400" role="alert">
            <span className="font-medium">{props.message}</span>
        </div>}
        </>
    )
}

export default Alert