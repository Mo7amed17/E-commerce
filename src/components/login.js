import './login.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Ads from './ads';
function Login(){
const [email, setemail] = useState("");
const [password, setpassword] = useState("");
const [value, setvalue] = useState(false);
const [emails, setemails] = useState([]);
const [passwords, setpasswords] = useState([]);
const [users, setusers] = useState([]);

function Goto(){
    if(value===true){
       return <Navigate to="/Account"/>
    }
}

useEffect(() => {
    fetch("https://steel-synonymous-judge.glitch.me/users")
    .then((res)=>res.json())
    .then((data)=>{
        setusers(data)
        setemails(data.map((e)=>e.email))
        setpasswords(data.map((e)=>e.password))})
}, []);

function correct(email,password){
    if(emails.includes(`${email}`) && (passwords.includes(`${password}`))){
        window.localStorage.setItem("loggedin","yes")
        users.forEach(element => {
            if(element.email===email){
                window.localStorage.setItem("id",`${element.id}`)
            }
        });
    }
    else if(email==="" || password===""){
        Swal.fire("Please input login data")
    }else if(email==="mo7amedatef17@gmailm.com" && password==="Fm301099"){ 
        window.localStorage.setItem("admin","yes")
        window.localStorage.setItem("loggedin","yes")
        window.location.href=`${window.location.origin}/E-commerce/#/Admin`
    }
    else{
        Swal.fire("Email or Password is incorrect")
    }
}
    return(
        <>
        <Ads/>
        {Goto()}
        <div className="theform">
            <form>
            <input className="email" placeholder="Email" type="email" onChange={(e)=>setemail(e.target.value)}/>
            <input className="pass" placeholder="Password" type="password" onChange={(e)=>setpassword(e.target.value)}/>
            <button type='button' className='login'  onClick={()=>{
                correct(email,password);
                let loggedin=window.localStorage.getItem("loggedin")
                let admin=window.localStorage.getItem("admin")
                let a=document.querySelector(".login")
                    if(loggedin==="yes"){
                        a.href="/Acount";
                        a.textContent="Account";
                        setvalue(true)
                        window.location.reload()
                        window.localStorage.setItem("nav","yes")
                    }
                    if(loggedin==="yes"&&admin==="yes"){
                        a.href="/Admin";
                        a.textContent="Admin";
                        setvalue(true)
                        window.location.reload()
                    }
            }}>Login</button>
            <Link to="/Create-Account">Create Account</Link>
            <Link to="/Forget-Password">Forget Password ?</Link>
        </form>
        </div>
        </>
    )
}

export default Login;