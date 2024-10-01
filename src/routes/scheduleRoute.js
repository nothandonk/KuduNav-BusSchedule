import express from "express"
import { listschedule, liveschedule, livescheduleByRoute} from '../../controller/scheduleController.js'


const scheduleRouter = express.Router();

scheduleRouter.get("/",listschedule)
scheduleRouter.get("/liveschedule",liveschedule)
scheduleRouter.get("/liveschedulebyroute",livescheduleByRoute)

export default scheduleRouter;