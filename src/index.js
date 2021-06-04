import Message from "./message";

Message.install = (app) => {
  app.config.globalProperties.$message = Message;
};

export default Message;
