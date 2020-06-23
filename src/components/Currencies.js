import React from 'react'

function Currency(props) {
    return (
        <option>{props.item}</option>
    );
}


export function Currencies() {
    const choices = [
        "USD", "ADA","AED", "ARS", "ATO", "AUD",
        "BAT","BHC", "BRL", "BTG", "CAD", "CHF",
        "CNY","CZK","DAI","DAS","DCR","DGB", "DKK",
        "DOG","EOS","ETH","EUR","GBP","HKD","HRK",
        "HUF", "ILS", "INR","IOT","JPY","KES","LBA",
        "LIN","LTC","MXN","NAN","NEO","NOK","NZD","OMG",
        "PHP","PLN","RON","SEK","SGD","STO","TRX","TUS",
        "UPB","UPE","UPT","UPU","VOX","XAG","XAU",
        "XEM","XLM","XPD","XPT","XRP","ZIL","ZRX"
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
