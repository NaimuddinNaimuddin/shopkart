import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import Header from "./Header";

function Category(props) {
    let { categoryName } = useParams();
    const [search, setSearch] = useState('');
    console.log(search);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (search == '') {
            fetch('https://dummyjson.com/products/category/' + categoryName)
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
    }, [categoryName, search])


    return (
        <div>
            <Header search={search} setSearch={(v) => {
                setSearch(v)
            }} />
            ON Category Page : {categoryName}

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
                                            alert('added to cart...')
                                        }} > ADD TO CART </button>
                                }
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Category;