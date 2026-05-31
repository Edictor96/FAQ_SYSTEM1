const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  action: { type: String, required: true },
  performedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  targetUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  targetFaq: { type: mongoose.Schema.Types.ObjectId, ref: 'Faq' },
  details: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('AuditLog', auditLogSchema);