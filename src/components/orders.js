
import './orders.css'
import './cart.css'
import { useState } from "react";
import { useEffect } from "react";
import Swal from 'sweetalert2';
import axios from 'axios';

function Orders(){
    let userorders=[]
    let counter=0;
    const [orders, setorders] = useState([]);
    useEffect(() => {
        fetch("https://steel-synonymous-judge.glitch.me/orders")
        .then((res)=>res.json())
        .then((data)=>{
            setorders(data.map((order)=>order))
            
        })
    }, []);
    return(
        <div className="adminorders">
            <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Products</th>
                            <th>Total</th>
                            <th>Contact</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {
                        orders.map((order)=>{
                            counter++;
                            return(
                    <tbody key={counter}>
                                <tr  className="ordersflex">
                            <td>{order.orders.userName}</td>
                            <td>{
                                order.orders.cart.map((product)=>{
                                    return(
                                        <div>{product.productTitle} * {product.quantity}</div>
                                    )
                                })
                                }</td>
                            <td>${order.orders.total}</td>
                            <td >
                                <div>{order.orders.userAddress}</div>
                                <div>{order.orders.userPhone}</div>
                                </td>
                            <td className='status'>{order.orders.status}<i className="fa-regular fa-circle-check" onClick={(e)=>{
                                let icons=document.querySelectorAll(".status i")
                                if(e.target.previousSibling.nodeValue==="Delivered"){
                                    Swal.fire(
                                        'Order Has been Delivered',
                                        'You Have already Confirmed this',
                                        'warning'
                                    )
                                }
                                else if(e.target.previousSibling.nodeValue==="Waiting"){                                    
                                    icons.forEach(icon => {
                                        icon.style.display="none"
                                    });
                                    order.orders.status="Delivered"
                                    orders.map((ele)=>{
                                        if(ele.orders.orderFor===order.orders.orderFor){
                                            userorders.push(ele.orders)
                                        }
                                    })
                                    
                                    axios.patch(`https://steel-synonymous-judge.glitch.me/orders/${order.id}`,{
                                            orders:{
                                                userName:order.orders.userName,
                                                userAddress:order.orders.userAddress,
                                                userPhone:order.orders.userPhone,
                                                cart:order.orders.cart,
                                                total:order.orders.total,
                                                status:order.orders.status,
                                                orderFor:order.orders.orderFor,
                                            },
                                            id:order.id
                                    }).then((data)=>{
                                        axios.patch(`https://steel-synonymous-judge.glitch.me/users/${order.orders.orderFor}`,{
                                            orders:userorders
                                        }).then((data)=>{
                                            userorders=[]
                                            e.target.previousSibling.nodeValue="Delivered"
                                            icons.forEach(icon => {
                                                icon.style.display="inline-block"
                                            });
                                        Swal.fire(
                                            'Done!',
                                            'You Confirmed this Order',
                                            'success'
                                    )
                                        })
                                        
                                    })
                                }
                            }}></i></td> 
                                </tr>
                    </tbody>
                            )
                        })
                    }
            </table>
        </div>
    )
}

export default Orders;