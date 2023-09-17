import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header(props) {

    const [categories, setCategories] = useState([])

    useEffect(() => {
        fetch('https://dummyjson.com/products/categories')
            .then(res => res.json())
            .then((res) => {
                setCategories(res)
            });
    }, [])

    return (
        <div style={{ background: '#eee', padding: '10px', alignItems: 'center', display: 'flex' }}>
            <div>
                SHOPKART
            </div>
            <div>
                <input style={{ margin: '10px' }} type="text" value={props && props.search} onChange={(e) => {

                    props &&
                        props.setSearch &&
                        props.setSearch(e.target.value)
                }} />
            </div>

            <div>
                {categories &&
                    categories.length > 0 &&
                    categories.map((item, index) => {
                        return (
                            <span style={{ color: 'red', padding: '10px' }} >
                                <Link style={{ textDecoration: 'none' }} to={`/category/${item}`}>
                                    {item}
                                </Link>
                            </span>
                        )
                    })
                }
            </div>

            <div>
                {
                    !!localStorage.getItem('token') ?
                        (<>
                            <Link to="/user/cart" >
                                CART
                            </Link>
                            <button onClick={() => {
                                localStorage.removeItem('token');
                                window.location.reload();
                            }}>
                                LOGOUT
                            </button>
                        </>
                        )
                        :
                        (<Link to="/auth/login" >
                            LOGIN
                        </Link>)
                }

            </div>
        </div>
    );
}

export default Header;
