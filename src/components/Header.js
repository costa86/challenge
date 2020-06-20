import React from 'react'
import logo from "./../assets/logo.svg";

export function Header() {


    return (
        <>
            <div className="header">
                <h3>HEADER</h3>
                <div className="nav-links">
                    <a href="/#">Personal</a>
                    <a href="/#">Business</a>
                    <a href="/#">Partners</a>
                </div>

                <button className="login">Log In</button>
                <img className="logo" alt="Upold logo" src={logo}></img>

            </div>

        </>
    )

}
