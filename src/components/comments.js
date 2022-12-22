import { useState } from 'react';
import './comments.css'
import axios from 'axios';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
function Comments(props){
    const [userreviews, setuserreviews] = useState([]);
    const [productreviews, setproductreviews] = useState([]);
    const [comment, setcomment] = useState();
    const [starnumber, setstarnumber] = useState();
    let stars=document.querySelectorAll(".thestars i")
        stars.forEach(star => {
            star.onclick=(e)=>{
                setuserreviews(props.user.userreviews)
                setproductreviews(props.product.userreviews)
                let textarea=document.querySelector(".comments textarea")
                let button=document.querySelector(".comments button")
                textarea.style.display="inline-block"
                button.style.display="block"
                setstarnumber(e.target.attributes.data.value)
                for(let a=0;a<=4;a++){
                    if(stars[a].attributes.data.value<=e.target.attributes.data.value){
                        stars[a].className="fa-solid fa-star"
                    stars[a].style.color="rgb(255, 216, 3)"
                    }
                    else{
                        stars[a].className="fa-regular fa-star"
                    stars[a].style.color="black"
                    }
                }
            }
        });
    return(
        <>
        <div className="comments">
            <div className="thestars"><span>Rate Product</span>
            <i className="fa-regular fa-star" data="1"></i>
            <i className="fa-regular fa-star" data="2"></i>
            <i className="fa-regular fa-star" data="3"></i>
            <i className="fa-regular fa-star" data="4"></i>
            <i className="fa-regular fa-star" data="5"></i>
            </div>
            <textarea className='textarea' placeholder='Your Review' maxLength={250} minLength={50} onChange={(e)=>{
                setcomment(e.target.value)
            }}/>
            <button onClick={()=>{
                let textarea=document.querySelector("textarea")
                        if(textarea.value.length<50){
                            Swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Please Write At Least 50 letter',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }else{

                    fetch(`https://steel-synonymous-judge.glitch.me/users/${props.user.id}`)
                    .then((res)=>res.json())
                    .then((data)=>{
                        let include=[]
                        productreviews.map((e)=>{
                            include.push(e.userid)
                        })
                        let a=include.indexOf(data.id);
                            if(a===-1){
                                userreviews.push({
                                    productid:props.product.id,
                                    comment:comment,
                                    stars:+starnumber
                                })
                                axios.patch(`https://steel-synonymous-judge.glitch.me/users/${props.user.id}`,{
                                            userreviews:userreviews
                                        }).then((data)=>{
                                            Swal.fire(
                                                'Thank You',
                                                'Your Review Has been Submitted',
                                                'success'
                                            )
                                            
                                        })
                                        productreviews.push({
                                            userid:data.id,
                                            username:props.user.firstname+" "+props.user.lastname,
                                            comment:comment,
                                            stars:+starnumber
                                        })
                                axios.patch(`https://steel-synonymous-judge.glitch.me/products/${props.product.id}`,{
                                        userreviews:productreviews,
                                        }).then((data)=>{
                                        setTimeout(() => {
                                            window.location.reload();
                                        }, 1500);
                                        })
                            }else{
                                Swal.fire({
                                    title: 'You reviewed it !',
                                    text: "Do You Want To Update You Review ?",
                                    icon: 'warning',
                                    showCancelButton: true,
                                    confirmButtonColor: '#3085d6',
                                    cancelButtonColor: '#d33',
                                    confirmButtonText: 'Yes, Update it!'
                                }).then((result) => {
                                    if (result.isConfirmed) {
                                    userreviews[a]={
                                        productid:props.product.id,
                                        comment:comment,
                                        stars:+starnumber
                                    }
                                    productreviews[a]={
                                        userid:data.id,
                                        username:props.user.firstname+" "+props.user.lastname,
                                        comment:comment,
                                        stars:+starnumber
                                    }
                                    axios.patch(`https://steel-synonymous-judge.glitch.me/users/${props.user.id}`,{
                            userreviews:userreviews
                        }).then((data)=>{
                            Swal.fire(
                                'Updated!',
                                'Your Review has been Updated.',
                                'success'
                            )
                            
                        })
                axios.patch(`https://steel-synonymous-judge.glitch.me/products/${props.product.id}`,{
                        userreviews:productreviews,
                        }).then((data)=>{
                            setTimeout(() => {
                                window.location.reload();
                            }, 1500);
                        })
                                    }
                                })
                            }
                        
                    })
                        }
            }}>Save</button>
        </div>
        </>
    )
}

export default Comments;