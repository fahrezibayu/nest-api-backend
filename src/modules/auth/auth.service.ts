// src/modules/auth/auth.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import jwtConfig from '../../config/jwt.config';

@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async register(user: any) {
    const { username, password } = user;

    // Cek apakah username sudah digunakan
    const existingUser = await this.userModel.findOne({ username });
    if (existingUser) {
      throw new ConflictException('Username sudah terdaftar');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Buat user baru
    const newUser = new this.userModel({ username, password: hashedPassword });
    await newUser.save();

    // Buat dan kirim token JWT
    const token = this.generateJwtToken(newUser.id);
    return { token };
  }

  async login(credentials: any) {
    const { username, password } = credentials;

    // Cari user berdasarkan username
    const user = await this.userModel.findOne({ username });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    // Bandingkan password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Password tidak valid');
    }

    // Buat dan kirim token JWT
    const token = this.generateJwtToken(user.id);
    return { token };
  }

  private generateJwtToken(userId: string): string {
    return jwt.sign({ userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  }
}
