import { SignJWT, jwtVerify } from 'jose';
import { config } from '../config';

const secret = new TextEncoder().encode(config.jwtSecret);

export interface JwtPayload {
  sub: string;
  tenantId: string;
  role: string;
}

export async function signJwt(payload: JwtPayload): Promise<string> {
  return new SignJWT({ tenantId: payload.tenantId, role: payload.role })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(payload.sub)
    .setIssuedAt()
    .setExpirationTime('15m')
    .sign(secret);
}

export async function signRefreshToken(userId: string): Promise<string> {
  return new SignJWT({ type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setSubject(userId)
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function verifyJwt(token: string): Promise<JwtPayload> {
  const { payload } = await jwtVerify(token, secret);
  return {
    sub: payload.sub as string,
    tenantId: payload['tenantId'] as string,
    role: payload['role'] as string,
  };
}

export async function verifyRefreshToken(token: string): Promise<string> {
  const { payload } = await jwtVerify(token, secret);
  if (payload['type'] !== 'refresh') {
    throw new Error('Not a refresh token');
  }
  return payload.sub as string;
}
