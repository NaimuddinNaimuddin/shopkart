import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "./Header";


function Product() {
    let { productId } = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch('https://dummyjson.com/products/' + productId)
            .then(res => res.json())
            .then((res) => {
                setProduct(res)
            });
    }, [])

    return (
        <div>
            <Header />
            {
                product && product.images &&
                product.images.length > 0 &&
                product.images.map((item, index) => {
                    return <>
                        <img style={{ width : '200px' , padding : '20px' }} src={item} />
                    </>
                })
            }


            <div>
                <h5>  {product.title}  </h5>
                <p>  {product.description}   </p>
            </div>
        </div>
    )

}

export default Product;