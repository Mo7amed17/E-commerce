import logo from '../media/logo-search-grid-1x-removebg-preview.png'
import './navbar.css'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
function Navbar(){
    let userid=window.localStorage.getItem("id")
    const [cart, setcart] = useState();
    useEffect(() => {
            fetch(`https://steel-synonymous-judge.glitch.me/users/${userid}`)
            .then((res)=>res.json())
            .then((data)=>{
                let sum=0;
                for(let a=0;a<data.cart.length;a++){
                    sum=sum+data.cart[a].quantity
                }
                setcart(sum)
                if(data.cart.length>"0"){
                    let car=document.querySelector(".navbar .cart i")
                    car.style.color="#019cbf"
                }
            })
    }, []);
    let loggedin=window.localStorage.getItem("loggedin")
    let admin=window.localStorage.getItem("admin")
    let login="Login";
    let href="./Login";
    if(loggedin==="yes" && admin===null){
        login="Account"
        href="/Account/Edit-Account"
    }
    else if(loggedin==="yes" && admin==="yes"){
        login="Admin"
        href="/Admin"
    }
    else{
        login="Login"
        href="./Login"
    }
    return(
        <>
        <div className="navbar">
            <div className="logo"><img src={logo} alt=""/></div>
            <ul>
                <li><Link to={'/'}>Home</Link></li>
                <li className='cart'><Link to='/Cart'>Cart <i className="fa-solid fa-cart-shopping"><span>{cart}</span></i></Link></li>
                <li><Link to={href} className="login" onClick={()=>{
                        let a=document.querySelector(".login")
                        if(a.textContent==="Account")
                        {
                            a.href="/Account/Edit-Account"
                        }
                        
                }}>{login}</Link></li>
            </ul>
        </div>
            </>
    )
    
}

export default Navbar;

