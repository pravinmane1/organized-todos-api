import { SignOptions, sign, verify } from "jsonwebtoken";
import config from "config";

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");
export const signJwt = (object: Object, options?: SignOptions | undefined) => {
  return sign(object, privateKey, { ...(options || {}), algorithm: "RS256" });
};
export const verifyJwt = (token: string) => {
  try {
    const decoded = verify(token, privateKey);
    console.log("jwt verify return is ", decoded);
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
