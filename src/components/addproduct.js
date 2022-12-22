
import "./admin.css"
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import Adminpanel from "./adminpanel";
function Addproduct(){
    const [categories, setcategories] = useState([]);
    const [producttitle, setproducttitle] = useState("");
    const [productbrand, setproductbrand] = useState("");
    const [productprice, setproductprice] = useState("");
    const [description, setdescription] = useState("");
    const [productquantity, setproductquantity] = useState("");
    const [mainimage, setmainimage] = useState("");
    const [category, setcategory] = useState("");
    const [image2, setimage2] = useState("");
    const [image3, setimage3] = useState("");
    const [image4, setimage4] = useState("");
    const [image5, setimage5] = useState("");
    const [length, setlength] = useState("");
    useEffect(() => {
        let images=document.querySelectorAll(".theimages .smallimages img")
        let mainimage=document.querySelector(".theimages .mainimage")
        images.forEach(image => {
            image.addEventListener("click",(e)=>{
                mainimage.src=e.target.src
            })
        });
        fetch("https://steel-synonymous-judge.glitch.me/categories").then((res)=>res.json())
        .then((data)=>setcategories(data)).catch((err)=>{
            Swal.fire('Error,We will reload')
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        })
        fetch("https://steel-synonymous-judge.glitch.me/products").then((res)=>res.json())
        .then((data)=>setlength(data.length)).catch((err)=>{
            Swal.fire('Error,We will reload')
            setTimeout(() => {
                window.location.reload()
            }, 2000);
        })
    }, []);
    return(
        <>
        <Adminpanel/>
        <div className="addproduct">
            <h2>add product</h2>
        <div className="thedeatails">
            <div className="left">
                <form onClick={(e)=>e.preventDefault()}>
                    <input placeholder="Product Name" required maxLength={20} onChange={(e)=>{
                        let name=document.querySelector(".productshape .name1 span")
                        name.textContent=e.target.value
                        setproducttitle(e.target.value)
                    }}/>
                    <input placeholder="Product Brand" required maxLength={20} onChange={(e)=>{
                        let brand=document.querySelector(".productshape .brand1 span")
                        brand.textContent=e.target.value
                        setproductbrand(e.target.value)
                    }}/>
                    <input placeholder="Product Price" required maxLength={9} onChange={(e)=>{
                        let price=document.querySelector(".productshape .price1 span")
                        price.textContent=e.target.value
                        setproductprice(e.target.value)
                    }}/>
                    <input placeholder="Product Description" required maxLength={300} onChange={(e)=>{
                        let description=document.querySelector(".productshape .description1 span")
                        description.textContent=e.target.value
                        setdescription(e.target.value)
                    }}/>
                    <input placeholder="Product Quantity" required maxLength={9} onChange={(e)=>{
                        let quantity=document.querySelector(".productshape .quantity1 span")
                        quantity.textContent=e.target.value
                        setproductquantity(e.target.value)
                    }}/>
                    <input placeholder="Main Image" required onChange={(e)=>{
                        let mainimage=document.querySelector(".theimages .mainimage")
                        let image1=document.querySelector(".theimages .smallimages .image1")
                        mainimage.src=e.target.value
                        image1.src=e.target.value
                        setmainimage(e.target.value)
                    }} />
                    <input placeholder="Image 2" onChange={(e)=>{
                        let image2=document.querySelector(".theimages .smallimages .image2")
                        image2.src=e.target.value
                        setimage2(e.target.value)
                    }}/>
                    <input placeholder="Image 3" onChange={(e)=>{
                        let image3=document.querySelector(".theimages .smallimages .image3")
                        image3.src=e.target.value
                        setimage3(e.target.value)
                    }}/>
                    <input placeholder="Image 4" onChange={(e)=>{
                        let image4=document.querySelector(".theimages .smallimages .image4")
                        image4.src=e.target.value
                        setimage4(e.target.value)
                    }}/>
                    <input placeholder="Image 5" onChange={(e)=>{
                        let image5=document.querySelector(".theimages .smallimages .image5")
                        image5.src=e.target.value
                        setimage5(e.target.value)
                    }}/>
                    <label htmlFor="categories">Category</label>
                    <select name="categories" id="categories">
                        {
                            categories.map((category)=>{
                                return(
                                    <option value={category} onClick={(e)=>{
                                            setcategory(e.target.value)
                                    }}>{category}</option>
                                )
                            })
                        }
                    </select>
                    <button onClick={()=>{
                            if(producttitle===""||productbrand===""||productprice===""||mainimage===""||description===""){
                                Swal.fire(
                                    'Information is Not Complete',
                                    'Please Fill All Fields',
                                    'error'
                                )
                            }else{
                                axios.post("https://steel-synonymous-judge.glitch.me/products",{
                                            id: length+1,
                                            title: producttitle,
                                            description: description,
                                            price: +productprice,
                                            rating: null,
                                            stock: +productquantity,
                                            brand: productbrand,
                                            category: category,
                                            thumbnail: mainimage,
                                            images: [
                                            mainimage,
                                            image2,
                                            image3,
                                            image4,
                                            image5
                                            ],
                                            userreviews: []
                                }).then((data)=>{
                                    Swal.fire(
                                        'Congratulations',
                                        'Product Has Added',
                                        'success'
                                    )
                                    axios.post(`https://steel-synonymous-judge.glitch.me/${category}`,{
                                        id: length+1,
                                            title: producttitle,
                                            description: description,
                                            price: +productprice,
                                            rating: null,
                                            stock: +productquantity,
                                            brand: productbrand,
                                            category: category,
                                            thumbnail: mainimage,
                                            images: [
                                            mainimage,
                                            image2,
                                            image3,
                                            image4,
                                            image5
                                            ],
                                            userreviews: []
                                    }).then((d)=>{
                                    })
                                    let inputs=document.querySelectorAll(".addproduct form input") 
                                        inputs.forEach(input => {
                                            input.value=""
                                        }); 
                                }).catch((err)=>{
                                    Swal.fire(
                                        'Please Try Again',
                                        'Product Has Not Added',
                                        'error'
                                    )
                                })
                            }
                    }}>Save Product</button>
                </form>
            </div>
            <div className="right">
                <div className="productshape">
                        <div className="theimages">
                        <img className="mainimage" src="" alt=""/>
                    <div className="smallimages">
                        <img className="image1" src="" alt=""/>
                        <img className="image2" src="" alt=""/>
                        <img className="image3" src="" alt=""/>
                        <img className="image4" src="" alt=""/>
                        <img className="image5" src="" alt=""/>
                    </div>
                        </div>
                    <h3 className="brand1">Brand:<span></span></h3>
                    <h3 className="name1">Name:<span></span></h3>
                    <h3 className="price1">Price:$<span></span></h3>
                    <p className="description1">description:<span></span></p>
                    <h3 className="quantity1">Quantity:<span></span></h3>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}

export default Addproduct;