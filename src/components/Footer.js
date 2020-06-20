import React from 'react'
import logo from "./../assets/logo.svg";


export function Footer() {


    return (
        <>
            <div className="footer">
                <div className="footer-logo" >
                    <img alt="Upold logo" src={logo}></img>
                </div>

                <div className="products">
                    <p>Products</p>
                    <a href="/consumers">Consumers</a>
                    <a href="/business">Business</a>
                    <a href="/partners">Partnes</a>
                </div>

                <div className="company">
                    <p>Company</p>
                    <a href="/about">About</a>
                    <a href="/careers">Careers</a>
                    <a href="/press">Press</a>
                </div>

                <div className="help">
                    <p>Help</p>
                    <a href="/faq">FAQ & Support</a>
                    <a href="/status">Platform Status</a>
                    <a href="/criptionary">Criptionary</a>
                    <a href="/pricing">Pricing</a>
                    <a href="/legal">Legal</a>
                </div>

                <div className="social">
                    <p>Social</p>
                    <a href="/facebook">Facebook</a>
                    <a href="/twitter">Twitter</a>
                    <a href="/instagram">Instagram</a>
                    <a href="/linkedin">LinkedIn</a>
                </div>

                <div className="apps">
                    <img alt="apple logo" title="Download app on Apple Store" src="https://img.icons8.com/color/48/000000/mac-os.png" />
                    <img alt="google play logo" title="Download app on Google Play Store" src="https://img.icons8.com/color/48/000000/google-play.png" />
                </div>

            </div>

        </>
    )

}
