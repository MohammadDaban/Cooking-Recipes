import jwt from 'jsonwebtoken'
import userModel from '../../DB/model/user.model.js'
import { asyncHandler } from '../Services/errorHandling.js'

export const auth = (accessRoles=[])=>{
    return async (req,res,next)=>{
        const {authorization}= req.headers
        if(!authorization?.startsWith(process.env.BEARERKEY)){
            return next(new Error('Invalid authorization'))
        }
        const token = authorization.split(process.env.BEARERKEY)[1]
        const decoded = jwt.verify(token,process.env.LOGINSECRET)
        if(!decoded){
            return next(new Error('Invalid authorization'))
        }
        
        
        const user = await userModel.findById(decoded.id).select("userName role")
        if(!user){
            return next(new Error('not registered user'))    
        }
        if(user.role == 'User'){
            return next(new Error('your not admin'))    
        }
        if(!accessRoles.includes(user.role)){
            return next(new Error('not auth user '));
        }
        next()
    }
}