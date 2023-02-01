import { MessageType } from "./types/types";
import randomMessages from "./helpers/randomMessages.js";

const formlElement: HTMLElement = document.getElementById(
  "message-form"
) as HTMLFormElement;
const listElement: HTMLElement = document.getElementById(
  "message-list"
) as HTMLInputElement;
const inputElement = document.getElementById("user-input") as HTMLInputElement;
const randomButtonElement = document.getElementById(
  "random-button"
) as HTMLButtonElement;

let messagesList: MessageType[] = [];

const generateRandomMessage: () => string = () => {
  const { length } = randomMessages;
  const index = Math.floor(Math.random() * length);
  return randomMessages[index];
};

const handleRandomButtonClick: () => void = () => {
  inputElement.value = generateRandomMessage();
};

const appendMessageToList: (message: string) => void = (message) => {
  const newMessage: MessageType = {
    id: Date.now(),
    message,
  };
  messagesList.unshift(newMessage);
};

const clearFormInput: () => void = () => {
  inputElement.value = "";
};

const createMessageElement: (id: number, message: string) => HTMLLIElement = (
  id,
  message
) => {
  const listElement = document.createElement("li");
  const deleteButton = document.createElement("button");
  const messageText = document.createElement("p");

  messageText.innerText = message;
  deleteButton.innerText = "x";
  deleteButton.type = "button";

  listElement.dataset.id = id.toString();
  listElement.appendChild(deleteButton);
  listElement.appendChild(messageText);
  return listElement;
};

const renderMessages: () => void = () => {
  listElement.innerHTML = "";
  messagesList.forEach(({ id, message }) => {
    const newMessage = createMessageElement(id, message);
    listElement.appendChild(newMessage);
  });
};

const removeMessageFromList: (id: string) => void = (id) => {
  messagesList = messagesList.filter((item) => item.id !== Number(id));
};

const handleRemoveMessage: (id: string) => void = (id) => {
  removeMessageFromList(id);
  renderMessages();
};

const handleFormSubmit: (e: Event) => void = (e) => {
  e.preventDefault();
  if (inputElement.value === "") return;
  appendMessageToList(inputElement.value);
  clearFormInput();
  renderMessages();
};

const init: () => void = () => {
  randomButtonElement.addEventListener("click", handleRandomButtonClick);

  formlElement.addEventListener("submit", handleFormSubmit);

  listElement.addEventListener(
    "click",
    (
      e: Event & {
        target: HTMLButtonElement;
      }
    ) => {
      if (e.target.tagName === "BUTTON") {
        const messageId = e.target.parentElement.dataset.id;
        handleRemoveMessage(messageId);
      }
    }
  );
};

init();
