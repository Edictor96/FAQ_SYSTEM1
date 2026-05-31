const express = require('express');
const router = express.Router();
const { createAnswer, getAnswersByQuestionId, deleteAnswer, upvoteAnswer, downvoteAnswer, acceptAnswer } = require('../controllers/answerController');
const { authenticateUser: protect, authorizeRoles } = require('../middleware/auth');
const admin = authorizeRoles('admin', 'super_admin');

router.post('/', protect, createAnswer);
router.get('/:questionId', protect, getAnswersByQuestionId);
router.delete('/:id', protect, admin, deleteAnswer);
router.put('/:id/upvote', protect, upvoteAnswer);
router.put('/:id/downvote', protect, downvoteAnswer);
router.put('/:id/accept', protect, admin, acceptAnswer);

module.exports = router;