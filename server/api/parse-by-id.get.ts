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
  const id = query.id as string | undefined;

  if (!type || !id) {
    return sendError(event, createError({
      statusCode: 400,
      statusMessage: "Unvalid request.",
    }));
  }

  const userId = event.context.user.id;

  const all = await db.select().from(parse).where(and(eq(parse.userId, userId), eq(parse.type, type), eq(parse.id, Number.parseInt(id)))).orderBy(desc(parse.createdAt)).limit(1);
  return all;
});
