import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Link, useNavigate } from "react-router-dom";


function App() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  console.log(search);
  useEffect(() => {

    if (search == '') {
      fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then((res) => {
          setProducts(res.products)
        });
    }

    if (search != '') {
      fetch('https://dummyjson.com/products/search?q=' + search)
        .then(res => res.json())
        .then((res) => {
          setProducts(res.products)
        });
    }

  }, [search])

  return (
    <div className="">
      <Header search={search} setSearch={(v) => {
        setSearch(v)
      }} />
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }} >
        {
          products &&
          products.length > 0 &&
          products.map((item, index) => {
            return (
              <div style={{ background: '#e9ece4', padding: '20px', margin: '10px', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px' }}>
                <div>
                  <Link to={`/product/${item.id}`}>
                    <img width={200} height={200} src={item.thumbnail} alt="image" />
                  </Link>
                </div>
                <div> {item.brand} in  {item.category}</div>
                <div style={{ color: 'green' }}> DISCOUNT - {item.discountPercentage} %  </div>
                {
                  !!localStorage.getItem('token') &&
                  <button
                    onClick={() => {
                      fetch('https://dummyjson.com/carts/1', {
                        method: 'PUT', /* or PATCH */
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          merge: true, // this will include existing products in the cart
                          products: [
                            {
                              id: item.id,
                              quantity: 1,
                            },
                          ]
                        })
                      })
                        .then(res => res.json())
                        .then((res) => {
                          console.log(res)
                          if (res && res.products) {
                            alert('added to cart');
                            navigate('/user/cart');
                          }
                        });

                    }} > ADD TO CART </button>
                }
              </div>
            )
          })
        }
      </div>


    </div>
  );
}

export default App;
