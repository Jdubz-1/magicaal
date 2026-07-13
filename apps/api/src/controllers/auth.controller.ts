import type { RequestHandler } from 'express';
import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { users, authSessions } from '../db/schema';
import { verifyPassword } from '../lib/password';
import { signJwt, signRefreshToken, verifyRefreshToken } from '../lib/jwt';
import * as crypto from 'node:crypto';

function sha256hex(input: string): string {
  return crypto.createHash('sha256').update(input).digest('hex');
}

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    if (!email || !password) {
      throw Object.assign(new Error('email and password are required'), { status: 400 });
    }

    const rows = await db.select().from(users).where(eq(users.email, email.toLowerCase()));
    const user = rows[0];

    if (!user || !user.active) {
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      throw Object.assign(new Error('Invalid credentials'), { status: 401 });
    }

    const accessToken = await signJwt({ sub: user.id, tenantId: user.tenantId, role: user.role });
    const refreshToken = await signRefreshToken(user.id);
    const tokenHash = sha256hex(refreshToken);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.insert(authSessions).values({
      id: crypto.randomUUID(),
      userId: user.id,
      refreshTokenHash: tokenHash,
      expiresAt,
      createdAt: new Date(),
    });

    res.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    next(err);
  }
};

export const refresh: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refresh_token as string | undefined;
    if (!refreshToken) {
      throw Object.assign(new Error('No refresh token'), { status: 401 });
    }

    let userId: string;
    try {
      userId = await verifyRefreshToken(refreshToken);
    } catch {
      // A malformed, forged, or expired token is a failed authentication —
      // not a server error.
      throw Object.assign(new Error('Invalid or expired refresh token'), { status: 401 });
    }
    const tokenHash = sha256hex(refreshToken);

    const sessions = await db
      .select()
      .from(authSessions)
      .where(eq(authSessions.refreshTokenHash, tokenHash));
    const session = sessions[0];

    if (!session || session.expiresAt < new Date()) {
      throw Object.assign(new Error('Invalid or expired session'), { status: 401 });
    }

    const userRows = await db.select().from(users).where(eq(users.id, userId));
    const user = userRows[0];
    if (!user || !user.active) {
      throw Object.assign(new Error('User not found'), { status: 401 });
    }

    const newRefreshToken = await signRefreshToken(user.id);
    const newHash = sha256hex(newRefreshToken);
    const newExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    await db.delete(authSessions).where(eq(authSessions.id, session.id));
    await db.insert(authSessions).values({
      id: crypto.randomUUID(),
      userId: user.id,
      refreshTokenHash: newHash,
      expiresAt: newExpiry,
      createdAt: new Date(),
    });

    const accessToken = await signJwt({ sub: user.id, tenantId: user.tenantId, role: user.role });

    res.cookie('refresh_token', newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refresh_token as string | undefined;
    if (refreshToken) {
      const tokenHash = sha256hex(refreshToken);
      await db.delete(authSessions).where(eq(authSessions.refreshTokenHash, tokenHash));
    }
    res.clearCookie('refresh_token');
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
