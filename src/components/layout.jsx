import React, { useState } from 'react'
import { useEffect } from 'react';
import './styles.css'
import Client from 'shopify-buy';
import { navigate } from 'gatsby';

const client = Client.buildClient({
    domain: "delarashopper.myshopify.com",
    storefrontAccessToken: "6485be5ab268776178b3ea3e33760967"
});

function Layout({children}) {

    const [session, setSession] = useState({})
    useEffect(() => {
        (async () => {
            const token = await client.checkout.fetch(
                localStorage.getItem("session")
            )
            setSession(token);
            console.log(token);
        })()
    }, []);

    return (
        <div>
            <nav className="nav-container">
                <span>Total: {session.totalPrice}</span>
                <button onClick={() => navigate("/cart")}>Cart</button>
                <button onClick={() => {
                    window.open(session.webUrl)
                }}>Checkout</button>

            </nav>
            <div className="children">
                {children}
            </div>
        </div>
    )
}

export default Layout
