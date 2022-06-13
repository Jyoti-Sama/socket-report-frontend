import React, { useEffect, useState } from 'react'
import io from 'socket.io-client';

function StatusComponent() {
    const socket = io(`https://socket-report-backend.herokuapp.com`);

    const [status, setStatus] = useState('')

    useEffect(() => {
        socket.on("response data", (message) => {
            console.log(message)
            setStatus(message.message)
        })
    }, [socket]);

    if(status) {
        setTimeout(() => {
            setStatus('')
        }, 4000)
    }

    return (
        <div>status - {status}</div>
    )
}

export default StatusComponent;