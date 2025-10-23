import { prisma } from "@/app";
import { TryCatch } from "@/middlewares/error";

export const NewUser = TryCatch(async (req,res)=>{
    const {name,email,age} = req.body;
    const user=await prisma.user.create({
        data:{
           name,email,age
        },
    });
    res.json({
       message:"New User Created",
       user
    });
});