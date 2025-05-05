import React from 'react'
import './App.css';
import {createBrowserRouter,RouterProvider} from 'react-router-dom';
import Home from './pages/Home'
import MainNavigation from '../src/components/MainNavigation'
import axios, { all } from 'axios';
import AddFoodRecipe from './pages/AddFoodRecipe';
import EditRecipe from './pages/EditRecipe';

//fetch items from database
const getAllRecipes=async()=>{
  let allRecipes=[];
  await axios.get("http://localhost:5000/recipe/").then(res=>{
    allRecipes=res.data //store all the recipies in allRecipes

  })
  return allRecipes
}

const getMyRecipes=async()=>{
  let user=JSON.parse(localStorage.getItem("user"))
  let allRecipes=await getAllRecipes()
  return allRecipes.filter(item=>item.createdBy===user._id)
}


//funtion to get the fav recipe
const getFavRecipes=()=>{
  return JSON.parse(localStorage.getItem("fav"))
}

const router=createBrowserRouter([
  {path:"/",element:<MainNavigation/>,children:[
    {path:"/",element:<Home/>,loader:getAllRecipes},
    {path:"/myRecipe",element:<Home/>,loader:getMyRecipes},
    {path:"/favRecipe",element:<Home/>,loader:getFavRecipes},
    {path:"/addRecipe",element:<AddFoodRecipe/>},
    {path:"/editRecipe/:id",element:<EditRecipe/>}]},
  
  
  
])
export default function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  ) 
}
 