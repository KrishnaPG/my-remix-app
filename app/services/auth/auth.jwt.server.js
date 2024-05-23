const jwt = require("jsonwebtoken");
const { performance } = require("perf_hooks");
const { authenticator } = require("./auth.server");

const secret =
  process.env.JWT_SECRET ||
  (Math.random() * performance.timeOrigin + performance.now()).toString(Math.ceil(Math.random() * 33) + 2);
const expiresIn = process.env.JWT_EXPIRES_IN || "24h";

export function sign(payload) {
  return jwt.sign(payload, secret, { expiresIn });
}

// verifies the token and return decoded value. Throws exception if error.
export function verify(token) {
  return jwt.verify(token, secret);
}

/** @example
 * 
    import { json } from "@remix-run/node";
    import { verifyJWT } from "../../../services/auth/auth.jwt.server";
    import { db } from "../../../utils/db.server";

    const { RPCResponse, RPCError } = require("@fict/utils/json-rpc");

    export const loader = async ({ params, request, context }) => {
      const { decoded: session, error } = verifyJWT(request);
      if (error)
        return json(RPCError(error), { status: 401 });
        
      // JWT validated successfully...

      return json(session);
    }; 
 */
export function verifyJWT(request) {
  const authHeader = request.headers.get["x-access-token"] || request.headers.get("Authorization");
  if (!authHeader) return { error: "Auth header missing", decoded: null };
  const token = authHeader.split(" ")[1];
  try {
    return { decoded: verify(token) };
  } catch (ex) {
    return { error: ex, decoded: null };
  }
}

/**
 * Same as verifyJWT except this one also allow Cookie in addition to JWT.
 * Useful for APIs that can be called from both browser and back-end. Backends can 
 * use JWT, and browser can use cookie.
 * 
 * Note: we may have to replace the authenticator.isAuthenticated() with authenticator.authenticate() method.
 * 
 */
export async function verifyJWTOrCookie(request) {
  const authHeader = request.headers.get["x-access-token"] || request.headers.get("Authorization");
  if (!authHeader) {
    const user = await authenticator.isAuthenticated(request);
    return user ? { decoded: user } : { error: "Auth header missing", decoded: null };
  }
  const token = authHeader.split(" ")[1];
  try {
    return { decoded: verify(token) };
  } catch (ex) {
    return { error: ex, decoded: null };
  }
}
