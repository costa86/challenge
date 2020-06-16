import React from 'react'

function Currency(props) {
    return (
        <option>{props.item}</option>
    )
}


export function Currencies() {
    const choices = ["USD", "BRL", "EUR"];
    const allCurrencies = choices.map((e) => (
        <Currency item={e} />
    ));

    return (
        <>
            {allCurrencies}
        </>
    )

}
