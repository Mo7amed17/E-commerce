import Accountpanel from "./accountpanel";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useEffect } from "react";
function ShippingAddress(){
    let id=window.localStorage.getItem("id")
    const [address, setaddress] = useState("");
    const [phone, setphone] = useState("");
    const [user, setuser] = useState("");
    function getuserdata(){
        fetch(`https://steel-synonymous-judge.glitch.me/users/${id}`).then((res)=>res.json()).then((data)=>setuser(data))
    }
    useEffect(() => {
        getuserdata()
    }, []);
    function save(){
        axios.patch(`https://steel-synonymous-judge.glitch.me/users/${id}`,{
            address:address,
            phone:phone,
        }).then((data)=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Address Has Added',
                showConfirmButton: false,
                timer: 2500
            })
        })
    }
    return(
        <>
        <Accountpanel/>
            <h5>You can Add only one Address</h5>
        <div className="theform">
        <form>
            <input className="address" placeholder="Your-Address" type="text" onChange={(e)=>setaddress(e.target.value)}/>
            <input className="phone" placeholder="Your phone" type="phone" maxLength={11} onChange={(e)=>setphone(e.target.value)}/>
            <button type='button' onClick={(e)=>{
                let phonereg=/\d{4}/;
                let result =phonereg.test(+phone)
                e.preventDefault();
                if(address==="" || result===false ||phone.length<11){
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Data in Fields are Not Correct',
                        footer: '<h2 href="">Please Correct it</h2>'
                      })
                }else{
                    save()
                    
                    let inputs=document.querySelectorAll(".theform form input") 
                inputs.forEach(input => {
                    input.value=""
                }); 
                setphone("")
                setaddress("")
                setTimeout(() => {
                    getuserdata()
                }, 2000);
                }
            }}>Save</button>
            </form>
        </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                <tbody>
                    <tr>
                        <td>{user.firstname}</td>
                        <td>{user.phone}</td>
                        <td>{user.address}</td>
                    </tr>
                </tbody>
            </table>
                <div className="deleteaddress">
                    
                <button  onClick={(e)=>{
                        e.preventDefault()
                        if(user.phone===""||user.address===""){
                            Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'Noting To Delete',
                                footer: '<h2 href="">There is No Data</h2>'
                            })
                        }else {
                            Swal.fire({
                                title: 'Are you sure?',
                                text: `You Will Delete Your Address`,
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!'
                              }).then((result) => {
                                if (result.isConfirmed) {
    
                                axios.patch(`https://steel-synonymous-judge.glitch.me/users/${id}`,{
                                        address:"",
                                        phone:"",
                                    }).then((data)=>{
                                        Swal.fire(
                                            'Deleted!',
                                            `Your Address has been deleted , We Will Reload`,
                                            'success'
                                          )
                                          setaddress("")
                                          setphone("")
                                          setTimeout(() => {
                                              window.location.reload();
                                            }, 2500);
                                    })
                                }
                              })
                        }
                    }}>Delete</button>
                </div>
        </>
    )
}
export default ShippingAddress;