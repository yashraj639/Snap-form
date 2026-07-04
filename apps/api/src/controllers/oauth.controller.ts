import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth";
import { config } from "../lib/env";
import { asyncHandler } from "../utils/async-handler";

export const oauthCallback = asyncHandler(async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  const username =
    typeof session.user.username === "string"
      ? session.user.username.trim()
      : "";

  // Honor the callbackUrl query param threaded from the middleware redirect,
  // falling back to the existing onboarding/dashboard routing.
  const callbackUrl =
    typeof req.query.callbackUrl === "string" ? req.query.callbackUrl : "";

  let destination: string;
  if (username.length === 0) {
    destination = `${config.frontend.url}/onboarding`;
  } else if (callbackUrl) {
    // Only allow relative paths to prevent open-redirect attacks
    destination = callbackUrl.startsWith("/")
      ? `${config.frontend.url}${callbackUrl}`
      : `${config.frontend.url}/dashboard`;
  } else {
    destination = `${config.frontend.url}/dashboard`;
  }

  res.redirect(destination);
});
