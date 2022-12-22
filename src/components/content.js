import React, { useEffect } from "react";
import { useState } from "react";
import Ads from "./ads";
import Product from "./product";
import './product.css'
import './filtermenu.css'
import Swal from "sweetalert2";
import Footer from "./footer";
function Content(){
    let direction=0;
    let api="https://steel-synonymous-judge.glitch.me"

    function getAllProducts(){
        fetch(`${api}/products`)
        .then((res)=>res.json())
        .then((data)=>{setproducts(data)})
        .catch((error)=>{
            Swal.fire({
                title: `Sorry There are an Error,
                        We Will Reload Page`,
                showClass: {
                  popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                  popup: 'animate__animated animate__fadeOutUp'
                }
              })
              setTimeout(() => {
                window.location.reload();
              },2000);
        })
    }
    function getAllcategories(){
        fetch(`${api}/categories`)
        .then((res)=>res.json())
        .then((data)=>setcategories(data))
    }
    function getcategory(){
        fetch(`${api}/${filter}`)
        .then((res)=>res.json())
        .then((data)=>setproducts(data))
    }

    const [products, setproducts] = useState([]);
    const [categories, setcategories] = useState([]);
    const [filter, setfilter] = useState("products");
    const [lowprice, setlowprice] = useState(0);
    const [maxprice, setmaxprice] = useState(100000);
    useEffect(()=>{
        getAllcategories();
        getAllProducts();
        
    },[])
    return(
        <> <Ads/>
            <div className="container">
            <div className="categories">
            <div className="arrow">
                <i className="fa-solid fa-angles-right" onClick={(e)=>{
            let categories=document.querySelector(".categories")
            if(direction===0){
                categories.style.left="0px"
                e.target.style.animationDuration="0s"
                direction=1;
                e.target.classList.value="fa-solid fa-angles-left"
            }
            else{
                if(window.screen.width<=667&&window.screen.width>=551){
                    categories.style.left="-315px"  
                }else if(window.screen.width<=550){
                    categories.style.left="-245px"
                }
                else{
                    categories.style.left="-395px"
                }
                e.target.style.animationDuration="1s"
                direction=0;
                e.target.classList.value="fa-solid fa-angles-right"
            }
        }}></i>
        </div>
            {categories.map((category,index)=>{
            return(
                <button type="button" key={index} onFocus={(e)=>{
                    e.target.style.color="rgb(30, 166, 219)"
                    e.target.style.backgroundColor="white"
                    setfilter(e.target.textContent)
                    let searchfilter=document.querySelector(".categories .searchfilter")
                    let resetfilter=document.querySelector(".categories .clearfilter")
                    searchfilter.style.display="block"
                    resetfilter.style.display="block"
                }} onBlur={(e)=>{
                    e.target.style.backgroundColor="rgb(30, 166, 219)"
                    e.target.style.color="white"
                }}>{category}</button>
            )
            })}
            <button className="allproducts" onFocus={(e)=>{
                e.target.style.color="rgb(30, 166, 219)"
                e.target.style.backgroundColor="white"
                setfilter("products")
                let searchfilter=document.querySelector(".categories .searchfilter")
                    let resetfilter=document.querySelector(".categories .clearfilter")
                    searchfilter.style.display="block"
                    resetfilter.style.display="block"
            }} onBlur={(e)=>{
                e.target.style.backgroundColor="rgb(30, 166, 219)"
                e.target.style.color="white"
            }}>All Products</button>

            <div className="price">
                <div className="lowprice">
                    <input className="low" type="range" min="0" max="100000" step="20" onChange={(e)=>{
                        setlowprice(e.target.value)
                        let resetfilter=document.querySelector(".categories .clearfilter")
                        resetfilter.style.display="block"
                        let searchfilter=document.querySelector(".categories .searchfilter")
                        searchfilter.style.display="block"
                    let inputs=document.querySelectorAll(".lowprice input")
                        inputs[1].value=e.target.value
                        let input=document.querySelectorAll(".maxprice input")
                        if(e.target.value>=input[0].value){
                            e.target.max=+input[0].value -1
                            inputs[1].value=e.target.value
                            inputs[1].max=+input[1].value + -1
                        }
                    }}/>
                    <input type="text"  placeholder="Low Price"  onChange={(e)=>{
                        setlowprice(e.target.value)
                        let resetfilter=document.querySelector(".categories .clearfilter")
                        resetfilter.style.display="block"
                        let searchfilter=document.querySelector(".categories .searchfilter")
                        searchfilter.style.display="block"
                        let inputs=document.querySelectorAll(".lowprice input")
                        inputs[0].value=e.target.value
                        if(e.target.value>100000){
                            e.target.value=100000
                        }
                        if(e.target.value<=0){
                            e.target.value=0
                        }
                    }} onBlur={(e)=>{
                        let input=document.querySelectorAll(".maxprice input")
                        if(e.target.value>=+input[1].value){
                            e.target.value=+input[1].value -1
                        }
                    }}/>
                </div>
                <div className="maxprice" >
                    <input className="max" type="range"  min="1" max="100001" step="20" onChange={(e)=>{
                        setmaxprice(e.target.value)
                        let resetfilter=document.querySelector(".categories .clearfilter")
                        resetfilter.style.display="block"
                        let searchfilter=document.querySelector(".categories .searchfilter")
                        searchfilter.style.display="block"
                        let inputs=document.querySelectorAll(".maxprice input")
                        inputs[1].value=e.target.value
                        let input=document.querySelectorAll(".lowprice input")
                        if(e.target.value<= +input[0].value){
                            e.target.min=+input[0].value + +1
                            inputs[1].value=e.target.value
                            inputs[1].min=+input[1].value + +1
                        }
                    }}/>
                    <input type="text" placeholder="Max Price" onChange={(e)=>{
                        setmaxprice(e.target.value)
                        let resetfilter=document.querySelector(".categories .clearfilter")
                        resetfilter.style.display="block"
                        let inputs=document.querySelectorAll(".maxprice input")
                        let searchfilter=document.querySelector(".categories .searchfilter")
                        searchfilter.style.display="block"
                        inputs[0].value=e.target.value
                        if(e.target.value>100001){
                            e.target.value=100001
                        }
                        if(e.target.value<=0){
                            e.target.value=1
                        }
                    }} onBlur={(e)=>{
                        let input=document.querySelectorAll(".lowprice input")
                        if(e.target.value<=+input[1].value){
                            e.target.value=+input[1].value + +1
                            
                        }
                    }}/>
                </div>
                </div>

                <button className="clearfilter" onClick={(e)=>{
                    let inputs=document.querySelectorAll(".maxprice input")
                    let input=document.querySelectorAll(".lowprice input")
                    inputs[0].value=inputs[1].value=100000
                    input[0].value=input[1].value=0
                        setTimeout(() => {
                                e.target.style.display="none"
                            }, 100);
                            setfilter("products")
                            setlowprice(0)
                            setmaxprice(100000)
                }}>Reset Filters</button>
                <button className="searchfilter" onClick={(e)=>{
                    let inputs=document.querySelectorAll(".lowprice input")
                    let input=document.querySelectorAll(".maxprice input")
                    setlowprice(inputs[1].value)
                    setmaxprice(input[1].value)
                    let categories=document.querySelector(".categories")
                    let icon=document.querySelector(".categories i")
                    if(window.screen.width<=667&&window.screen.width>=551){
                        categories.style.left="-315px"  
                    }else if(window.screen.width<=550){
                        categories.style.left="-245px"
                    }
                    else{
                        categories.style.left="-395px"
                    }
                    icon.style.animationDuration="1s"
                    direction=0;
                    icon.classList.value="fa-solid fa-angles-right"
                    let clearfilter=document.querySelector(".clearfilter")
                    setTimeout(()=> {
                        e.target.style.display="none"
                        clearfilter.style.display="none"
                    }, 1100);
                    getcategory();
                    let theproducts=document.querySelectorAll(".product")
                    theproducts.forEach(product => {
                    if(+product.children[3].lastChild.data>=lowprice && +product.children[3].lastChild.data<=maxprice){
                        product.style.display="block"
                    }else{
                        product.style.display="none"
                    }
    });
                }}>Search</button>
            </div>
                {
                    products.map((product)=>{
                        return( 
                        <React.Fragment  key={product.id}>
                        <Product product={product} maxprice={+maxprice} lowprice={+lowprice} />
                        </React.Fragment>
                        );
                        })
                }
            </div>
            <Footer/>
            </>
    )
}
export default Content;