import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";
import { users, sessions } from "./db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "crypto";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "armorer-dev-secret-change-in-production"
);
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface SessionUser {
  id: number;
  name: string;
  email: string;
  image: string | null;
}

async function createToken(payload: Record<string, unknown>): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(SECRET);
}

async function verifyToken(token: string): Promise<Record<string, unknown> | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as Record<string, unknown>;
  } catch {
    return null;
  }
}

export async function register(
  name: string,
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const [existing] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing) {
    return { success: false, error: "Email already registered" };
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const [result] = await db
    .insert(users)
    .values({ name, email, passwordHash })
    .returning({ id: users.id });

  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION).toISOString();
  await db.insert(sessions).values({ id: sessionId, userId: result.id, expiresAt });

  const token = await createToken({ sessionId, userId: result.id });
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });

  return { success: true };
}

export async function login(
  email: string,
  password: string
): Promise<{ success: boolean; error?: string }> {
  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user) {
    return { success: false, error: "Invalid email or password" };
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return { success: false, error: "Invalid email or password" };
  }

  const sessionId = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION).toISOString();
  await db.insert(sessions).values({ id: sessionId, userId: user.id, expiresAt });

  const token = await createToken({ sessionId, userId: user.id });
  const cookieStore = await cookies();
  cookieStore.set("auth-token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });

  return { success: true };
}

export async function logout(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;
  if (token) {
    const payload = await verifyToken(token);
    if (payload?.sessionId) {
      await db
        .delete(sessions)
        .where(eq(sessions.id, payload.sessionId as string));
    }
  }
  cookieStore.delete("auth-token");
}

export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) return null;

    const payload = await verifyToken(token);
    if (!payload?.sessionId) return null;

    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, payload.sessionId as string))
      .limit(1);

    if (!session || new Date(session.expiresAt) < new Date()) {
      if (session) {
        await db.delete(sessions).where(eq(sessions.id, session.id));
      }
      return null;
    }

    const [user] = await db.select().from(users).where(eq(users.id, session.userId)).limit(1);
    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
    };
  } catch {
    return null;
  }
}
