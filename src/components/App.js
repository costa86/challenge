import React, { useState } from 'react'
import SDK from '@uphold/uphold-sdk-javascript';
import { Each } from "./Each";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Currencies } from './Currencies';

export function App() {

    const sdk = new SDK({
        clientId: 'c3435e98b454488c9aff9512939aad8f92ab0618',
        clientSecret: '8fb151883de6bc31a28aa3cb0526fed78cccbf95',
        baseUrl: 'http://api-sandbox.uphold.com',
    });

    const [amount, setAmount] = useState("1");
    const [items, setItems] = useState([]);
    const [currency, setCurrency] = useState("USD");
    const [btnSearchDisabled, setBtnSearchDisabled] = useState(false);

    window.onload = () => document.getElementById("from").focus();

    async function getRates() {
        let res = await sdk.getTicker(currency);
        let data = res.filter(n => n.currency === currency);
        setItems(data);
    };

    const results = items.map((each) => (
        <Each
            key={each.pair}
            item={each}
            amount={amount}
        />
    ));


    function runGetRates() {
        getRates();
    }

    function changeBtnSearch(e) {
        let res = e.target.value;
        setAmount(res);
        setBtnSearchDisabled((res && +res > 0) ? false : true);
    }


    return (
        <>
            <Header />
            <div className="intro">
                <h1>Currency Converter</h1>
                <h2>Receive competivite and transparent pricing with no hidden sprads. See how we compare</h2>

                <input id="from" onChange={changeBtnSearch} type="number" min="1" defaultValue="1"></input>
                <select name="" onChange={x => setCurrency(x.target.value)} id="currency">
                    <Currencies />
                    {/*       <option>EUR</option>
                    <option>BRL</option>
                    <option>CAD</option> */}

                </select>
                <button disabled={btnSearchDisabled} onClick={runGetRates}>CONVERT</button>
                <p>{currency}</p>
                <p>{amount}</p>
                <p>Results: {items.length}</p>
            </div>


            <div className="results">
                {results}

            </div>
            <Footer />
        </>
    );
}
