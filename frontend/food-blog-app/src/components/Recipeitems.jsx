import { all } from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import foodImg from '../assets/dalmakhni.jpeg'
import { MdOutlineWatchLater } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import axios from 'axios';



export default function Recipeitems() {
    const recipes=useLoaderData() //it will fetch data from the loader function
    const [allRecipes,setAllRecipes]=useState()
    let path=window.location.pathname==="/myRecipe"? true : false
    let favItems=JSON.parse(localStorage.getItem("fav")) ?? []
    const [isFavRecipe,setIsFavRecipe]=useState(false)
    console.log(allRecipes)


  useEffect(()=>{
      setAllRecipes(recipes)
  },[recipes])


  const onDelete=async(id)=>{
    await axios.delete(`http://localhost:5000/recipe/${id}`)
    .then((res)=>console.log(res))
    setAllRecipes(recipes=>recipes.filter(recipe=>recipe._id!==id))
    let filterItem=favItems.filter(recipe=>recipe._id !== id)
    localStorage.setItem("fav",JSON.stringify(filterItem))
  }


  const favRecipe=(item)=>{
    let filterItem=favItems.filter(recipe=>recipe._id !== item._id)//if the itme is not present then add it
    favItems=favItems.filter(recipe=>recipe._id===item._id).length===0 ? [...favItems,item] : filterItem// if present then remove
    localStorage.setItem("fav",JSON.stringify(favItems))
    setIsFavRecipe(pre=>!pre)
  }
  return (
    <div>
      <div className='card-container'>
      {
        allRecipes?.map((item,index)=>{
            return (
                <div key={index} className='card'>
                <img src={`http://localhost:5000/images/${item.coverImage}`} width ='180px' height ='130px'></img>
                <div className='card-body'>
                <div className='title'>{item.title}</div>
                <div className='icons'>
                <div className='timer'><MdOutlineWatchLater />{item.time}</div>
              {(!path) ?< FaHeart className='faheart' onClick={()=>favRecipe(item)}  style={{color:(favItems.some(res=>res._id===item._id)) ? "red" : ""}}/>:
                <div className='action'>
                <Link to={`/editRecipe/${item._id}`} className='editIcon'><FaEdit /></Link>
                <MdDeleteForever onClick={()=>onDelete(item._id)} className='deleteIcon'/>
                </div>}
                
                </div>
                </div>
                </div>
            )
        })
      }
      
      
      </div>
    </div>
  )
}
