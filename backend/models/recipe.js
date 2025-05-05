const  mongoose=require('mongoose');

const recipeSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    ingredients:{
        type:Array,
        required:true
    },
    instructions:{
        type:String,
        // required:true
    },
    time:{
        type:String,
       
    },
    coverImage:{
        type:String,
       
    },
    createdBy: {                    // ✅ Add this field
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',                  // Reference your User model if you have one
        required: true
      }
   
},{timestamps:true})

module.exports=mongoose.model('Recipes',recipeSchema)