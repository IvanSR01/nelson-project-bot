import bot from "./src/bot/index.js";
import {
	confirmController,
  messageController,
  pollingController,
  startController,
} from "./src/controller/index.js";

bot.on("polling_error", pollingController);
bot.onText(/\/start/, startController);
bot.onText(/\/restart/, (msg) => startController(msg, true));
bot.on("message", messageController);

bot.on("message", confirmController);
