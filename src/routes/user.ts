import { NewUser } from '@/controllers/user';
import {Router} from 'express';

const app = Router();
app.post('/new-user',NewUser);
export default app;