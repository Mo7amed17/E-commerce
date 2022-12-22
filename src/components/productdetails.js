
import {useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import './productdetalis.css'
import Swal from "sweetalert2";
import axios from "axios";
import Comments from "./comments";
import Reviews from "./reviews";
function ProductDetails(){
    let loggedin=window.localStorage.getItem("loggedin")
    let admin=window.localStorage.getItem("admin")
    let userid=window.localStorage.getItem("id")
    let params=useParams();
    const [product, setproduct] = useState({});
    const [productreviews, setproductreviews] = useState([]);
    const [cart, setcart] = useState([]);
    const [user, setuser] = useState({});
    const [thetitle, settitle] = useState();
    const [theprice, setprice] = useState();
    const [thestock, setstock] = useState();
    const [thedescription, setdescription] = useState();
    const [themainimage, setmainimage] = useState();
    const [image2, setimage2] = useState();
    const [image3, setimage3] = useState();
    const [image4, setimage4] = useState();
    const [image5, setimage5] = useState();
    let rating=0;
    function laststar(range){
        let stars=document.querySelector(".stars")
        let star=document.createElement("i")
        let span=document.createElement("span")
        let i=document.createElement("i")
        i.className="fa-solid fa-star"
        span.appendChild(i)
        star.className="fa-solid fa-star"
                star.appendChild(span)
                stars.appendChild(star)
                span.style.width=`${range}%`
                if(range===0){
                    star.style.display="none"
                }
    }
    useEffect(() => {
        fetch(`https://steel-synonymous-judge.glitch.me/products/${params.productid}`)
        .then((res)=>res.json())
        .then((data)=>{
            let addtocart=document.querySelector(".addtocart")
            addtocart.style.display="inline-block"
            setproduct(data)
            setproductreviews(data.userreviews)
            setprice(data.price)
            settitle(data.title)
            setstock(data.stock)
            setdescription(data.description)
            setmainimage(data.thumbnail)
            setimage2(data.images[1])
            setimage3(data.images[2])
            setimage4(data.images[3])
            setimage5(data.images[4])
            data.userreviews.map((rate)=>{
                rating=rating+rate.stars
                })
                axios.patch(`https://steel-synonymous-judge.glitch.me/products/${params.productid}`,{
                    rating:rating/data.userreviews.length
                }).then((d)=>{
                    for(let a=1;a<=Math.floor(d.data.rating);a++){
                let stars=document.querySelector(".stars")
                let star=document.createElement("i")
                star.className="fa-solid fa-star"
                stars.appendChild(star)
            }
            let range=Math.round(((d.data.rating - Math.floor(d.data.rating))*100)) ;
            laststar(range);
                })
                    
                let smallimages=document.querySelector(".leftdetails .smallimages")
                let mainimage=document.querySelector(".leftdetails .mainimage")
                data.images.map((image)=>{
                    let img=document.createElement("img")
                    img.src=image
                    if((image===""||image===null||image===" ")&& admin!=="yes"){
                        image.style.display="none"
                    }
                    smallimages.appendChild(img)
                    img.addEventListener("click",(e)=>{
                        mainimage.src=e.target.src
                    })
                })
                
                
        })
        
        fetch(`https://steel-synonymous-judge.glitch.me/users/${userid}`)
                    .then((res)=>res.json())
                    .then((data)=>{setcart(data.cart)
                    setuser(data)})
    }, []);
                
    return(
        <>
        <h2 className="Details">{product.title}</h2>
        <div className="productdetails">
            <div className="leftdetails">
                <img src={product.thumbnail} alt={`${product.title}`} className="mainimage"/>
                <div className="smallimages"></div>
            </div>
            <div className="rightdetails">
                <p className="descreption">{product.description}</p>
                <h2 className="price">$<span>{product.price}</span></h2>
                <p className="stars"></p>
                <h3 className="stock">Only <span>{product.stock}</span> Left</h3>
                <button onClick={(e)=>{
                    if(loggedin===null){
                        window.location.replace(`${window.location.origin}/E-commerce/#/Login`)
                    }
                    else{
                        e.target.style.cursor="not-allowed"
                        e.target.disabled=true
                        e.target.style.backgroundColor="gray"
                        let include=[]
                        cart.map((e)=>{
                            include.push(e.productId)
                        })
                        let a=include.indexOf(product.id);
                        if(a===-1){
                            cart.push({
                                productId:product.id,
                                productTitle:product.title,
                                productPrice:product.price,
                                quantity:1,
                                productImage:product.thumbnail,
                                productBrand:product.brand
                            })
                            axios.patch(`https://steel-synonymous-judge.glitch.me/users/${userid}`,{
                                cart:cart
                            }).then((data)=>{
                                let carnumber=document.querySelector(".navbar .cart i span")
                                let thecart=document.querySelector(".navbar .cart a i")
                                thecart.style.color="rgb(30, 166, 219)"
                                let num=+carnumber.textContent
                                carnumber.textContent=num+1;
                                e.target.disabled=false
                        e.target.style.backgroundColor="black"
                        e.target.style.cursor="pointer"
                            })
                        }
                        else{
                            cart[a].quantity++
                            axios.patch(`https://steel-synonymous-judge.glitch.me/users/${userid}`,{
                                cart:cart
                            }).then((data)=>{
                                let carnumber=document.querySelector(".navbar .cart i span")
                                let thecart=document.querySelector(".navbar .cart a i")
                                thecart.style.color="rgb(30, 166, 219)"
                                let num=+carnumber.textContent
                                carnumber.textContent=num+1;
                                e.target.disabled=false
                        e.target.style.backgroundColor="black"
                        e.target.style.cursor="pointer"
                            })
                        }
                    
                    }
                }} className="addtocart">Add To Cart</button>
            </div>
        </div>
                {
                    admin && <div className="editproduct">
                    <button onClick={(e)=>{
                            let form=document.querySelector(".editimages2")
                        let title=document.querySelector(".Details")
                        let price=document.querySelector(".price span")
                        let descreption=document.querySelector(".descreption")
                        let stock=document.querySelector(".stock span")
                        if(e.target.textContent==="Edit"){
                            form.style.display="block"
                            e.target.textContent="Save"
                        e.target.style.backgroundColor="#0ab90a"
                        title.style.outLine="red"
                            title.contentEditable=true
                            title.oninput=(e)=>{settitle(e.target.textContent)}
                            price.contentEditable=true
                            price.oninput=(e)=>{setprice(e.target.textContent)}
                            stock.contentEditable=true
                            stock.oninput=(e)=>{setstock(e.target.textContent)}
                            descreption.contentEditable=true
                            descreption.oninput=(e)=>{setdescription(e.target.textContent)}
                            
                        }
                        else if(e.target.textContent==="Save"){
                            if(thetitle===""||theprice===""||thestock===""||themainimage===""||thedescription===""){
                                Swal.fire(
                                    'Fields Are Empty',
                                    'Please Fill All',
                                    'error'
                                )
                            }else{
                                e.target.disabled=true
                                e.target.style.backgroundColor="rgb(77, 202, 77)"
                                e.target.style.cursor="not-allowed"
                                axios.patch(`https://steel-synonymous-judge.glitch.me/products/${params.productid}`,{
                                    title: thetitle,
                                            description: thedescription,
                                            price: +theprice,
                                            stock: +thestock,
                                            thumbnail: themainimage,
                                            images:[
                                                themainimage,
                                                image2,
                                                image3,
                                                image4,
                                                image5
                                            ]
                                }).then((data)=>{
                                    Swal.fire(
                                        'Done!',
                                        'Changes Has Been Saved',
                                        'success'
                                    )
                                    setTimeout(() => {
                                        window.location.reload()
                                    }, 1000);
                                })
                                
                            }
                        }
                        
                    }}>Edit</button>
                    <button onClick={(e)=>{
                        Swal.fire({
                            title: 'Are you sure?',
                            text: "You won't be able to revert this!",
                            icon: 'warning',
                            showCancelButton: true,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Yes, delete it!'
                          }).then((result) => {
                            if (result.isConfirmed) {
                                axios.delete(`https://steel-synonymous-judge.glitch.me/products/${params.productid}`)
                        .then((data)=>{
                            Swal.fire(
                                'Deleted!',
                                `${product.title} Has Deleted!`,
                                'success'
                              )
                            setTimeout(() => {
                                window.location.replace(`${window.location.origin}/E-commerce/#`)
                            }, 2000);
                        })
                            }
                          })
                        
                    }}>Delete</button>
                    </div>
                    
                }
                {
                        <form className="editimages2">
                                <input placeholder="Main Image" onChange={(e)=>{
                                let mainimage=document.querySelector(".mainimage")
                                let smallimages=document.querySelectorAll(".smallimages img")
                                    mainimage.src=e.target.value
                                    smallimages[0].src=e.target.value
                                    setmainimage(e.target.value)
                                }}/>
                                <input placeholder="Image2" onChange={(e)=>{
                                    let smallimages=document.querySelectorAll(".smallimages img")
                                    smallimages[1].src=e.target.value
                                    setimage2(e.target.value)
                                }}/>
                                <input placeholder="Image3" onChange={(e)=>{
                                    let smallimages=document.querySelectorAll(".smallimages img")
                                    smallimages[2].src=e.target.value
                                    setimage3(e.target.value)
                                }}/>
                                <input placeholder="Image4" onChange={(e)=>{
                                    let smallimages=document.querySelectorAll(".smallimages img")
                                    smallimages[3].src=e.target.value
                                    setimage4(e.target.value)
                                }}/>
                                <input placeholder="Image5" onChange={(e)=>{
                                    let smallimages=document.querySelectorAll(".smallimages img")
                                    smallimages[4].src=e.target.value
                                    setimage5(e.target.value)
                                }}/>
                        </form>
                }
        {
            loggedin && <Comments user={user} product={product} />
        }
        <div className="reviews">
            <h2>Reviews ({productreviews.length})</h2>
            {
            productreviews.map((review,index)=>{
                return(
                    <Reviews review={review} key={index} length={productreviews.length}/>
                )
            })}
        </div>
        </>

    )
}

export default ProductDetails;