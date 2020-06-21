import React, { useState } from 'react'
import SDK from '@uphold/uphold-sdk-javascript';
import { Each } from "./Each";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Currencies } from './Currencies';
import { TopBtn } from "./TopBtn";

export function App() {

    const cacheLifeSpan = 600000 // 10 min = 600000 ms

    const sdk = new SDK({
        clientId: 'c3435e98b454488c9aff9512939aad8f92ab0618',
        clientSecret: '8fb151883de6bc31a28aa3cb0526fed78cccbf95',
        baseUrl: 'http://api-sandbox.uphold.com',
    });

    const [amount, setAmount] = useState("1");
    const [cacheTimer, setCacheTimer] = useState(0);

    const [items, setItems] = useState([]);
    const [cache, setCache] = useState({});

    const [currency, setCurrency] = useState("USD");
    const [btnSearchDisabled, setBtnSearchDisabled] = useState(false);

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

    // Sets focus on currency input field when page loads
    window.onload = () => document.getElementById("from").focus();

    /**
     * Returns fetched data for a currency. Format: Array
     * @param {*} currencyPar 
     */
    async function getRates(currencyPar) {
        let res = await sdk.getTicker(currencyPar);
        let data = res.filter(n => n.currency === currencyPar);
        return data;

    };


    const results = items.map((each) => (
        <Each
            key={each.pair}
            item={each}
            amount={amount}
        />
    ));

    let sample = [
        {
            "ask": "0.08069",
            "bid": "0.07994",
            "currency": "USD",
            "pair": "ADAUSD"
        },
        {
            "ask": "0.27226",
            "bid": "0.27226",
            "currency": "USD",
            "pair": "AEDUSD"
        },
        {
            "ask": "0.01435",
            "bid": "0.01435",
            "currency": "USD",
            "pair": "ARSUSD"
        },
        {
            "ask": "2.64074",
            "bid": "2.62271",
            "currency": "USD",
            "pair": "ATOMUSD"
        },
        {
            "ask": "0.68698",
            "bid": "0.68698",
            "currency": "USD",
            "pair": "AUDUSD"
        },
        {
            "ask": "0.21965",
            "bid": "0.21786",
            "currency": "USD",
            "pair": "BATUSD"
        },
        {
            "ask": "235.41613",
            "bid": "234.71301",
            "currency": "USD",
            "pair": "BCHUSD"
        }];

    /**
     * Sets items to be rendered, based on values stored on cache.
     * If the requested currency is not on the cache yet, it will be fetched beforehand.
     */
    async function setCachedResult() {

        const now = new Date().getTime();

        if (!cache[currency] || cache[currency].time < now) {
            //cache[currency] = await getRates(currency);
            cache[currency] = sample;

            cache[currency].time = getCacheTimer();
            setCache({ ...cache, [currency]: cache[currency] });
        }
        setItems(cache[currency]);
        console.log(cache[currency]);
    }

    /**
     * Starts all
     */
    function init() {
        setCachedResult();
    }

    /**
     * Toggles enabled/disabled on "convert" button
     * @param {*} e  
     */
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
                <h2>Receive competivite and transparent pricing with no hidden spreads. See how we compare</h2>

                <input id="from" onChange={changeBtnSearch} type="number" min="1" defaultValue="1"></input>
                <small>Enter an amount to check the rates</small>
                <select name="" onChange={x => setCurrency(x.target.value)} id="currency">
                    <Currencies />

                </select>
                <button disabled={btnSearchDisabled} onClick={init}>Convert</button>
                {/*       <p>{currency}</p>
                <p>{amount}</p>
                <p>Results: {items.length}</p> */}
            </div>


            <div className="results">
                {results}

            </div>
            <TopBtn />
            <Footer />
        </>
    );
}
