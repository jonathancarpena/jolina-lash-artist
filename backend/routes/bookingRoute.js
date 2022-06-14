import { Router } from "express";
import {
    get_AllBookings,
    get_SingleBooking,
    post_AddBooking,
    delete_RemoveBooking,
    put_updateBooking,
} from "../controller/bookingsController.js";
import auth from "../middleware/auth.js";


const router = Router();

//@desc     POST add booking
//@route    POST /api/bookings/add
///@access  Public
router.post("/add", post_AddBooking)

//@desc     GET single booking by id
//@route    GET /api/bookings/:_id
///@access  Public
router.get("/:_id", get_SingleBooking)

//@desc     GET all bookings
//@route    GET /api/bookings
///@access  Admin
router.get("/", auth, get_AllBookings)

//@desc     DELETE remove booking
//@route    DELETE /api/bookings?id=:_id
///@access  Admin
router.delete("/:_id", auth, delete_RemoveBooking)

//@desc     PUT update booking
//@route    PUT /api/bookings?id=:_id
///@access  Admin
router.put("/:_id", auth, put_updateBooking)


export default router;