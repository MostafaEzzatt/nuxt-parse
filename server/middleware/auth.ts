import { auth } from "~/lib/auth";

export default defineEventHandler(async (event) => {
  const session = await auth.api.getSession({
    headers: event.headers,
  });

  if (event.path.startsWith("/dashboard")) {
    if (!session?.user) {
      return sendRedirect(event, "/", 302);
    }
  }

  event.context.user = session?.user;

  if (event.path.startsWith("/auth")) {
    const session = await auth.api.getSession({
      headers: event.headers,
    });

    if (session?.user) {
      return sendRedirect(event, "/", 302);
    }
  }
});
