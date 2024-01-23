import "dotenv/config"
import express from "express";
import initApp from "./Src/module/app.router.js";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

initApp(app,express);


  app.listen(4000,()=>{
    console.log(`server is running....${PORT}`);
  })