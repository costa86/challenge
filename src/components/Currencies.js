import React from 'react'

function Currency(props) {
    return (
        <option>{props.item}</option>
    );
}


export function Currencies() {
    const choices = [
        "USD", "AED", "ARS", "AUD", "BAT",
        "BHC", "BRL", "BTG", "CAD", "CHF",
        "CNY", "DKK", "EUR", "GBP", "INR", "JPY"
    ];
    const allCurrencies = choices.map((e) => (
        <Currency key={e} item={e} />
    ));

    return (
        <>
            {allCurrencies}
        </>
    );

}
