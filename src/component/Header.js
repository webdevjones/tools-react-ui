import React from 'react'

const Header = ({ title, handleHeaderClick }) => {
    if (!title) {
        title = "Email Builder 10000"
    }
    return (
        <div
            className="container-fluid"
            id="header"
        >
            <div
                className="container navbar"
            >
                <div className="title">
                    <button input="submit" onClick={handleHeaderClick}>
                        <h1>
                            {title}
                        </h1>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Header