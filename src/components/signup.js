import './login.css'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';
import Ads from './ads';
function Signup(){
    const [firstname, setfirstname] = useState("");
    const [lastname, setlasttname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [code, setcode] = useState();
    const [id, setid] = useState("");
    const [emails, setemails] = useState([]);
    useEffect(() => {
        fetch("https://steel-synonymous-judge.glitch.me/users").then((res)=>res.json()).then((data)=>{setid(data.length) 
        setemails(data.map((e)=>e.email))})
    }, []);


   function saveData(){
       axios.post("https://steel-synonymous-judge.glitch.me/users",{
            id: id+1,
            firstname:firstname,
            lastname:lastname,
            email:email,
            password:password,
            code:code,
            cart:[],
            phone:"",
            address:"",
            userreviews:[],
            orders:[]
        }).then((data)=>{  
        Swal.fire(
            'Your Account Has Created',
            `Save Your Code !
            You Will Use it if You Forgot You Password`,
            'success'
          )
    window.console.clear()
    setTimeout(() => {
        window.location.reload();
    }, 3500);});
    
    }


    return(
        <>
            <Ads/>
        <div className="theform">
            <form  onSubmit={(event)=>{
                event.preventDefault()
                if(emails.includes(`${email}`)){
                Swal.fire(`${email} 
                already used`)
                }else{
                    let codereg=/\d{4}/;
                    let result =codereg.test(+code)
                    if(result===true){
                        saveData();
                    }else {Swal.fire(
                        'Wrong Code',
                        'Enter Only 4 Numbers',
                        'error'
                      )}
                }
            }}>
                
            <input className="firstname" placeholder="First Name" type="text" minLength={2} maxLength="15" required onChange={(e)=>setfirstname(e.target.value)}/>
            <input className="lastname" placeholder="last Name" type="text" minLength={2} maxLength="15" required onChange={(e)=>setlasttname(e.target.value)}/>
            <input className="Email" placeholder="Email" type="Email" required onChange={(e)=>setemail(e.target.value)}/>
            <input className="pass" placeholder="Password" type="password" required onChange={(e)=>setpassword(e.target.value)}/>
            <input className="bin" placeholder="Security Code" type="text" required maxLength={4} minLength={4} onChange={(e)=>{
                    setcode(+e.target.value)
            }}/>
            <button type='submit'>Signup</button>
            <h3>Already Have Account ?</h3>
            <Link to="/Login">Login Now</Link>
        </form>
        </div>
        </>
    )
}
export default Signup;