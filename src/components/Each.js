import React from 'react'


export function Each(props) {

    const myRound = num => (+num).toFixed(2).toString();

    return (
        <>
            <div className="card">
                <h3>{myRound(props.amount / props.item.bid)}</h3>
                <h3>{props.item.pair.slice(0, 3)}</h3>
            </div>

        </>
    )

}
