import type { RequestHandler } from 'express';
import { jwtVerify } from 'jose';
import { config } from '../config';

const secret = new TextEncoder().encode(config.jwtSecret);

export interface SessionUser {
  userId: string;
  tenantId: string;
  role: string;
}

export const loadSession: RequestHandler = async (req, _res, next) => {
  const token = req.cookies?.access_token as string | undefined;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secret);
      req.session = {
        userId: payload.sub as string,
        tenantId: payload['tenantId'] as string,
        role: payload['role'] as string,
      };
      req.accessToken = token;
    } catch {
      // invalid/expired token — leave session undefined
    }
  }
  next();
};

export const requireSession: RequestHandler = (req, res, next) => {
  if (!req.session) {
    return res.redirect('/login');
  }
  next();
};

export const requireAdminSession: RequestHandler = (req, res, next) => {
  if (!req.session) return res.redirect('/login');
  if (!['platform_admin', 'tenant_admin'].includes(req.session.role)) {
    return res.status(403).send('<h1>403 Forbidden</h1>');
  }
  next();
};
