import  express  from "express"
import { manufacturer, transporter} from "../controller/Message.js"

const router = express.Router()

router.post("/manufacturer", manufacturer)
router.post("/transporter", transporter)

export default router