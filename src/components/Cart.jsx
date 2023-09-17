import { useEffect, useState } from "react";
import Header from "./Header";


function Cart() {

    const [products, setProducts] = useState([]);
    console.log(products, "ppp")

    useEffect(() => {
        fetch('https://dummyjson.com/carts/user/1')
            .then(res => res.json())
            .then((res) => {
                if (res && res.carts.length > 0) {
                    setProducts(res.carts[0].products)
                }
            });
    }, [])

    return (
        <div>
            <Header />
            USER CART :

            {!!localStorage.getItem('token') &&
                products && products.length > 0 &&
                products.map((item, index) => {
                    return (
                        <div style={{ background: '#eee', display: 'flex', justifyContent: 'left', padding: '10px', margin: '10px' }}>
                            <div style={{ minWidth: '50px' }}>  {item.id} </div>
                            <div style={{ minWidth: '300px' }}>  {item.title} </div>
                            <div style={{ minWidth: '50px' }}>  {item.price} X </div>
                            <div style={{ minWidth: '50px' }}>  {item.quantity} = </div>
                            <div style={{ minWidth: '50px' }}>  {item.total} </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

export default Cart;