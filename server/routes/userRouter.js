import { Router } from "express"
import { postLogin,postRegistration } from '../controller/userController'

const router = Router()

router.post('/register',postRegistration)
router.post('/login',postLogin)