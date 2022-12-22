import { useEffect } from "react";
import { useState } from "react";
import './cart.css'
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
function Cart(){
    let counter=0;
    let sum=0;
    let userid=window.localStorage.getItem("id")
    const [cart, setcart] = useState([]);
    const [orders, setorders] = useState([]);
    let newcart=[]
    let newcart2=[]
    function order(value,e){
        let all=0
        e.target.parentElement.children[1].textContent=+e.target.parentElement.children[1].textContent+value
        let cartnumber=document.querySelector(".navbar .cart i span")
        let productsnumber=document.querySelector(".cart h2 span")
        let buttons=document.querySelectorAll(".cart table tbody .quantity button")
        let confirm=document.querySelector(".confirm")
        let icon=document.querySelector(".removeproduct i")
        confirm.style.display="none"
        icon.style.display="none"
        if(e.target.parentElement.children[1].textContent<=1){
            e.target.parentElement.children[1].textContent=1
            value=0;
        }
        cart.map((product)=>{
            if(product.productId===+e.target.parentElement.parentElement.id){
                product.quantity=+e.target.parentElement.children[1].textContent;
            }
            all=all+product.quantity
            newcart.push(product)
        })
            buttons.forEach(button => {
                button.disabled=true
                button.style.backgroundColor="#cecece"
                button.style.cursor="default"
            });
            axios.patch(`https://steel-synonymous-judge.glitch.me/users/${userid}`,{
                cart:newcart
            }).then((data)=>{
                confirm.style.display="block"
                icon.style.display="inline"
                cartnumber.textContent=all
        productsnumber.textContent=all
        e.target.parentElement.nextElementSibling.children[0].textContent=(+e.target.parentElement.children[1].textContent)*(+e.target.parentElement.previousElementSibling.children[0].textContent)
                newcart=[];
        buttons.forEach(button => {
            button.disabled=false
            button.style.backgroundColor="black"
            button.style.cursor="pointer"
        });
            }).catch((err)=>{Swal.fire(
                'Un Expected Error!',
                'We will reload now',
                'error'
              ) 
            setTimeout(() => {
                window.location.reload()
            }, 2000);})
    }

    useEffect(() => {
        
        fetch(`https://steel-synonymous-judge.glitch.me/users/${userid}`)
        .then((res)=>res.json())
        .then((data)=>{
            setorders(data.orders)
            setcart(data.cart)
            let userorders=document.querySelector(".userorders")
        if(data.orders.length>0){
            userorders.style.display="block"
        }
            if(data.cart.length>0){
                let table=document.querySelector(".cart table")
                table.style.display="block"
            }
        })
    }, []);
    for(let a=0;a<cart.length;a++){
        sum=sum+cart[a].quantity
    }
    return(
        <>
        <div className="cart">
        <h2>My Products (<span>{sum}</span>)</h2>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                    </thead>
                            {
                                cart.map((product)=>{
                                    return(
                                        <tbody key={product.productId}>
                                    <tr id={product.productId}>
                                        <td>
                                            <img src={product.productImage} alt=""/>
                                            <div className="information">
                                                <h3>{product.productTitle}</h3>
                                                <h3>{product.productBrand}</h3>
                                            </div>
                                        </td>
                                        <td>$<span>{product.productPrice}</span></td>
                                        <td className="quantity"><button onClick={(e)=>{
                                            order(+1,e)
                                        }}>+</button> <span>{product.quantity}</span> <button onClick={(e)=>{
                                            order(-1,e)
                                        }}>-</button></td>
                                        <td className="removeproduct">$<span className="total">{(product.quantity)*(product.productPrice)}</span>
                                        <i className="fa-solid fa-xmark" onClick={(e)=>{
                                            let button=document.querySelector(".confirm")
                                            let cartnumber=document.querySelector(".navbar .cart i span")
                                            if(cartnumber.parentElement.textContent==="1"){
                                                cartnumber.parentElement.style.color="black"
                                            }
                                            let icons=document.querySelectorAll(".removeproduct i")
                                            cart.map((ele)=>{
                                                if(ele.productId!==+e.target.parentElement.parentElement.id){
                                                    newcart2.push(ele)
                                                }
                                            })
                                            icons.forEach(icon => {
                                                icon.style.visibility="hidden"
                                            });               
                                            button.style.backgroundColor="rgba(10, 177, 177, 0.61)"
                                            button.disabled=true                             
                                            axios.patch(`https://steel-synonymous-judge.glitch.me/users/${userid}`,{
                                                cart:newcart2
                                            }).then((data)=>{
                                                setcart(data.data.cart)
                                                icons.forEach(icon => {
                                                    icon.style.visibility="visible"
                                                });   
                                                button.style.backgroundColor="rgb(10, 177, 177)"
                                                button.disabled=false
                                                cartnumber.textContent= +sum-1
                                            })
                                        }}></i></td>
                                    </tr>
                                        </tbody>
                                    )
                                })
                            }
                            <tfoot>
                    <tr>
                        <td><Link className="confirm"  onClick={(e)=>{
                            let prices=document.querySelectorAll(".cart table tbody td .total")
                            let total=0;
                            prices.forEach(price => {
                                total=total+ +price.textContent
                            });
                            e.target.href=e.target.origin+"/Cart/Paynow"
                            axios.patch(`https://steel-synonymous-judge.glitch.me/users/${userid}`,{
                                subTotal:total
                            })
                            .then((data)=>{
                                window.location=e.target.origin+"/Cart/Paynow"
                            })
                        }} >Conformation</Link></td>
                    </tr>
                    </tfoot>
                </table>
                
        </div>

        <div className="userorders">
            <h2>My Orders</h2>
            <table>
                    <thead>
                        <tr className="headerback">
                            <th>Products</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        orders.map((order)=>{
                            counter++;
                            return(
                                <tbody key={counter}>
                        <tr className="ordersflex">
                            <td>
                                    {
                                        order.cart.map((product)=>{
                                            return(
                                            <div key={product.productId}>{product.productTitle} * {product.quantity}</div>
                                            )
                                        })
                                    }
                            </td>
                            <td>${order.total}</td>
                            <td>{order.status}</td> 
                        </tr>
                    </tbody>
                            )
                        })
                    }
            </table>
        </div>
        </>
    )
}
export default Cart;