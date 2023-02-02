const MESSAGE_KEY_IN_LOCAL_STORAGE = "messagesList";
export const saveToLocalStorage = (list) => {
    localStorage.setItem(MESSAGE_KEY_IN_LOCAL_STORAGE, JSON.stringify(list));
};
export const readFromLocalStorage = () => {
    const messageList = localStorage.getItem(MESSAGE_KEY_IN_LOCAL_STORAGE);
    return messageList ? JSON.parse(messageList) : [];
};
