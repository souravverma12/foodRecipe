import React, { useState } from 'react'
import pizza from '../assets/pizza.avif'
import Navbar from '../components/Navbar.jsx'
import Footer from '../components/Footer.jsx'
import Recipeitems from '../components/Recipeitems.jsx'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal.jsx'
import InputForm from '../components/InputForm.jsx'

export default function App() {
  const navigate=useNavigate()
  const [isOpen,setIsOpen ]=useState(false)


  const addRecipe=()=>{
    let token=localStorage.getItem("token")
    if(token){
      navigate("/addRecipe")
    }
    else{
      setIsOpen(true)
    }
    
  }
  return (
    <div>
    
      <section className='home'>
      <div className='left'>
      <h1>Food recipe</h1>
      <h5>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. </h5>
      <button onClick={addRecipe}>Share your recipe</button>
      </div>
      
      
      <div className='right'>
      <img src={pizza} width="320px" height="320px"></img ></div></section>
  
      <div className='bg'>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,0L21.8,42.7C43.6,85,87,171,131,202.7C174.5,235,218,213,262,186.7C305.5,160,349,128,393,128C436.4,128,480,160,524,186.7C567.3,213,611,235,655,256C698.2,277,742,299,785,266.7C829.1,235,873,149,916,149.3C960,149,1004,235,1047,234.7C1090.9,235,1135,149,1178,133.3C1221.8,117,1265,171,1309,165.3C1352.7,160,1396,96,1418,64L1440,32L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z"></path></svg>
      </div>
          {(isOpen) &&<Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
      
      <div className='recipe'>
      <Recipeitems/>
      </div>
      </div>
  )
}
