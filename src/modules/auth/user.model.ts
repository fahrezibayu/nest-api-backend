// src/modules/auth/user.model.ts
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
});

export interface User extends mongoose.Document {
  username: string;
  password: string;
}
