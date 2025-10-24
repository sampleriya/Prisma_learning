import { checkUser, getAllUsers, getUserBlogs, getUserDetail, newOrUpdateUser } from '@/controllers/user.js';
import { Router } from 'express';
const app = Router();
app.post('/new-user', newOrUpdateUser);
app.get("/all", getAllUsers);
app.get("/user/:id", getUserDetail);
app.get("/blogs", getUserBlogs);
app.get("/userc", checkUser);
export default app;
