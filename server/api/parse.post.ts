import db from "~/lib/db";

import { parse, parseInsertSchema } from "../../lib/db/schema/parse";

export default defineEventHandler(async (event) => {
  if (!event.context.user) {
    return sendError(event, createError({
      statusCode: 401,
      statusMessage: "Unauthroized",

    }));
  }
  const result = await readValidatedBody(event, parseInsertSchema.safeParse);

  if (!result.success) {
    const statusMessage = result.error.issues.map(issue => `${issue.path.join("")}: ${issue.message}`).join("; ");
    const data = result.error.issues.reduce((errors, issue) => {
      errors[issue.path.join("")] = issue.message;
      return errors;
    }, {} as Record<string, string>);
    return sendError(event, createError({
      statusCode: 422,
      statusMessage,
      data,
    }));
  }

  const [created] = await db.insert(parse).values({
    ...result.data,
    userId: event.context.user.id,
  }).returning();
  return created;
});
