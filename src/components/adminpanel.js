import './account.css'
import { Link } from "react-router-dom";

function Adminpanel(){
    
    return(
        <div className="account">
        <Link to="/Admin/Add-Product" className='button'>Add Product</Link>
        <Link to="/Admin/Orders" className='button'>Orders</Link>
        <Link  to="/Admin" className='logout button' onClick={()=>{
            window.localStorage.removeItem("loggedin")
            window.localStorage.removeItem("admin")
            window.localStorage.removeItem("nav")
            window.location.reload();
        }}>Logout</Link>
    </div>
    )
}

export default Adminpanel;