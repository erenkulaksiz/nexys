import type { logSuccessReturnTypes, logErrorReturnTypes } from "./log.types";

export async function log(
  logMsg: any,
  logTag?: string,
  token?: string
): Promise<logSuccessReturnTypes | logErrorReturnTypes> {
  if (!token)
    return Promise.reject({
      success: false,
      status: 401,
      message: "auth/no-token",
    });
  console.log("logmsg", logMsg, " tag:", logTag, " token:", token);

  return Promise.resolve({
    success: true,
    status: 200,
  });
}
