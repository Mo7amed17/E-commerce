import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
function Reviews(props){
    let id=window.localStorage.getItem("id")
    const [productreviews, setproductreviews] = useState([]);
    let arr=[]
    useEffect(() => {
        fetch(`https://steel-synonymous-judge.glitch.me/users/${id}`)
        .then((res)=>{res.json()})
        .then((data)=>{
            let reviews=document.querySelectorAll(".review")
            reviews.forEach(review => {
                if(+review.attributes.data.value===+id)
                {
                    review.classList.add("activecomment")
                }
            });
        })
        
        let icon=document.getElementById(`${props.review.userid}`)
        for(let a=0;a<props.review.stars;a++){
            arr.push(a)
        }
                arr.map(()=>{
                    let i=document.createElement("i")
                    i.className="fa-solid fa-star"
                    icon.appendChild(i)
                })
                
    }, []);
        return(
        <>
                <div className="review" data={props.review.userid}>
                    <div className="leftside">
                        <h3>{props.review.username}</h3>
                        <div className="thestars2" id={props.review.userid}>
                        </div>
                    </div>
                    <div className="rightside">
                        <div className="thecomment">{props.review.comment}</div>
                    </div>
                </div>
        </>
    )
}

export default Reviews;