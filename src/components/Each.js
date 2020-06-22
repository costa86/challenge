import React from 'react'


export function Each(props) {
    
    const noImg = require("./../assets/XPT.png");

    const myRound = num => (+num).toFixed(2).toString();

    let currencyConverted = myRound(props.amount / props.item.bid);

    let currencyName = props.item.pair.slice(0, 3);

    /**
     * Returns image for currency. Possible outputs:
     * 1. File with the parameter name + ".pgn"
     * 2. Default image, case #1 is not found
     * @param {*} name 
     */
    function setImg(name) {
        let res;
        try {
            res = require(`./../assets/${name}.png`);
        } catch (error) {
            res = noImg;
        }
        return res;
    }


    return (
        <>
            <div className="card">
                <img alt={currencyName} src={setImg(currencyName)}></img>
                <h3>{currencyConverted}</h3>
                <h3>{currencyName}</h3>
            </div>

        </>
    );

}
