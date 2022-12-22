
import { Link } from "react-router-dom";
import './account.css'

function Accountpanel(){
    return(
        <div className="account">
            <Link to="/Account/Edit-Account" className='button'>Edit Account</Link>
            <Link to="/Account/Shipping-Address" className='button'>Shipping Address</Link>
            <Link  to="/Account" className='logout button' onClick={()=>{
                window.localStorage.removeItem("id")
                window.localStorage.removeItem("loggedin")
                window.localStorage.removeItem("nav")
                window.location.reload();
            }}>Logout</Link>
        </div>
    )
}
export default Accountpanel;