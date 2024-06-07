const express=require("express")
 require('./mongoDB/mongoose')
// const User=require('./models/user')
// const Task=require('./models/task')

const userRouter=require('./routers/user')
const taskRouter=require('./routers/task')
const app=express()
const port=process.env.PORT

// const multer=require("multer")
// const upload=multer({
//     dest:'images',
//     limits:{
//         fileSize:1000000
//     },

//     fileFilter(req,file,cb){
//         if(!file.originalname.match(/\.(doc|docx)$/)){
//             return cb(new Error('please upload a word document'))
//         }
//         cb(undefined,true)
//     }
// })


// app.post('/upload',upload.single('upload'),(req,res)=>{
//     res.send()
// }, (error,req,res,next)=>{
//     res.status(400).send({error:error.message})
// }
// )

// app.use((req,res,next)=>{    //MIDDLEWARE
//     if(req.method==='GET'){
//         res.send('GET reqs are disabled')
//     }
//     else{
//         next()
//     }
//})

// app.use((req,res,next)=>{
//     res.status(503).send('site is under maintenance')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port,()=>{
    console.log('server is up on port',port)
})

// const jwt=require('jsonwebtoken')
// const myFunc=async()=>{
//    const token=jwt.sign({_id:'acb345'},'thisisNODE')
//    console.log(token)
//    const data=jwt.verify(token,'thisisNODE')
//    console.log(data)
// }
// myFunc()
//const Task=require('./models/task')
// const main=async()=>{
//     const task=await Task.findById('66130e6fa89bb7dbd8abd062')
//     await task.populate('owner')
//     console.log(task.owner)
// }
//main()