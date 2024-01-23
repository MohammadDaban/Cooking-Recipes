import { Router } from "express";
import * as authController from "./auth.controller.js";
import { auth } from "../../middeleware/authorization.js";
import { endPoint } from "../../middeleware/endPoint.js";
const router = Router()

router.post('/signup',authController.signUp)
router.post('/signin',authController.signIn)
router.get('/getuser',auth(endPoint.getAll),authController.getUser)
router.get('/confirmemail/:token',authController.confirmEmail)
router.patch('/sendcode',authController.sendCode)
router.patch('/forgot',authController.forgotPassword)
export default  router