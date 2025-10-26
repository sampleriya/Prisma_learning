import 'dotenv/config';

  import express from "express"
import helmet from "helmet"
import cors from 'cors'
import { errorMiddleware } from "@/middlewares/error.js"
import morgan from "morgan"
import dotenv from "dotenv";
import {PrismaClient} from "@prisma/client";
  import userRoutes from "@/routes/user.js"
  dotenv.config();
  //
  
  export const envMode = process.env.NODE_ENV?.trim() || 'DEVELOPMENT';
  const port = process.env.PORT || 3000;
  
export const prisma = new PrismaClient()
  const app = express();
  
      //jab bhi prisma ke schema mein change hoga
      //npx prisma generate command pkka se run krni hain                          
  
  
app.use(
  helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
  })
);
    
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin:"*",credentials:true}));
app.use(morgan('dev'))
    
  
  app.get('/', (req, res) => {
     res.send('Hello, World!');
  });
  
  // your routes here
  app.use("/api",userRoutes);
  app.get("/api/new-user", async(req, res) => {

    const user= await prisma.user.create({
        data:{
          name:"John",
          email:"random@gmail.com",
          age:23,
        },
    })
    res.status(200).json({
      success: true,
      message: "New User Created",
      user
    });
  });
  
    
  app.all(/.*/, (req, res) => {
    res.status(404).json({
      success: false,
      message: "Page not found",
    });
  });
 
  app.use(errorMiddleware);
    
  app.listen(port, () => console.log('Server is working on Port:'+port+' in '+envMode+' Mode.'));
  