import  express  from "express"
import {getTransporterUsernames} from "../controller/users.js"
import {getRole} from "../controller/getRole.js"

import {verifyToken} from "../middleware/auth.js"

const router = express.Router()

// READ

router.get("/username", verifyToken, getTransporterUsernames)
router.get("/role/:email", verifyToken, getRole)

export default router