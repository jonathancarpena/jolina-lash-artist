import { Router } from "express";
import {
    get_AllServices,
    get_SingleService,
    get_SingleServiceByCategory,
    post_AddService,
    delete_RemoveService,
    put_updateService,
} from "../controller/serviceController.js";
import auth from "../middleware/auth.js";


const router = Router();

//@desc     POST add service
//@route    POST /api/services/add
///@access  Public
router.post("/add", post_AddService)

//@desc     GET single service by id
//@route    GET /api/services/:_id
///@access  Public
router.get("/:_id", get_SingleService)

//@desc     GET single service by id
//@route    GET /api/services/:_id
///@access  Public
router.get("/category/:category", get_SingleServiceByCategory)

//@desc     GET all services
//@route    GET /api/services
///@access  Public
router.get("/", get_AllServices)

//@desc     DELETE remove service
//@route    DELETE /api/services?id=:_id
///@access  Admin
router.delete("/:_id", delete_RemoveService)

//@desc     PUT update service
//@route    PUT /api/services?id=:_id
///@access  Admin
router.put(
    "/:_id",
    auth,
    put_updateService
)


export default router;