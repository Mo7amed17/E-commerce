import './product.css'
import { Link } from 'react-router-dom';
function Product(props){

    return(
        <>
        <div className="product" key={props.product.id}>
            <div className='img'>
                <img src={props.product.thumbnail} alt=""/>
            </div>
            <h4>{props.product.brand}</h4>
            <h3 className='productname'>{props.product.title}</h3>
            <h4>${props.product.price}</h4>
            <Link  className='details' to={`/product/${props.product.id}`}>Details</Link>
        </div>
        </>
    )
}

export default Product;