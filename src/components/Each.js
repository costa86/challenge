import React from 'react'

export function Each(props) {

    const myRound = num => (+num).toFixed(2).toString();

    let currencyConverted = myRound(props.amount / props.item.bid);

    let currencyName = props.item.pair.slice(0, 3);

    let currencyImage = `./../assets/${currencyName}.png`;

    let noCurrencyImage = `./../assets/XPT.png`;

    function setImg(source, defaultImg) {
        let url = source;
        let img = new Image();
        img.src = url;
        if (img.width === 0) {
            url = defaultImg;
        }
        return url;
    }

    return (
        <>
            <div className="card">
                <img alt={currencyName} src={setImg(currencyImage, noCurrencyImage)}></img>
                <h3>{currencyConverted}</h3>
                <h3>{currencyName}</h3>
            </div>

        </>
    );

}
