import api from '../api/axios';

// Create new answer
const createAnswer = async (answerData) => {
  const response = await api.post('/answers', answerData);
  return response.data;
};

// Get all answers for a question
const getAnswersByQuestionId = async (questionId) => {
  const response = await api.get(`/answers/${questionId}`);
  return response.data;
};

// Delete answer (Admin)
const deleteAnswer = async (id) => {
  const response = await api.delete(`/answers/${id}`);
  return response.data;
};

const upvoteAnswer = async (id) => {
  const response = await api.put(`/answers/${id}/upvote`);
  return response.data;
};

const downvoteAnswer = async (id) => {
  const response = await api.put(`/answers/${id}/downvote`);
  return response.data;
};

const acceptAnswer = async (id) => {
  const response = await api.put(`/answers/${id}/accept`);
  return response.data;
};



const answerService = {
  createAnswer,
  getAnswersByQuestionId,
  deleteAnswer,
  upvoteAnswer,
  downvoteAnswer,
  acceptAnswer
};

export default answerService;
