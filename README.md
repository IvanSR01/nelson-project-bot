# 📱 Project Data Collection Bot

Telegram bot for collecting detailed project information from users and sending it to the admin for review.

## 📖 Overview

This bot guides users through a step-by-step process to input details about their project, including:
- Project description
- Technical requirements (ТЗ)
- Desired and maximum budget
- Desired and maximum deadlines

After the information is confirmed by the user, the data is formatted and sent to the admin via a private message.

---

## 🛠️ Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/project-bot.git
cd project-bot
```
### 2. Install dependencies

Using Yarn:
```
yarn
```
Or using Npm 
```
npm install
```

### 3. Configure environment variables
Create a .env file in the root directory and add your Telegram bot token and the admin's chat ID:

```
TOKEN=your_telegram_bot_token
ADMIN_ID=your_admin_chat_id
```
- TOKEN: Your Telegram bot token from BotFather.
- ADMIN_ID: Your own Telegram chat ID to receive project details.

You can find your own chat ID by messaging @userinfobot on Telegram and checking the output.


### 4. Start the bot

Using Yarn:
```
yarn start
```
Or using Npm 
```
npm start
```

## 📋 Usage

1. **Start the bot**: The user initiates the bot by typing `/start`. The bot will then begin the project data collection process.

2. **Fill in project details**:
    - The bot will ask the user to input the following:
        - Project description
        - Technical requirements (ТЗ)
        - Desired and maximum budget
        - Desired and maximum deadlines

3. **Confirmation**: Once the user provides all the details, the bot will present a summary and ask if everything is correct. The user can confirm or restart the process.

4. **Admin notification**: After confirmation, the bot sends a formatted message with all project details to the admin's chat.

---

## 🤖 Bot Commands

- `/start`: Start the data collection process.

---

## 🧰 Technologies Used

- Node.js
- `node-telegram-bot-api`
- dotenv

---

## 📜 License

This project is licensed under the MIT License.
