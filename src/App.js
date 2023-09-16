import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import { Link } from "react-router-dom";


function App() {

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
      <Header search={search} setSearch={(v)=> {
        setSearch(v)}} />
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
              </div>
            )
          })
        }
      </div>


    </div>
  );
}

export default App;
