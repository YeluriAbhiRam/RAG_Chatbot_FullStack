import { mutation, query } from "./_generated/server";

export const createUser = mutation(async ({ db }, { username }) => {
  const existingUser = await db
    .query("users")
    .withIndex("by_username", (q) => q.eq("username", username))
    .unique();

  if (!existingUser) {
    await db.insert("users", { username });
  }
});

export const getUsers = query(async ({ db }) => {
  return await db.query("users").collect();
});
