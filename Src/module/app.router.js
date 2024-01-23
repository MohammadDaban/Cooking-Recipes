import connectDB from '../../DB/Connection.js';

import { globalErrorHandler } from '../Services/errorHandling.js';
import authRouter from './Authentication/auth.router.js'
import categoryRouter from './categorise/categories.router.js'
const initApp = (app,express)=>{
    app.use(express.json());
    
    connectDB();

    app.get('',(req, res)=>{
        return res.json({message:'Welcome...'})
      })

    app.use('/auth',authRouter)
    app.use('/category',categoryRouter)
    
      app.get('*',(req, res)=>{
        return res.json({message:'Page Not Found'})
      })

      app.use(globalErrorHandler)
}


export default initApp