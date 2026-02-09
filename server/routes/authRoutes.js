import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js'
import { registerUser, loginUser, getUserInfo } from '../controllers/authControllers.js';







const authRouter = express.Router();



authRouter.post('/register', registerUser)

authRouter.post('/login', loginUser)


authRouter.post('/getuser', protect, getUserInfo)

authRouter.post(
    "/upload-image",
    upload.single("image"),
    (req, res) => {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
        }

        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

        return res.status(200).json({
            success: true,
            imageUrl,
        });
    }
);



export default authRouter;