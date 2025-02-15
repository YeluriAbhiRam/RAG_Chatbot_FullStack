import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    username: v.string(),
  }).index("by_username", ["username"]),

  messages: defineTable({
    userInput: v.string(),
    chatbotResponse: v.string(),
  }),
});
