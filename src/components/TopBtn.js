import React from 'react'

/**
 * "GO-TO-TOP" button. It is only visible when user scrolls down
 * @param {*} props 
 */
export function TopBtn(props) {

    function scrollFun() {
        let one = document.createElement("button");
        one.id="topBtn";
        let btn = document.getElementById("topBtn");
        if (btn) {
            btn.style.display = "none";
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                btn.style.display = "block";
            }
        }
    }

    function goToTop() {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    window.onscroll = function () { scrollFun() };

    return (
        <>
            <button onClick={goToTop} className="top" id="topBtn"><span>
                <img title="Go to top" alt="top" src="https://img.icons8.com/material-outlined/30/000000/send-letter.png" />
            </span></button>

        </>
    );
}