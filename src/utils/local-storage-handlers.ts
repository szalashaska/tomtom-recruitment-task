import { MessageType } from "../types/types";
const MESSAGE_KEY_IN_LOCAL_STORAGE: string = "messagesList";

export const saveToLocalStorage: (list: MessageType[]) => void = (list) => {
  localStorage.setItem(MESSAGE_KEY_IN_LOCAL_STORAGE, JSON.stringify(list));
};

export const readFromLocalStorage: () => MessageType[] = () => {
  const messageList = localStorage.getItem(MESSAGE_KEY_IN_LOCAL_STORAGE);

  return messageList ? JSON.parse(messageList) : [];
};
