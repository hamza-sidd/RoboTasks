//const { Db } = require("mongodb");
const mongoose=require("mongoose");
//const validator=require("validator")
main()
   .then(() =>{
    console.log("connection successful");
   })
   .catch((err)=> console.log(err));

async function  main() {
    await mongoose.connect(process.env.MONGODB_URL);
}

// const User=mongoose.model("User",{ 
//     email:{
//        type:String,
//        trim:true,
//        lowercase:true,
//        validate(value){
//         if(!validator.isEmail(value)){
//           throw new Error('INVALID EMAIL')
//         }
//        }
//     },
//     name:{
//       type:String,
//       trim:true,
//     },
//     description:{
//       type:String
//     },
//     age:{
//       type:Number,
//       default:0,
//       validate(value){
//         if(value<0){
//           throw new Error('AGE MUST BE POSITIVE')
//         }
//       }
//     },
  
//     password:{
//       type:String,
//       required:true,
//       minLength:7,
//       trim:true,
//       validate(val){
//         if(val.includes('password')){
//           throw new Error('invalid password');
//         }
//       }
//     }
//   });

//   const user1=new User({
//     email:"abcd@gmail.com",
//         name:"david",
//         age:20,
//         password:"123dhdcocdci",
//     });
    
//     user1
//       .save()
//       .then((res)=>{
//         console.log(res);
//       })
//       .catch((err)=>{
//         console.log(err);
//       });
    


// const userSchema=new mongoose.Schema({
//     name:String,
//     email:String,
//     age:Number,
// });

//  const User=mongoose.model("User",userSchema);
//const emp=mongoose.model("employee",userSchema);

// const user1=new User({
//     name:"david",
//     email:"abcd@",
//     age:20,
// });

// user1
//   .save()
//   .then((res)=>{
//     console.log(res);
//   })
//   .catch((err)=>{
//     console.log(err);
//   });



// const me=new task({
//   email:"   MHDUUD@gmail.com",
//   name:"      hamza",
//   description:"abcdefghijklmnop",
//   password:'abdj',
// });

// me.save().then((res)=>{
//   console.log(res);
// })
// .catch((err)=>{
//   console.log(err);
// });

