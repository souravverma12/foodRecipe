const express=require('express');
const { getRecipes,getRecipe,editRecipe,addRecipe,deleteRecipe,upload } = require('../controller/recipe');
const verifyToken = require('../middleware/auth')
const router=express.Router();

router.get('/',getRecipes);//get all the recipes
router.get('/:id',getRecipe);//get recipe by id
router.put('/:id',upload.single('file'),editRecipe);//to edit the recipe
router.post('/',upload.single('file'),verifyToken,addRecipe);//to add the recipe
router.delete('/:id',deleteRecipe);//to delete the recipe




module.exports=router;