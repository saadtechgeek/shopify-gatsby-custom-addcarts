import { Link } from 'gatsby';
import React, { useState, useEffect } from 'react'
import Layout from '../components/layout';
import Client from 'shopify-buy';

const client = Client.buildClient({
    domain: "delarashopper.myshopify.com",
    storefrontAccessToken: "6485be5ab268776178b3ea3e33760967"
});

function Product({ pageContext }) {

    const [session, setSession] = useState({})
    useEffect(() => {
        const token = localStorage.getItem('session')
        if (!token) {
            (async () => {
                const checkoutToken = await client.checkout.create();
                setSession(checkoutToken);
                console.log(checkoutToken);
            })()
        }
        else {
            (async () => {
                const token = await client.checkout.fetch(
                    localStorage.getItem("session")
                )
                setSession(token);
                console.log(token);
                console.log(token.lineItems);
            })()
        }
    }, []);

    return (
        <Layout>
            <div className="product-details-container">
                <Link to="/"> Back</Link>
                <h1>{pageContext.title}</h1>
                <img src={pageContext.images[0].originalSrc} alt="product-img" />
                <p>{pageContext.description}</p>
                <br /> <br />
                <button onClick={async () => {
                    const newSession = await client.checkout.addLineItems(session.id, [{
                        variantId: pageContext.variants[0].id.split("_").pop(),
                        quantity: 1,
                    }]);
                    console.log(newSession);
                    setSession(newSession);
                    localStorage.setItem("session", session.id);
                }}>Add to cart</button>
            </div>
        </Layout>
    )
}

export default Product
