import Content from "./components/content";
import Login from "./components/login";
import Navbar from "./components/navbar";
import Signup from "./components/signup";
import Cart from "./components/cart";
import {
  Routes,Route, Navigate
} from "react-router-dom";
import Paynow from "./components/paynow";
import Editaccount from './components/editaccount';
import ShippingAddress from './components/shippingaddress';
import ProductDetails from "./components/productdetails";
import Forgetpassword from "./components/forgetpassword";
import Admin from "./components/admin";
import Addproduct from "./components/addproduct"
import Orders from "./components/orders";
import Footer from "./components/footer";
function App() {
  let loggedin=window.localStorage.getItem("loggedin")
  let nav=window.localStorage.getItem("nav")
  let admin=window.localStorage.getItem("admin")
  
  
  function adminpage(){
    if(admin===null){
      return(<>
      <Login/>
      <Navigate to={"/Login"}/>
      </>
      )
      
    }
    else {
      return(
        <>
        <Navigate to={"/Admin/Add-Product"}/>
        <Addproduct/>
        </>
      )
    }
  }
  function login(){
    if(loggedin===null){
      return(<Login/>)
    }
    else if(loggedin==="yes" && admin==="yes"){
      return(
        <>
        <Navigate to={"/Admin"}/>
        <Admin/>
        </>
      )
    }
    else {
      return(
        <>
        <Navigate to={"/Account/Edit-Account"}/>
        <Editaccount/>
        </>
      )
    }
  }
  function signup(){
    if(loggedin===null){
      return(<Signup/>)
    }
    else if(nav==="yes"){
      return(
        <>
        <Navigate to={"/Account/Edit-Account"}/>
        <Editaccount/>
        </>)
    }
    else if(loggedin==="yes" && admin==="yes"){
      return(
        <>
        <Navigate to={"/Admin"}/>
        <Admin/>
        </>
      )
    }
    else {
      return(
        <>
        <Navigate to={"/Account/Edit-Account"}/>
        <Editaccount/>
        </>
      )
    }
  }
  function account(){
    if(loggedin===null){
      return(
        <>
        <Navigate to={"/Login"}/>
        <Login/>
        </>)
    }
    else if(loggedin==="yes" && admin==="yes"){
      return(
        <>
        <Navigate to={"/Admin"}/>
        <Admin/>
        </>
      )
    }
    else {
      return(
        <>
        <Editaccount/>
        </>
      )
    }
  }
  function cart(){
    if(loggedin===null){
      return(
        <>
        <Navigate to={"/Login"}/>
        <Login/>
        </>)
    } else if(loggedin==="yes" && admin==="yes"){
      return(
        <>
        <Navigate to={"/Admin"}/>
        <Admin/>
        </>
      )
    }
    else {
      return(
        <>
        <Cart/>
        </>
      )
    }
  }
  function addproduct(){
    if(loggedin===null || admin===null){
      return(
        <>
        <Navigate to={"/Login"}/>
        <Login/>
        </>)
    } else if(loggedin==="yes" && admin==="yes"){
      return(
        <>
        <Addproduct/>
        </>
      )
    }
  }
  function orders(){
    if(loggedin===null || admin===null){
      return(
        <>
        <Navigate to={"/Login"}/>
        <Login/>
        </>)
    } else if(loggedin==="yes" && admin==="yes"){
      return(
        <>
        <Orders/>
        </>
      )
    }
  }
   
  function editaccount(){
    if(loggedin===null){
      return(
        <>
        <Navigate to={"/Login"}/>
        <Login/>
        </>)
    }
    else if(loggedin==="yes" && admin==="yes"){
      return(
        <>
        <Navigate to={"/Admin"}/>
        <Admin/>
        </>
      )
    }
    else {
      return(
        <>
        <Editaccount/>
        </>
      )
    }
  } function shippingaddress(){
    if(loggedin===null){
      return(
        <>
        <Navigate to={"/Login"}/>
        <Login/>
        </>)
    }
    else if(loggedin==="yes" && admin==="yes"){
      return(
        <>
        <Navigate to={"/Admin"}/>
        <Admin/>
        </>
      )
    }
    else {
      return(
        <>
        <ShippingAddress/>
        </>
      )
    }
  } 

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Content/>}/>
        <Route path="/Login" element={login()}/>
        <Route path="/Admin" element={adminpage()}/>
        <Route path="/Create-Account" element={signup()}/>
        <Route path="/Account" element={account()}/>
        <Route path="/Cart" element={cart()}/>
        <Route path="/Account/Edit-Account" element={editaccount()}/>
        <Route path="/Account/Shipping-Address" element={shippingaddress()}/>
        <Route path="Admin/Add-Product" element={addproduct()}/>
        <Route path="/product/:productid" element={<ProductDetails/>}/>
        <Route path="/Forget-Password" element={<Forgetpassword/>}/>
        <Route path='Cart/Paynow' element={<Paynow/>}/>
        <Route path='Admin/Orders' element={orders()}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
