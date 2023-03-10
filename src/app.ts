import { AppStateType, MessageType } from "./types/types";
import {
  createMessageElement,
  createToastElement,
} from "./utils/dom-elements.js";
import randomMessages from "./helpers/randomMessages.js";
import {
  saveToLocalStorage,
  readFromLocalStorage,
} from "./utils/local-storage-handlers.js";

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
const toastContainerElement = document.getElementById(
  "toast-container"
) as HTMLDivElement;

const TOAST_TIMEOUT: number = 5000;
const USE_LOCAL_STORAGE: boolean = true;

const appState: AppStateType = {
  messagesList: readFromLocalStorage(),
  currentToastId: null,
  timeoutId: null,
};

const generateRandomInput: () => string = () => {
  const { length } = randomMessages;
  const index = Math.floor(Math.random() * length);
  return randomMessages[index];
};

const appendMessageToList: (message: string) => void = (message) => {
  const newMessage: MessageType = {
    id: Date.now(),
    message,
  };
  appState.messagesList.unshift(newMessage);
  if (USE_LOCAL_STORAGE) saveToLocalStorage(appState.messagesList);
};

const clearFormInput: () => void = () => {
  inputElement.value = "";
};

const renderMessages: () => void = () => {
  listElement.innerHTML = "";
  appState.messagesList.forEach(({ id, message }) => {
    const newMessage = createMessageElement(id, message);
    listElement.appendChild(newMessage);
  });
};

const removeMessageFromList: (id: string) => void = (id) => {
  appState.messagesList = appState.messagesList.filter(
    (item) => item.id !== Number(id)
  );
  if (USE_LOCAL_STORAGE) saveToLocalStorage(appState.messagesList);
};

const deleteToast: (element: HTMLDivElement) => void = (element) => {
  element.remove();
  if (appState.timeoutId) clearTimeout(appState.timeoutId);
};

const handleDeleteToast: (element: HTMLDivElement) => void = (element) => {
  element.addEventListener("transitionend", () => {
    deleteToast(element);
  });
  element.classList.add("transparent");
};

const assignTimeout: (element: HTMLDivElement) => void = (element) => {
  appState.timeoutId = setTimeout(() => {
    handleDeleteToast(element);
  }, TOAST_TIMEOUT);
};

const renderToastComponent: () => void = () => {
  // Delete previous toast
  if (toastContainerElement.childElementCount !== 0)
    deleteToast(toastContainerElement.childNodes[0] as HTMLDivElement);

  // Check if there is a message to show
  if (appState.messagesList.length === 0) return;

  // Do not show the same message twice
  const { id, message } = appState.messagesList[0];
  if (appState.currentToastId === id) return;

  appState.currentToastId = id;
  const newToast = createToastElement(message);
  assignTimeout(newToast);
  toastContainerElement.appendChild(newToast);
};

const handleRandomButtonClick: () => void = () => {
  inputElement.value = generateRandomInput();
};

const handleRemoveMessage: (id: string) => void = (id) => {
  removeMessageFromList(id);
  renderMessages();
  renderToastComponent();
};

const handleFormSubmit: (e: Event) => void = (e) => {
  e.preventDefault();
  if (inputElement.value === "") return;
  appendMessageToList(inputElement.value);
  clearFormInput();
  renderMessages();
  renderToastComponent();
};

const handleClickOnMessage: (
  e: Event & {
    target: HTMLButtonElement;
  }
) => void = (e) => {
  if (e.target.tagName === "BUTTON") {
    const messageId = e.target.parentElement.dataset.id;
    handleRemoveMessage(messageId);
  }
};

const handleClickOnToast: (
  e: Event & {
    target: HTMLButtonElement;
  }
) => void = (e) => {
  if (e.target.tagName === "BUTTON")
    handleDeleteToast(e.target.parentElement as HTMLDivElement);
};

const init: () => void = () => {
  renderMessages();
  randomButtonElement.addEventListener("click", handleRandomButtonClick);
  formlElement.addEventListener("submit", handleFormSubmit);
  listElement.addEventListener("click", handleClickOnMessage);
  toastContainerElement.addEventListener("click", handleClickOnToast);
};

init();
