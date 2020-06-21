import React from 'react'
import logo from "./../assets/logo.svg";

export function Header() {

    return (
        <>
            <div className="header" id="one">
                <div className="links">
                    <a href="/personal">Personal</a>
                    <a href="/business">Business</a>
                    <a href="/partners">Partners</a>
                </div>

                <div className="logo">
                    <img alt="Upold logo" src={logo}></img>
                </div>

                <a href="/login" className="login" >
                    <button>Log In</button>
                </a>

            </div>

        </>
    );

}
