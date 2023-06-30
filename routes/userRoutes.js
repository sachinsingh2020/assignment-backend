import express from 'express';
import { changeLike, createUser, deleteUser, getAllUsers, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/create').post(createUser);

router.route('/').get(getAllUsers);

router.route('/update').put(updateUser);

router.route('/like').put(changeLike);

router.route('/delete').put(deleteUser);



export default router;
