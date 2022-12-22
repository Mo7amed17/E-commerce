import { useState } from 'react';
import './login.css'
import { useEffect } from 'react';
import Swal from 'sweetalert2';
function Forgetpassword(){
    const [emails, setemails] = useState([]);
    const [id, setid] = useState();
    useEffect(() => {
        fetch("https://steel-synonymous-judge.glitch.me/users").then((res)=>res.json()).then((data)=>{
            setemails(data.map((e)=>e.email))
        })
    }, []);
    function check(){
        let emailcheck=document.querySelector(".emailcheck")
        if(emails.includes(`${emailcheck.value}`)){
            setid(emails.indexOf(`${emailcheck.value}`)+1)
            Swal.fire({
                title: 'Enter Security Code',
                footer: '<input type="text" placeHolder="Code" maxLength="4" minLength="4"/>'
            })
            let input=document.querySelector(".swal2-footer input")
            let button=document.querySelector(".swal2-confirm")
            button.addEventListener("click",()=>{
                fetch(`https://steel-synonymous-judge.glitch.me/users/${id}`)
                .then((res)=>res.json())
                .then((data)=>{
                    if(+input.value===data.code){
                        
                    Swal.fire(
                        'Welcome back !',
                        `Your Password is (${data.password})`,
                        'success'
                    )
                    }
                    else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Security Code incorrect',
                          })
                    }
                })
            })
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Email Not Found !',
              })
        }
    }


    return(
        <>
        <div className="theform">
            <form style={{width:"400px"}} onSubmit={(e)=>{
                    e.preventDefault();
            }}>
            <input className="emailcheck" placeholder="Email" type="email" />
            <button className='sendcode' onClick={(e)=>{
                check();
                
            }}>OK</button>
            </form>
        </div>
        </>
    )
}

export default Forgetpassword;