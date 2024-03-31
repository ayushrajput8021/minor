import {Router} from 'express';
import { createUser,getUser,updateUser,deleteUser } from '../controller/usercontroller';
import { authenticateToken } from '../middleware/authmiddleware';

const router=Router();

router.post('/',createUser);
router.get('/',authenticateToken,getUser);
router.put('/',authenticateToken,updateUser);
router.delete('/',authenticateToken,deleteUser);

export default router;

