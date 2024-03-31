import {Router} from 'express';
import { login} from '../controller/authcontroller';
const router=Router();

router.post('/',login);

export default router;