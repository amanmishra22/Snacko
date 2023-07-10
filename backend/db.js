const mongoose = require('mongoose');
const mongouri='mongodb+srv://Snacko:SRnaamcko123@cluster0.uisafnl.mongodb.net/snackomern?retryWrites=true&w=majority'

const mongodb=async()=>{
    mongoose.set('strictQuery', false)
   await mongoose.connect(mongouri,{useNewUrlParser: true},(err,result)=>{
    if(err)console.log("-------",err)
    else{
        console.log("connected");
        const fetched_data= mongoose.connection.db.collection("food_items");
        fetched_data.find({}).toArray(async function(arr,data){
            const foodCategory= await mongoose.connection.db.collection("foodCategory");
            foodCategory.find({}).toArray(function(err,catData){
                if(err)console.log(err);
            else{
                global.food_items=data;
                global.foodCategory=catData;
            }
            })
        })
    }
    });
}
module.exports=mongodb;
