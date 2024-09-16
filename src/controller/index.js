import bot from "../bot/index.js";
import { adminChatId } from "../const/index.js";

let userData = {};

export const pollingController = (error) =>
  console.log(`[polling_error] ${error.code}: ${error.message}`);

// Обработка команды /start
export const startController = (msg, isRestart) => {
  const chatId = msg.chat.id;
  userData[chatId] = {
    description: null,
    technicalTask: null,
    desiredPrice: null,
    maxPrice: null,
    desiredDeadline: null,
    maxDeadline: null,
  };
  bot.sendMessage(
    chatId,
    isRestart
      ? "Привет! Давайте начнем. Пожалуйста, введите полное описание вашего проекта:"
      : "Пожалуйста, заново введите полное описание вашего проекта:"
  );
};

export const messageController = (msg) => {
  const chatId = msg.chat.id;
  const username = msg.from.username
    ? `@${msg.from.username}`
    : `${msg.from.first_name} ${msg.from.last_name || ""}`;

  // Игнорировать команды, такие как /start
  if (msg.text && msg.text.startsWith("/")) {
    if (msg.text === "/restart") {
      // Очистить данные и начать заново
      delete userData[chatId];
      return bot.sendMessage(
        chatId,
        "Данные очищены. Начнем заново. Пожалуйста, введите полное описание вашего проекта:"
      );
    }
    return;
  }

  if (!userData[chatId]) {
    // Если данные пользователя не существуют
    return bot.sendMessage(
      chatId,
      "Что-то пошло не так, попробуйте начать заново с команды /start"
    );
  }

  if (userData[chatId].description === null) {
    userData[chatId].description = msg.text;
    bot.sendMessage(
      chatId,
      "Отлично! Теперь введите техническое задание (ТЗ):"
    );
  } else if (userData[chatId].technicalTask === null) {
    userData[chatId].technicalTask = msg.text;
    bot.sendMessage(chatId, "Введите желаемую стоимость:");
  } else if (userData[chatId].desiredPrice === null) {
    userData[chatId].desiredPrice = msg.text;
    bot.sendMessage(chatId, "Введите максимальную допустимую стоимость:");
  } else if (userData[chatId].maxPrice === null) {
    userData[chatId].maxPrice = msg.text;
    bot.sendMessage(
      chatId,
      "Введите желаемый срок выполнения проекта (в днях):"
    );
  } else if (userData[chatId].desiredDeadline === null) {
    userData[chatId].desiredDeadline = msg.text;
    bot.sendMessage(
      chatId,
      "Введите максимальный срок выполнения проекта (в днях):"
    );
  } else if (userData[chatId].maxDeadline === null) {
    userData[chatId].maxDeadline = msg.text;

    // Форматирование сообщений
    const projectData = `
*Новый проект от пользователя ${username}:*

*Описание:* ${userData[chatId].description}
*ТЗ:* ${userData[chatId].technicalTask}
*Желаемая цена:* ${userData[chatId].desiredPrice}
*Максимальная цена:* ${userData[chatId].maxPrice}
*Желаемый срок выполнения:* ${userData[chatId].desiredDeadline} дней
*Максимальный срок выполнения:* ${userData[chatId].maxDeadline} дней
    `;

    // Отправляем сообщение пользователю с подтверждением
    bot.sendMessage(
      chatId,
      `Проверьте, пожалуйста, введенные данные:\n\n${projectData}\n\nВерно? Выберите действие:`,
      {
        reply_markup: {
          keyboard: [[{ text: "Да" }], [{ text: "/restart" }]],
          one_time_keyboard: true,
          resize_keyboard: true,
        },
        parse_mode: "Markdown", // Убедитесь, что parse_mode установлен правильно
      }
    );

    // Сохраняем данные до получения подтверждения
    userData[chatId].pendingData = projectData;
  }
};

// Обработка подтверждения данных

export const confirmController = (msg) => {
  const chatId = msg.chat.id;

  // Игнорировать команды, такие как /start
  if (msg.text && msg.text.startsWith("/")) {
    return;
  }

  if (!userData[chatId] || !userData[chatId].pendingData) {
    return;
  }

  if (msg.text === "Да") {
    // Отправка собранных данных администратору
    bot.sendMessage(adminChatId, userData[chatId].pendingData, {
      parse_mode: "Markdown",
    });

    // Отправляем сообщение пользователю
    bot.sendMessage(chatId, "Ваш проект успешно отправлен. Спасибо!");

    // Очистить данные после завершения
    delete userData[chatId];
  } else if (msg.text === "/restart") {
    // Очистить данные и начать заново
    delete userData[chatId];
    bot.sendMessage(
      chatId,
      "Данные очищены. Начнем заново. Пожалуйста, введите полное описание вашего проекта:"
    );
  }
};
