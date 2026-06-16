const { Router } = require('express');
const rateLimit = require('express-rate-limit');
const authController = require('../controllers/authController');
const { authenticateUser } = require('../middleware/auth');
const {
  validate,
  registerSchema,
  loginSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} = require('../middleware/validate');

const router = Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { success: false, message: 'Too many attempts. Try again after 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

const forgotLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 3,
  message: { success: false, message: 'Too many reset requests. Try again after an hour.' },
  standardHeaders: true,
  legacyHeaders: false,
});

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', authLimiter, validate(loginSchema), authController.login);
router.post('/google', authController.googleAuth);
router.post('/refresh', authController.refreshToken);
router.post('/logout', authenticateUser, authController.logout);
router.put('/change-password', authenticateUser, authController.changePassword);
router.post('/forgot-password', forgotLimiter, validate(forgotPasswordSchema), authController.forgotPassword);
router.put('/reset-password/:token', validate(resetPasswordSchema), authController.resetPassword);
router.get('/me', authenticateUser, authController.getMe);
router.put('/profile', authenticateUser, authController.updateProfile);

module.exports = router;
