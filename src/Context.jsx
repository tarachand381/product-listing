import React, { createContext, useEffect, useState } from 'react'
import axios from 'axios';
const MainContext = createContext()

function Context(props) {
    const [Product, SetProduct] = useState([]);
    const [Card, SetCard] = useState([]);
    useEffect(() => {
        const IsCard = localStorage.getItem("card")
        if (IsCard) {
            SetCard(JSON.parse(IsCard))
        }
        axios.get("https://dummyjson.com/products").then(
            (success) => {
                SetProduct(success.data.products);
            }
        ).catch((error) => console.log(error))

    }, []);
    function AddtoCard(id) {
        const productCheck = Product.find((item) => item.id === id)
        if (productCheck) {
            const existingCheck = Card.find((item) => item.id === id)

            if (existingCheck) {
                //    qty increase
                const updateCard = Card.map((item) =>
                    item.id === id ? { ...item, qty: item.qty + 1 } : item
                )
                SetCard(updateCard)
                localStorage.setItem("card", JSON.stringify(updateCard))

            } else {
                const cardDate = [...Card, { ...productCheck, qty: 1 }]
                SetCard(cardDate)
                localStorage.setItem("card", JSON.stringify(cardDate))
            }
        }
    }
    function RemovetoCard(id) {
        const updateCard = Card.filter((item) => item.id != id)
        SetCard(updateCard)
        localStorage.setItem("card", JSON.stringify(updateCard))

    }

    return (
        <MainContext.Provider value={{ AddtoCard, Card, RemovetoCard }}>
            {props.children}
        </MainContext.Provider>
    )
}
export default Context
export { MainContext }