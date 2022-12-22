import Accountpanel from "./accountpanel";
import './login.css'
import axios from "axios";
import { useState } from "react";
import Swal from 'sweetalert2'
import { useEffect } from "react";
function Editaccount(){
    let id=window.localStorage.getItem("id")
    const [orders, setorders] = useState([]);
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [firstname, setfirstname] = useState("");
    useEffect(() => {
        fetch("https://steel-synonymous-judge.glitch.me/orders")
        .then((res)=>res.json())
        .then((data)=>setorders(data.map((order)=>order)))

    fetch(`https://steel-synonymous-judge.glitch.me/users/${id}`)
    .then((res)=>res.json())
    .then((data)=>{
        setfirstname(data.firstname);})
    }, []);
        function updateemail(){
            axios.patch(`https://steel-synonymous-judge.glitch.me/users/${id}`,{
                email:email,
            }).then((data)=>{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Email Has Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
                setemail("");
                    setpassword("")
                    let inputs=document.querySelectorAll(".theform form input") 
                inputs.forEach(input => {
                    input.value=""
                }); 
                window.console.clear()
            })
        }
        function updatepass(){
            axios.patch(`https://steel-synonymous-judge.glitch.me/users/${id}`,{
                password:password,
            }).then((data)=>{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password Has Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
                setemail("");
                setpassword("")
            let inputs=document.querySelectorAll(".theform form input") 
            inputs.forEach(input => {
                input.value=""
            });
            window.console.clear() 
            })
        }
        function updateall(){
            axios.patch(`https://steel-synonymous-judge.glitch.me/users/${id}`,{
                email:email,
                password:password,
            }).then((data)=>{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Email and Password Have Updated',
                    showConfirmButton: false,
                    timer: 1500
                })
                setemail("");
                setpassword("")
                let inputs=document.querySelectorAll(".theform form input") 
                inputs.forEach(input => {
                    input.value=""
                }); 
                window.console.clear()
            })
        }

    return(
        <>
        <Accountpanel/>
        <div className="theform">
        <form>
        <input className="email" placeholder="New-Email" type="email" onChange={(e)=>setemail(e.target.value)}/>
            <input className="pass" placeholder="New-Password" type="password" onChange={(e)=>setpassword(e.target.value)}/>
            <button type='submit' onClick={(e)=>{
                e.preventDefault();
                if(email==="" && password===""){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Fields are Empty',
                        footer: '<h2 href="">Please Fill Fields</h2>'
                      })
                }
                else if(email!=="" && password===""){
                    if(email.includes("@")&&email.includes(".")){
                        updateemail()
                    }else{
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Email is Incorrect',
                            footer: '<h2 href="">Please Enter Vaild Email</h2>'
                        })
                    }
                    
                }
                else if(password!=="" && email===""){
                    updatepass()
                    
                } else if(email!=="" && password!==""){
                    updateall();
                
                }
            }
                }>Save</button>
            <button type='button' className="delete" onClick={()=>{
                let ids=[]
                orders.map((order)=>{
                    if(order.orders.orderFor===+id){
                        ids.push(order.id)
                    }
                })
                Swal.fire({
                    title: 'Are you sure?',
                    text: `You Will Delete Your Account ,
                    ${firstname}`,
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                    axios.put(`https://steel-synonymous-judge.glitch.me/users/${id}`,{
                        id:id
                    })
                    .then((data)=>{
                        if(ids.length>0){
                        ids.map((ele,index)=>{
                            if(index+1===ids.length){
                                axios.delete(`https://steel-synonymous-judge.glitch.me/orders/${ele}`)
                                .then((data)=>{
                                Swal.fire(
                                    'Deleted!',
                                    `Your Account has been deleted ,You Will Redirected Now`,
                                    'success'
                                  )
                                  window.localStorage.clear();
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 2000);
                            })
                            }
                            else{
                                axios.delete(`https://steel-synonymous-judge.glitch.me/orders/${ele}`)
                            .then((data)=>{

                            })
                            }
                            
                        })
                            }else if(ids.length<=0){
                                Swal.fire(
                                    'Deleted!',
                                    `Your Account has been deleted ,You Will Redirected Now`,
                                    'success'
                                  )
                                  window.localStorage.clear();
                                  setTimeout(() => {
                                    window.location.reload();
                                  }, 2000);
                            }
                        

                      })
                    }
                  })
            }}>Delete Account</button>
        </form>
        </div>
        </>
    )
}
export default Editaccount;