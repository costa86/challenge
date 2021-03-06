import React, { useState, useEffect } from 'react'
import SDK from '@uphold/uphold-sdk-javascript';
import { Each } from "./Each";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Currencies } from './Currencies';
import { TopBtn } from "./TopBtn";
import { CLIENT_ID, CLIENT_SECRET } from "./../constants";

export function App() {

    const cacheLifeSpan = 600000; // 10 min = 600000 ms

    const sdk = new SDK({
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        baseUrl: 'http://api-sandbox.uphold.com',
    });

    const [amount, setAmount] = useState("1");
    const [cacheTimer, setCacheTimer] = useState(0);
    const [items, setItems] = useState([]);
    const [cache, setCache] = useState({});
    const [currency, setCurrency] = useState("USD");
    const [SearchDisabled, setSearchDisabled] = useState(false);

    /**
     * Returns cacheTimer for a request (milliseconds). Possible outputs:
     * 1. Current cacheTimer value (no changes)
     * 2. Current time + cacheLifeSpan
     */
    function getCacheTimer() {
        const now = new Date().getTime();
        if (cacheTimer < (now + cacheLifeSpan)) {
            setCacheTimer(now + cacheLifeSpan);
        }
        return cacheTimer;
    }

    /**
     * Returns fetched data for a currency. Format: Array
     * @param {*} currencyPar 
     */
    async function getRates(currencyPar) {
        let res = await sdk.getTicker(currencyPar);
        let data = res.filter(n => n.currency === currencyPar);
        return data;

    };

    const loading = (<h1>Loading...</h1>);

    const results = items.map((each) => (
        <Each
            key={each.pair}
            item={each}
            amount={amount}
        />
    ));

    /**
     * Sets items to be rendered, based on values stored on cache.
     * If the requested currency is not on the cache yet, or its cache time is
     * expired (older than current time); it will be fetched beforehand and its cache time
     * will be updated.
     */
    async function setCachedResult() {
        const now = new Date().getTime();

        if (!cache[currency] || cache[currency].time < now) {
            cache[currency] = await getRates(currency);

            cache[currency].time = getCacheTimer();
            setCache({ ...cache, [currency]: cache[currency] });
        }
        setItems(cache[currency]);
    }

    useEffect(() => {
        // Sets focus on amount input
        document.getElementById("from").focus();
        // Renders results on page
        setCachedResult();
        //console.log(currency);
    }, [currency]);


    /**
     * Toggles enabled/disabled on currency selector
     * @param {*} e  
     */
    function changeSearch(e) {
        let res = e.target.value;
        setAmount(res);
        setSearchDisabled((res && +res > 0) ? false : true);
    }

    return (
        <>
            <Header />

            <div className="intro">
                <h1>Currency Converter</h1>

                <h2>Receive competivite and transparent pricing with no hidden spreads. See how we compare</h2>

                <input id="from" onChange={changeSearch} type="number" min="1" defaultValue="1"></input>
                <small>Enter an amount to check the rates</small>

                {<select name="" disabled={SearchDisabled} onChange={(x) => setCurrency(x.target.value)} id="currency">
                    <Currencies />
                </select>}

            </div>

            <div className="results">
                {items.length ? results : loading}
            </div>

            <TopBtn />

            <Footer />
        </>
    );
}
