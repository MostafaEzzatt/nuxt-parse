import { and, desc, eq } from "drizzle-orm";

import db from "~/lib/db";
import { parse } from "~/lib/db/schema";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthorized",
    }));
  }

  const query = getQuery(event);
  const type = query.type as string | undefined;

  if (!type) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Unvalid request.",
    }));
  }

  const userId = event.context.user.id;

  const all = await db.select().from(parse).where(and(eq(parse.userId, userId), eq(parse.type, type))).orderBy(desc(parse.createdAt));
  return all;
});
