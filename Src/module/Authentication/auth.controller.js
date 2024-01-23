import userModel from "../../../DB/model/user.model.js"
import bcrypt from 'bcryptjs'
import { asyncHandler } from "../../Services/errorHandling.js"
import jwt from 'jsonwebtoken'
import sendEmail from "../../Services/email.js"
import { customAlphabet, nanoid } from "nanoid"

// ================= Sign Up =================

export const signUp = asyncHandler( async (req,res,next)=>{
    const {userName,email,password,adress,birthdate} =req.body
    const user = await userModel.findOne({email})

if(user){
    return next(new Error('email already exists',{cause:409}))
}

    const hashePassword = bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND))

    const createUser = await userModel.create({userName,email,adress,birthdate,password:hashePassword})

    const token = jwt.sign({email},process.env.CONFIRMEMAIL)
    sendEmail(email,"confirm email",`<a href="${req.protocol}://${req.headers.host}/auth/confirmemail/${token}">verify</a>`);
    return res.status(200).json({message:"success",createUser})
})

// ================= Sign In =================
export const signIn = asyncHandler( async (req,res,next)=>{
    const {email,password,} = req.body
    
    const user = await userModel.findOne({email})
    if(!user){
        return next(new Error("User not found",{cause:409}))
    }
    
    const match = await bcrypt.compare(password,user.password)
    if(!match){
        return next(new Error('Password mismatch',{cause:404}))
    }
    
    const token = jwt.sign({id:user._id,email:user.email,role:user.role,status:user.status},process.env.LOGINSECRET,{expiresIn:"2h"})
    const refreshToken = jwt.sign({id:user._id,role:user.role,status:user.status},process.env.LOGINSECRET,{expiresIn:60*60*24*30})
    return res.json({message:"success",token,refreshToken})
})

// ================= Confirm Email =================
export const confirmEmail = asyncHandler(async(req,res,next)=>{
    const token = req.params.token
    const decoded = jwt.verify(token,process.env.CONFIRMEMAIL)
    if(!decoded){
        return next(new Error('invalid token',{cause:409}))
    }
    const user = await userModel.findOneAndUpdate({email:decoded.email,confirmEmail:false},{confirmEmail:true})
    if(!user){
        return next(new Error('your email is already verified'));
    }
return res.status(200).json({message:'your verified email'})
})
// ================= Get User =================
export const getUser = asyncHandler(async(req,res,) => {
        const getUser = await userModel.find()
        return res.json({message:"success",getUser})
    
})
// ================= Send Cose=================
export const sendCode = asyncHandler(async(req,res,next) =>{

    const {email} = req.body
    let code = customAlphabet('1234567890',4)
    code = code()
    const user = await userModel.findOneAndUpdate({email},{code},{new:true})
    if(!user){
        return next(new Error('not found email',{cause:409}))
    }
    const html = `<h2>Code is:${code}</h2>`
    await sendEmail(email,'rest password',html)
    return res.status(200).json({message:'success',});
})
// ================= Forgot Password=================
export const forgotPassword = asyncHandler(async (req,res,next)=>{
    const {email, password,code}= req.body;
 
    const user = await userModel.findOne({email})
    if(!user){
        return next(new Error('not registered acount',{cause:409}));
    }
    if(user.code != code){
        return next(new Error('invalid code',{cause:409}));
    }
    const match = await bcrypt.compare(password, user.password)
    if(match ){
        return next(new Error('same password',{cause:409}));
    }
    user.password =  bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND));
    user.code = null;
    await user.save();
    return res.status(200).json({message:'success'})
})