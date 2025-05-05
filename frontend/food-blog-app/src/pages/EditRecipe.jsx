import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';



export default function EditRecipe() {
    const [recipeData,setRecipeData]=useState({})
    const navigate=useNavigate();
    const {id}=useParams()


    useEffect(()=>{
        const getData=async()=>{
            await axios.get(`http://localhost:5000/recipe/${id}`)
            .then(response=>{
                let res=response.data
                setRecipeData({
                    title:res.title,
                    ingredients:res.ingredients.join(","),
                    instructions:res.instructions,
                    time:res.time

                })
            })
        }
        getData()
    },[])


    const onHandleChange=(e)=>{
        
        let val=(e.target.name==="ingredients") ? e.target.value.split(",") :(e.target.name==="file")?e.target.files[0]: e.target.value;
        setRecipeData(pre=>({...pre,[e.target.name]:val}))
    }

    // const onHandleSubmit=async(e)=>{
    //     e.preventDefault();
    //     console.log(recipeData)
    //     await axios.post("http://localhost:5000/recipe",recipeData,{
    //         headers:{
    //             'Content-Type':'multipart/form-data',
    //             'authorization':'bearer '+localStorage.getItem("token")
    //         }
    //     })
    //     .then(()=>navigate("/"))


    // }
    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(recipeData)
        await axios.put(`http://localhost:5000/recipe/${id}`, recipeData,{
            headers:{
                'Content-Type':'multipart/form-data',
                'authorization':'bearer '+localStorage.getItem("token")
            }
        })
            .then(() => navigate("/myRecipe"))
    }

    // const onHandleSubmit = async (e) => {
    //     e.preventDefault();
      
    //     const formData = new FormData();
    //     formData.append("title", recipeData.title);
    //     formData.append("time", recipeData.time);
    //     formData.append("instructions", recipeData.instructions);
    //     formData.append("file", recipeData.file);
      
    //     // Ingredients is an array, so we append each value separately
    //     recipeData.ingredients.forEach((ingredient, index) => {
    //       formData.append(`ingredients[${index}]`, ingredient);
    //     });
      
    //     try {
    //       await axios.put(`http://localhost:5000/recipe/${id}`, formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //           "authorization": "bearer " + localStorage.getItem("token"),
    //         },
    //       });
    //       navigate("/");
    //     } catch (err) {
    //       console.error("Submit error:", err.response?.data || err.message);
    //     }
    //   };
       
  return (
    <div>
      <div className='container'>
      <form className='form' onSubmit={onHandleSubmit}>
      <div className='form-control'>
      <label>Title</label>
      <input type='text' className='input' name='title' onChange={onHandleChange} value={recipeData.title}></input>
      </div>
      <div className='form-control'>
      <label>Time</label>
      <input type='text' className='input' name='time' onChange={onHandleChange}  value={recipeData.time}></input>
      </div>
      <div className='form-control'>
      <label>Ingredients</label>
      <textarea type='text' className='input-textarea' name='ingredients' row='5' onChange={onHandleChange} value={recipeData.ingredients}></textarea>
      </div>
      <div className='form-control'>
      <label>Instructions</label>
      <textarea type='text' className='input-textarea' name='instructions' row='5' onChange={onHandleChange} value={recipeData.instructions}></textarea>
      </div>
      <div className='form-control'>
      <label>Recipe image</label>
      <input type='file' className='input' name='file'onChange={onHandleChange} ></input>
      </div>
      <button type='submit'>Edit Recipe</button>
      </form>
      </div>
    </div>
  )
}
