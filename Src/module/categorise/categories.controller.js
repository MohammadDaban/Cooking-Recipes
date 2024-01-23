import { asyncHandler } from "../../Services/errorHandling.js";

export const creatCategories = asyncHandler(async(req,res,next)=>{
    return res.status(200).json({message:'category...'})
})

export const getCategories = asyncHandler(async(req,res,next)=>{
    return res.status(200).json({message:'get category...'})
})