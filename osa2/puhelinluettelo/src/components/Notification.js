import React from 'react'

const Notification = ({message = null, notifType}) => {
    if(message === null) return null

    return <div className={`${notifType}`} >
        {message}
    </div>
}

export {Notification}