import React from 'react'


export function Each(props) {

    const imageNotFound = require("./../assets/XPT.png");

    const roundedResult = num => (+num).toFixed(2).toString();

    let currencyConverted = roundedResult(props.amount / props.item.bid);

    let currencyName = props.item.pair.slice(0, 3);

    /**
     * Returns image for currency. Possible outputs:
     * 1. File with the parameter ImageName + ".pgn"
     * 2. Default image, case #1 is not found
     * @param {*} imageName 
     */
    function setImg(imageName) {
        let res;
        try {
            res = require(`./../assets/${imageName}.png`);
        } catch (error) {
            res = imageNotFound;
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
