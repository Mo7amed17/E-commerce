import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
function Paynow(){
    const [user, setuser] = useState({});
    const [orders, setorders] = useState([]);
    const [grandtotaly, setgrandtotaly] = useState(0);
    let userid=window.localStorage.getItem("id")
    useEffect(() => {
                let couponstatus=window.sessionStorage.getItem("couponstatus")
                let coupon=window.sessionStorage.getItem("coupon")
                let button=document.querySelector(".coupon")
                let span=document.querySelectorAll(".shipingprice span")
                fetch(`https://steel-synonymous-judge.glitch.me/users/${userid}`)
                .then((res)=>res.json())
                .then((data)=>{
                    
                    setuser(data)
                    setorders(data.orders)
                    if(couponstatus==="yes"){
                        setgrandtotaly(data.subTotal) 
                            button.disabled=true;
                            button.previousElementSibling.disabled=true;
                            button.previousElementSibling.value=coupon
                            button.style.backgroundColor="rgba(9, 151, 151, 0.55)"
                            button.style.cursor="not-allowed"
                            span[0].style.display="inline"
                            span[1].textContent="0"
                    }else{
                       setgrandtotaly(data.subTotal +30) 
                    }
                })
                
            }, []);
    return(
        <>
        <div className="paynow">
            <h2>sub Total = <span>${user.subTotal}</span></h2>
            <h2 className="shipingprice">Shipping = <span>$30</span>$<span>30</span></h2>
            <div className="discount">
                <input placeholder="Coupon" maxLength={20}/><button className="coupon" onClick={(e)=>{
                    if(e.target.previousElementSibling.value==="M17"||e.target.previousElementSibling.value==="m17"){
                        let grandtotal=document.querySelector(".grandtotal span")
                        let span=document.querySelectorAll(".shipingprice span")
                        window.sessionStorage.setItem("couponstatus","yes")
                        window.sessionStorage.setItem("coupon",`${e.target.previousElementSibling.value}`)
                        grandtotal.textContent=user.subTotal
                        e.target.disabled=true;
                        e.target.previousElementSibling.disabled=true;
                        e.target.style.backgroundColor="rgba(9, 151, 151, 0.55)"
                        e.target.style.cursor="not-allowed"
                        span[0].style.display="inline"
                        span[1].textContent="0"
                    }else if(e.target.previousElementSibling.value===""||e.target.previousElementSibling.value===" "){
                        Swal.fire(
                            'Error',
                            'Please enter Coupon',
                            'error'
                        )
                    }
                    else{
                        Swal.fire(
                            'Sorry',
                            'Coupon Not Found',
                            'error'
                        )
                    }
                }}>Ok</button>
            </div>
            <h2 className="grandtotal">Grand Total = $<span>{grandtotaly}</span></h2>

            <div className="shipaddress">
                <h3>Your Address : <div>{user.address}</div></h3>
                <h3>Your Phone : <div>{user.phone}</div></h3>
            </div>
            <Link className="edit" to="/Account/Shipping-Address">Edit Shipping Address</Link>
            <button className="submit" onClick={(e)=>{
                if(user.cart.length===0){
                    Swal.fire(
                        'Error',
                        'Cart is Empty',
                        'error'
                      )
                }
                else{
                    let shipaddress=document.querySelectorAll(".shipaddress h3 div")
                    if(shipaddress[0].textContent===""||shipaddress[1].textContent===""){
                        Swal.fire(
                            'Error',
                            'Please Set Your Address and Phone number',
                            'error'
                          )
                    }else{
                        orders.push({
                            userName:user.firstname +" "+ user.lastname,
                            userAddress:user.address,
                            userPhone:user.phone,
                            cart:user.cart,
                            total:grandtotaly,
                            status:"Waiting",
                            orderFor:user.id,
                            
                        })
                            e.target.disabled=true;
                            e.target.style.backgroundColor="rgba(48, 179, 8, 0.57)"
                            e.target.style.cursor="not-allowed"
                        axios.post("https://steel-synonymous-judge.glitch.me/orders",{
                                orders:{
                                    userName:user.firstname +" "+ user.lastname,
                                    userAddress:user.address,
                                    userPhone:user.phone,
                                    cart:user.cart,
                                    total:grandtotaly,
                                    status:"Waiting",
                                    orderFor:user.id,
                                    
                                }
                        }).then((data)=>{
                            // we stop here
                            user.cart.map((product,index)=>{
                                if(index+1<user.cart.length){
                                    product.stock=+product.stock - +product.quantity
                                    axios.patch(`https://steel-synonymous-judge.glitch.me/products/${product.productId}`,{
                                        stock:product.stock
                                    }).then((d)=>{})
                                }else {
                                    product.stock=+product.stock - +product.quantity
                                    axios.patch(`https://steel-synonymous-judge.glitch.me/products/${product.productId}`,{
                                        stock:product.stock
                                    }).then((d)=>{
                                        window.sessionStorage.clear();
                            axios.patch(`https://steel-synonymous-judge.glitch.me/users/${userid}`,{
                                cart:[],
                                orders:orders
                            }).then((d)=>{
                                let timerInterval
                                Swal.fire({
                                  title: 'Please Wait',
                                  html: 'Your Are Creating Your Order.',
                                  timer: 1500,
                                  timerProgressBar: false,
                                  didOpen: () => {
                                    Swal.showLoading()
                                  },
                                  willClose: () => {
                                    clearInterval(timerInterval)
                                  }
                                })
                                setTimeout(() => {
                                    window.location=`${window.location.origin}/E-commerce/#`
                                }, 2000);
                                setTimeout(() => {
                                    window.location.reload()
                                }, 2300);
                            })
                                    })
                                    
                                }
                            })
                            
                        })
                    }
                    
                }
            }}>Confirm</button>
        </div>
        </>
    )
}

export default Paynow;