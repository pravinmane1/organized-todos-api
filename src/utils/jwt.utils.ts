import { JwtPayload, SignOptions, sign, verify } from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
export const signJwt = (object: Object, options?: SignOptions | undefined) => {
  return sign(object, privateKey, { ...(options || {}), algorithm: "RS256" });
};
export const verifyJwt = (token: string) => {
  try {
    const decoded = verify(token, privateKey) as JwtPayload;
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
