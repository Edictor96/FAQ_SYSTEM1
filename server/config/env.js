const requiredEnv = [
  'MONGODB_URI',
  'JWT_ACCESS_SECRET',
  'JWT_REFRESH_SECRET',
  'CLIENT_URL',
];

function validateEnv() {
  const missing = requiredEnv.filter((key) => !process.env[key] || !String(process.env[key]).trim());

  if (missing.length > 0) {
    throw new Error(`Missing required environment variable(s): ${missing.join(', ')}`);
  }
}

function getAllowedOrigins() {
  const raw = process.env.CLIENT_URLS || process.env.CLIENT_URL || '';
  const origins = raw
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);

  if (origins.length === 0) {
    origins.push('http://localhost:5173');
  }

  return origins;
}

module.exports = { validateEnv, getAllowedOrigins };
