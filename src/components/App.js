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
        },
        {
            "ask": "0.18594",
            "bid": "0.18594",
            "currency": "USD",
            "pair": "BRLUSD"
        },
        {
            "ask": "9381.77658",
            "bid": "9360.94931",
            "currency": "USD",
            "pair": "BTCUSD"
        },
        {
            "ask": "8.80531",
            "bid": "8.51788",
            "currency": "USD",
            "pair": "BTGUSD"
        },
        {
            "ask": "0.73579",
            "bid": "0.73579",
            "currency": "USD",
            "pair": "CADUSD"
        },
        {
            "ask": "1.05152",
            "bid": "1.05152",
            "currency": "USD",
            "pair": "CHFUSD"
        },
        {
            "ask": "0.14132",
            "bid": "0.14132",
            "currency": "USD",
            "pair": "CNYUSD"
        },
        {
            "ask": "0.04197",
            "bid": "0.04197",
            "currency": "USD",
            "pair": "CZKUSD"
        },
        {
            "ask": "1.01001",
            "bid": "1.0071",
            "currency": "USD",
            "pair": "DAI-USD"
        },
        {
            "ask": "71.20885",
            "bid": "70.81255",
            "currency": "USD",
            "pair": "DASHUSD"
        },
        {
            "ask": "15.60803",
            "bid": "15.33043",
            "currency": "USD",
            "pair": "DCRUSD"
        },
        {
            "ask": "0.01732",
            "bid": "0.01698",
            "currency": "USD",
            "pair": "DGBUSD"
        },
        {
            "ask": "0.15024",
            "bid": "0.15024",
            "currency": "USD",
            "pair": "DKKUSD"
        },
        {
            "ask": "0.00251",
            "bid": "0.00242",
            "currency": "USD",
            "pair": "DOGEUSD"
        },
        {
            "ask": "2.53703",
            "bid": "2.52881",
            "currency": "USD",
            "pair": "EOSUSD"
        },
        {
            "ask": "230.7105",
            "bid": "230.02208",
            "currency": "USD",
            "pair": "ETHUSD"
        },
        {
            "ask": "1.12018",
            "bid": "1.12018",
            "currency": "USD",
            "pair": "EURUSD"
        },
        {
            "ask": "1.23842",
            "bid": "1.23842",
            "currency": "USD",
            "pair": "GBPUSD"
        },
        {
            "ask": "0.12903",
            "bid": "0.12903",
            "currency": "USD",
            "pair": "HKDUSD"
        },
        {
            "ask": "0.14801",
            "bid": "0.14801",
            "currency": "USD",
            "pair": "HRKUSD"
        },
        {
            "ask": "0.00324",
            "bid": "0.00324",
            "currency": "USD",
            "pair": "HUFUSD"
        },
        {
            "ask": "0.29005",
            "bid": "0.29005",
            "currency": "USD",
            "pair": "ILSUSD"
        },
        {
            "ask": "0.01313",
            "bid": "0.01313",
            "currency": "USD",
            "pair": "INRUSD"
        },
        {
            "ask": "0.22144",
            "bid": "0.21884",
            "currency": "USD",
            "pair": "IOTAUSD"
        },
        {
            "ask": "0.00935",
            "bid": "0.00935",
            "currency": "USD",
            "pair": "JPYUSD"
        },
        {
            "ask": "0.0094",
            "bid": "0.0094",
            "currency": "USD",
            "pair": "KESUSD"
        },
        {
            "ask": "0.01174",
            "bid": "0.01156",
            "currency": "USD",
            "pair": "LBAUSD"
        },
        {
            "ask": "4.15979",
            "bid": "4.14204",
            "currency": "USD",
            "pair": "LINKUSD"
        },
        {
            "ask": "43.65116",
            "bid": "43.49435",
            "currency": "USD",
            "pair": "LTCUSD"
        },
        {
            "ask": "0.04418",
            "bid": "0.04418",
            "currency": "USD",
            "pair": "MXNUSD"
        },
        {
            "ask": "1.18023",
            "bid": "1.16184",
            "currency": "USD",
            "pair": "NANOUSD"
        },
        {
            "ask": "10.41482",
            "bid": "10.29881",
            "currency": "USD",
            "pair": "NEOUSD"
        },
        {
            "ask": "0.10425",
            "bid": "0.10425",
            "currency": "USD",
            "pair": "NOKUSD"
        },
        {
            "ask": "0.64257",
            "bid": "0.64257",
            "currency": "USD",
            "pair": "NZDUSD"
        },
        {
            "ask": "1.47492",
            "bid": "1.46382",
            "currency": "USD",
            "pair": "OMGUSD"
        },
        {
            "ask": "0.01997",
            "bid": "0.01997",
            "currency": "USD",
            "pair": "PHPUSD"
        },
        {
            "ask": "0.25135",
            "bid": "0.25135",
            "currency": "USD",
            "pair": "PLNUSD"
        },
        {
            "ask": "0.23126",
            "bid": "0.23126",
            "currency": "USD",
            "pair": "RONUSD"
        },
        {
            "ask": "0.1059",
            "bid": "0.1059",
            "currency": "USD",
            "pair": "SEKUSD"
        },
        {
            "ask": "0.71718",
            "bid": "0.71718",
            "currency": "USD",
            "pair": "SGDUSD"
        },
        {
            "ask": "0.00361",
            "bid": "0.0031",
            "currency": "USD",
            "pair": "STORMUSD"
        },
        {
            "ask": "0.01606",
            "bid": "0.01593",
            "currency": "USD",
            "pair": "TRXUSD"
        },
        {
            "ask": "1.0001",
            "bid": "0.9999",
            "currency": "USD",
            "pair": "TUSD-USD"
        },
        {
            "ask": "9360.94931",
            "bid": "9381.77658",
            "currency": "USD",
            "pair": "UPBTCUSD"
        },
        {
            "ask": "1.12018",
            "bid": "1.12018",
            "currency": "USD",
            "pair": "UPEURUSD"
        },
        {
            "ask": "0.00431",
            "bid": "0.00337",
            "currency": "USD",
            "pair": "UPTUSD"
        },
        {
            "ask": "1",
            "bid": "1",
            "currency": "USD",
            "pair": "UPUSDUSD"
        },
        {
            "ask": "12.50938204",
            "bid": "12.39310943",
            "currency": "ADA",
            "pair": "USDADA"
        },
        {
            "ask": "3.67299",
            "bid": "3.67299",
            "currency": "AED",
            "pair": "USDAED"
        },
        {
            "ask": "69.6777",
            "bid": "69.6777",
            "currency": "ARS",
            "pair": "USDARS"
        },
        {
            "ask": "0.38128501",
            "bid": "0.37868173",
            "currency": "ATOM",
            "pair": "USDATOM"
        },
        {
            "ask": "1.45565",
            "bid": "1.45565",
            "currency": "AUD",
            "pair": "USDAUD"
        },
        {
            "ask": "4.590103736344441384",
            "bid": "4.552697473252902345",
            "currency": "BAT",
            "pair": "USDBAT"
        },
        {
            "ask": "0.00426052",
            "bid": "0.0042478",
            "currency": "BCH",
            "pair": "USDBCH"
        },
        {
            "ask": "5.37799",
            "bid": "5.37799",
            "currency": "BRL",
            "pair": "USDBRL"
        },
        {
            "ask": "0.00010683",
            "bid": "0.00010659",
            "currency": "BTC",
            "pair": "USDBTC"
        },
        {
            "ask": "0.1174001",
            "bid": "0.11356784",
            "currency": "BTG",
            "pair": "USDBTG"
        },
        {
            "ask": "1.35909",
            "bid": "1.35909",
            "currency": "CAD",
            "pair": "USDCAD"
        },
        {
            "ask": "0.951",
            "bid": "0.951",
            "currency": "CHF",
            "pair": "USDCHF"
        },
        {
            "ask": "7.07601",
            "bid": "7.07601",
            "currency": "CNY",
            "pair": "USDCNY"
        },
        {
            "ask": "23.82515",
            "bid": "23.82515",
            "currency": "CZK",
            "pair": "USDCZK"
        },
        {
            "ask": "0.992950054612253004",
            "bid": "0.990089207037554084",
            "currency": "DAI",
            "pair": "USD-DAI"
        },
        {
            "ask": "0.01412179",
            "bid": "0.0140432",
            "currency": "DASH",
            "pair": "USDDASH"
        },
        {
            "ask": "0.06523",
            "bid": "0.06407",
            "currency": "DCR",
            "pair": "USDDCR"
        },
        {
            "ask": "58.8928150766",
            "bid": "57.7367205543",
            "currency": "DGB",
            "pair": "USDDGB"
        },
        {
            "ask": "6.65597",
            "bid": "6.65597",
            "currency": "DKK",
            "pair": "USDDKK"
        },
        {
            "ask": "413.2231404959",
            "bid": "398.406374502",
            "currency": "DOGE",
            "pair": "USDDOGE"
        },
        {
            "ask": "0.39544292",
            "bid": "0.39416168",
            "currency": "EOS",
            "pair": "USDEOS"
        },
        {
            "ask": "0.004347408735717893",
            "bid": "0.004334436447409199",
            "currency": "ETH",
            "pair": "USDETH"
        },
        {
            "ask": "0.89271",
            "bid": "0.89271",
            "currency": "EUR",
            "pair": "USDEUR"
        },
        {
            "ask": "0.80748",
            "bid": "0.80748",
            "currency": "GBP",
            "pair": "USDGBP"
        },
        {
            "ask": "7.75025",
            "bid": "7.75025",
            "currency": "HKD",
            "pair": "USDHKD"
        },
        {
            "ask": "6.75627",
            "bid": "6.75627",
            "currency": "HRK",
            "pair": "USDHRK"
        },
        {
            "ask": "308.69059",
            "bid": "308.69059",
            "currency": "HUF",
            "pair": "USDHUF"
        },
        {
            "ask": "3.44769",
            "bid": "3.44769",
            "currency": "ILS",
            "pair": "USDILS"
        },
        {
            "ask": "76.1745",
            "bid": "76.1745",
            "currency": "INR",
            "pair": "USDINR"
        },
        {
            "ask": "4.56954853",
            "bid": "4.51589595",
            "currency": "IOTA",
            "pair": "USDIOTA"
        },
        {
            "ask": "106.93301",
            "bid": "106.93301",
            "currency": "JPY",
            "pair": "USDJPY"
        },
        {
            "ask": "106.35239",
            "bid": "106.35239",
            "currency": "KES",
            "pair": "USDKES"
        },
        {
            "ask": "86.505190311418685121",
            "bid": "85.178875638841567291",
            "currency": "LBA",
            "pair": "USDLBA"
        },
        {
            "ask": "0.24142693",
            "bid": "0.24039675",
            "currency": "LINK",
            "pair": "USDLINK"
        },
        {
            "ask": "0.02299149",
            "bid": "0.0229089",
            "currency": "LTC",
            "pair": "USDLTC"
        },
        {
            "ask": "22.6323",
            "bid": "22.6323",
            "currency": "MXN",
            "pair": "USDMXN"
        },
        {
            "ask": "0.860704",
            "bid": "0.847292",
            "currency": "NANO",
            "pair": "USDNANO"
        },
        {
            "ask": "0.097099",
            "bid": "0.096017",
            "currency": "NEO",
            "pair": "USDNEO"
        },
        {
            "ask": "9.59257",
            "bid": "9.59257",
            "currency": "NOK",
            "pair": "USDNOK"
        },
        {
            "ask": "1.55624",
            "bid": "1.55624",
            "currency": "NZD",
            "pair": "USDNZD"
        },
        {
            "ask": "0.6831441",
            "bid": "0.67800287",
            "currency": "OMG",
            "pair": "USDOMG"
        },
        {
            "ask": "50.0755",
            "bid": "50.0755",
            "currency": "PHP",
            "pair": "USDPHP"
        },
        {
            "ask": "3.97849",
            "bid": "3.97849",
            "currency": "PLN",
            "pair": "USDPLN"
        },
        {
            "ask": "4.3242",
            "bid": "4.3242",
            "currency": "RON",
            "pair": "USDRON"
        },
        {
            "ask": "9.44317",
            "bid": "9.44317",
            "currency": "SEK",
            "pair": "USDSEK"
        },
        {
            "ask": "1.39435",
            "bid": "1.39435",
            "currency": "SGD",
            "pair": "USDSGD"
        },
        {
            "ask": "322.58064516",
            "bid": "277.00831025",
            "currency": "STORM",
            "pair": "USDSTORM"
        },
        {
            "ask": "62.7746390458",
            "bid": "62.2665006227",
            "currency": "TRX",
            "pair": "USDTRX"
        },
        {
            "ask": "1.0001000100010001",
            "bid": "0.9999000099990001",
            "currency": "TUSD",
            "pair": "USD-TUSD"
        },
        {
            "ask": "0.00010659",
            "bid": "0.00010683",
            "currency": "UPBTC",
            "pair": "USDUPBTC"
        },
        {
            "ask": "0.89271",
            "bid": "0.89271",
            "currency": "UPEUR",
            "pair": "USDUPEUR"
        },
        {
            "ask": "296.73590504",
            "bid": "232.01856148",
            "currency": "UPT",
            "pair": "USDUPT"
        },
        {
            "ask": "1",
            "bid": "1",
            "currency": "UPUSD",
            "pair": "USDUPUSD"
        },
        {
            "ask": "1.0001",
            "bid": "0.9999",
            "currency": "USDC",
            "pair": "USD-USDC"
        },
        {
            "ask": "1.003049",
            "bid": "0.99968",
            "currency": "USDT",
            "pair": "USD-USDT"
        },
        {
            "ask": "100000",
            "bid": "314.46540881",
            "currency": "VOX",
            "pair": "USDVOX"
        },
        {
            "ask": "0.05494083",
            "bid": "0.04400053",
            "currency": "XAG",
            "pair": "USDXAG"
        },
        {
            "ask": "0.00057967",
            "bid": "0.00056703",
            "currency": "XAU",
            "pair": "USDXAU"
        },
        {
            "ask": "22.33638597",
            "bid": "21.85314685",
            "currency": "XEM",
            "pair": "USDXEM"
        },
        {
            "ask": "14.36781609",
            "bid": "14.29388222",
            "currency": "XLM",
            "pair": "USDXLM"
        },
        {
            "ask": "0.00063733",
            "bid": "0.00051155",
            "currency": "XPD",
            "pair": "USDXPD"
        },
        {
            "ask": "0.00121821",
            "bid": "0.00108746",
            "currency": "XPT",
            "pair": "USDXPT"
        },
        {
            "ask": "5.283737",
            "bid": "5.268704",
            "currency": "XRP",
            "pair": "USDXRP"
        },
        {
            "ask": "48.4966052376",
            "bid": "47.9386385427",
            "currency": "ZIL",
            "pair": "USDZIL"
        },
        {
            "ask": "3.03030303",
            "bid": "3.00120048",
            "currency": "ZRX",
            "pair": "USDZRX"
        },
        {
            "ask": "1.0001",
            "bid": "0.9999",
            "currency": "USD",
            "pair": "USDC-USD"
        },
        {
            "ask": "1.00032",
            "bid": "0.99696",
            "currency": "USD",
            "pair": "USDT-USD"
        },
        {
            "ask": "0.00318",
            "bid": "0.00001",
            "currency": "USD",
            "pair": "VOXUSD"
        },
        {
            "ask": "22.727",
            "bid": "18.2014",
            "currency": "USD",
            "pair": "XAGUSD"
        },
        {
            "ask": "1763.576",
            "bid": "1725.129",
            "currency": "USD",
            "pair": "XAUUSD"
        },
        {
            "ask": "0.04576",
            "bid": "0.04477",
            "currency": "USD",
            "pair": "XEMUSD"
        },
        {
            "ask": "0.06996",
            "bid": "0.0696",
            "currency": "USD",
            "pair": "XLMUSD"
        },
        {
            "ask": "1954.8245",
            "bid": "1569.04535",
            "currency": "USD",
            "pair": "XPDUSD"
        },
        {
            "ask": "919.575",
            "bid": "820.875",
            "currency": "USD",
            "pair": "XPTUSD"
        },
        {
            "ask": "0.1898",
            "bid": "0.18926",
            "currency": "USD",
            "pair": "XRPUSD"
        },
        {
            "ask": "0.02086",
            "bid": "0.02062",
            "currency": "USD",
            "pair": "ZILUSD"
        },
        {
            "ask": "0.3332",
            "bid": "0.33",
            "currency": "USD",
            "pair": "ZRXUSD"
        }
    ]


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

    /**
     * Sets items to be rendered, based on values stored on cache.
     * If the requested currency is not on the cache yet, it will be fetched beforehand.
     */
    async function setCachedResult() {

        const now = new Date().getTime();

        if (!cache[currency] || cache[currency].time < now) {
            cache[currency] = await getRates(currency);
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
