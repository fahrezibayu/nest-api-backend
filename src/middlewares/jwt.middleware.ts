// src/middlewares/jwt.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwt.config';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Ambil token dari header
    const token = req.headers['authorization']?.replace('Bearer ', '');

    if (token) {
      // Verifikasi token
      jwt.verify(token, jwtConfig.secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'Token tidak valid' });
        }
        // Simpan informasi user di request untuk digunakan di controller
        req['user'] = decoded;
        next();
      });
    } else {
      return res.status(401).json({ message: 'Token tidak tersedia' });
    }
  }
}
