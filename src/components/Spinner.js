import React from 'react'
import loading from '../loading.gif'

const Spinner = () => {
    return (
        <div className="spinner my-5">
            <img src={loading} alt="loading" />
        </div>
    )
}

export default Spinner;
