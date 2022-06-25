import { createChatBotMessage } from "react-chatbot-kit";

const botName = "Shazza";

const config = {
  initialMessages: [createChatBotMessage(`Hi! I'm ${botName}`)],
  botName: botName,
  customStyles: {
    botMessageBox: { backgroundColor: "#1F74D1" },
    chatButton: { backgroundColor: "#067551" },
  },
};

export default config;
