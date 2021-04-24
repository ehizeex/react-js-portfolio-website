import React, { Component } from 'react'
import { ToastContainer } from 'react-toastify';
import './Toast.css'

class Toast extends Component {
    render() {
        return (
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                className="toast-container"
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />
        )
    }
}

export default Toast
