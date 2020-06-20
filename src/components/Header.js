import React from 'react'
import logo from "./../assets/logo.svg";

export function Header() {


    return (
        <>
            <div className="header">
                <div className="nav-links">
                    <a href="/personal">Personal</a>
                    <a href="/business">Business</a>
                    <a href="/partners">Partners</a>
                </div>

                <a href="/login" className="login" >
                    <button>Log In</button>
                </a>

                <img className="logo" alt="Upold logo" src={logo}></img>
            </div>

        </>
    )

}
