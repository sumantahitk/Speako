import express  from "express";
import { signup,login,logout, onboard } from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/signup",signup);
router.post("/Login",login);
router.post("/Logout",logout);//Logout is a POST because it changes authentication state(state of server side ) and must be done intentionally and securely.


router.post("/onboarding",protectRoute,onboard);
//check if user logged in or not
router.get("/me",protectRoute,(res,req)=>{
    res.statusCode(200).json({success:true,user:req.user});
})
export default router;