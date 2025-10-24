import { prisma } from "@/app.js";
import { TryCatch } from "@/middlewares/error.js";
export const NewUser = TryCatch(async (req, res) => {
    const { name, email, age } = req.body;
    const user = await prisma.user.create({
        data: {
            name, email, age
        },
    });
    res.json({
        message: "New User Created",
        user
    });
});
export const UpdateUser = TryCatch(async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;
    const user = await prisma.user.update({
        where: {
            id
        }, data: {
            name,
            email,
            age
        },
    });
    res.json({
        message: "updated User Created",
        user
    });
});
export const newOrUpdateUser = TryCatch(async (req, res) => {
    // const {id}=req.params;
    const { name, email, age } = req.body;
    const user = await prisma.user.upsert({
        where: {
            email
        },
        update: {
            name,
            email,
            age
        },
        create: {
            name,
            email,
            age
        },
    });
    res.json({
        message: "updated User Created",
        user
    });
});
export const DeleteUser = TryCatch(async (req, res) => {
    const { id } = req.params;
    const user = await prisma.user.delete({
        where: {
            id
        },
    });
    res.json({
        message: "User Deleted",
        user
    });
});
export const getAllUsers = TryCatch(async (req, res) => {
    // const {id}=req.params;
    const users = await prisma.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            age: true
        }
    });
    res.json({
        message: "All users",
        users
    });
});
export const getUserDetail = TryCatch(async (req, res) => {
    // const {id}=req.params;
    // const email=req.params.id;
    const age = req.params.id;
    // const user=await prisma.user.findUnique({
    //for age i m using findMany otherwise find unique is used because multiper user hav same 
    // age there is no uniqueness 
    const user = await prisma.user.findMany({
        where: {
            OR: [
                {
                    age: {
                        gt: parseInt(age),
                        lte: parseInt(age) + 10,
                    },
                }, {
                    email: {
                        contains: "@gmail.com"
                    }
                }
            ]
        },
        //yaa toh hum yahan pr select use kr skte hain yaa include
        select: {
            name: true,
            email: true,
            notificationMethods: {
                select: {
                    email: true,
                    phone: true,
                },
            },
            blogs: {
                select: {
                    title: true,
                },
            },
        },
        //   include:{
        //     notificationMethods:{
        //         select:{
        //            email:true,
        //            phone:true,
        //         },
        //     },
        //     blogs:{
        //         select:{
        //           title:true,
        //         },
        //     },
        //   }
    });
    res.json({
        message: "User Found with this id",
        user
    });
});
export const getUserBlogs = TryCatch(async (req, res) => {
    const blogs = await prisma.blog.findMany({
        where: {
        // User:{
        //     notificationMethods:{
        //         phone:true,
        //     },
        // },
        },
        include: {
            User: true,
        }
    });
    res.json({
        message: "Blogs Find",
        blogs
    });
});
export const checkUser = TryCatch(async (req, res) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 2;
    const offset = (page - 1) * limit;
    const blogs = await prisma.user.findMany({
        skip: offset,
        take: limit,
        select: {
            email: true,
            name: true,
            createdAt: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    });
    res.json({
        message: "Blogs Find",
        blogs
    });
});
