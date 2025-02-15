import { mutation, query } from "./_generated/server";

export const storeChat = mutation(async ({ db }, { userInput, chatbotResponse }) => {
  await db.insert("messages", { userInput, chatbotResponse });
});

export const getChatHistory = query(async ({ db }) => {
  return await db.query("messages").collect();
});
