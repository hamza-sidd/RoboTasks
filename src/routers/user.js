const express=require("express")
const router=new express.Router()
const sharp=require("sharp")
const auth=require('../middleware/auth')
const {sendWelcomeEmail , sendCancelationEmail}= require('../emails/account')
const User=require('../models/user')
const token=require('jsonwebtoken')
const multer=require('multer')

                             ///CRUD OPERATIONS

        //CREATE     (SIGN UP ROUTE)
router.post('/users',async(req,res)=>{
    const user=new User(req.body)
 
    try{
     await user.save()
     sendWelcomeEmail(user.email,user.name)
     const token=await user.generateOurToken()
     res.status(201).send({user,token})
    }
    catch(e){
     res.status(400).send(e)
    }
 })
                 
                   //LOGIN ROUTE
router.post('/users/login',async(req,res)=>{
    try{
        const user=await User.findByCredentials(req.body.email,req.body.password)
        const token=await user.generateOurToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()
    }
})

router.post('/users/logout',auth,async(req,res)=>{
    try{
        req.user.tokens=req.user.tokens.filter((token)=>{
            return token.token!==req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.post('/users/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens= []
        await req.user.save()
       res.send()
    }
    catch(e){
        res.status(500).send()
    }
})
           
      //READ
 router.get('/users/me',auth,async(req,res)=>{
    res.send(req.user)
    //  try{
    //     const users=await User.find({})
    //     res.send(users)
    //  }catch(e){
    //     res.status(500).send()
    //  }
 })
            //READ BY ID 
//  router.get('/users/:id',async(req,res)=>{
//      const _id=req.params.id
 
//      try{
//          const user=await User.findById(_id)
//          if(!user){
//              return res.status(404).send()
//          }
//          res.send(user)
//      }
//      catch(e){
//          res.status(500).send()
//      }
//  })
                        

              //UPDATE
 router.patch('/users/me',auth,async(req,res)=>{
    const updates=Object.keys(req.body)
    const allowedUpdates=['name','email','password','age']
    const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'invalid updates'})
    }

    try{
        updates.forEach((update)=>req.user[update]=req.body[update])
        await req.user.save()
        //const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        
        res.send(req.user)
    }catch(e){
        res.status(400).send(e)

    }
})
                   
               //DELETE
router.delete('/users/me', auth, async (req,res) => {
    // try{
    //     const user=await User.findByIdAndDelete(req.params.id)

    //     if(!user){
    //         return res.status(404).send()
    //     }
    //     res.send(user)
    // }catch(e){
    //     res.status(500).send()
    // }
    try{
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})

                        ////PROFILE PICTURE SETTINGS

const upload=multer({
  
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('please upload an image'))
        }
        cb(undefined,true)
    }
})
router.post('/users/me/avatar', auth, upload.single('avatar'),async(req,res)=>{
    const buffer=await sharp(req.file.buffer).resize({width:250 , height:250}).png().toBuffer()
    req.user.avatar=buffer
    await req.user.save()
    res.send()
},
    (error,req,res,next)=>{
        res.status(400).send({error:error.message})
})

router.delete('/users/me/avatar', auth, async(req,res)=>{
    req.user.avatar=undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar',async(req,res)=>{
    try{
        const user=await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-type','image/jpg')
        res.send(user.avatar)

    }catch(e){
        res.status(404).send()
    }


})

module.exports=router