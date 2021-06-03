import Message from "./src/message";

Message.install = (app) => {
  app.config.globalProperties.$hmessage = Message;
};

export default Message;
