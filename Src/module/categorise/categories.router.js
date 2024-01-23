import {Router} from 'express'
import * as categoriesController from './categories.controller.js'
const router = Router()

router.post('/create',categoriesController.creatCategories)
router.get('/getcategories',categoriesController.getCategories)


export default  router