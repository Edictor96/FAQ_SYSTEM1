import api from '../api/axios';

const adminService = {
  getStats: async () => {
    const { data } = await api.get('/admin/stats');
    return data;
  },

  getUsers: async () => {
    const { data } = await api.get('/admin/users');
    return data;
  },

  promoteUser: async (id) => {
    const { data } = await api.patch(`/admin/users/${id}/promote`);
    return data;
  },

  promoteToSuperAdmin: async (id) => {
    const { data } = await api.patch(`/admin/users/${id}/promote-super`);
    return data;
  },

  demoteAdmin: async (id) => {
    const { data } = await api.patch(`/admin/users/${id}/demote`);
    return data;
  },

  deleteUser: async (id) => {
    const { data } = await api.delete(`/admin/users/${id}`);
    return data;
  },

  getAllFaqs: async () => {
    const { data } = await api.get('/admin/faqs');
    return data;
  },

  createFaq: async (payload) => {
    const { data } = await api.post('/admin/faqs', payload);
    return data;
  },

  updateFaq: async (id, payload) => {
    const { data } = await api.patch(`/admin/faqs/${id}`, payload);
    return data;
  },

  deleteFaq: async (id) => {
    const { data } = await api.delete(`/admin/faqs/${id}`);
    return data;
  },

  getAuditLogs: async () => {
    const { data } = await api.get('/admin/audit-logs');
    return data;
  },
};

export default adminService;