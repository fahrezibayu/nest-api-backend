// src/config/mongodb.config.ts
export default {
  uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/test-backend',
};
