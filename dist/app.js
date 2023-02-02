import { createMessageElement, createToastElement, } from "./utils/dom-elements.js";
import randomMessages from "./helpers/randomMessages.js";
import { saveToLocalStorage, readFromLocalStorage, } from "./utils/local-storage-handlers.js";
const formlElement = document.getElementById("message-form");
const listElement = document.getElementById("message-list");
const inputElement = document.getElementById("user-input");
const randomButtonElement = document.getElementById("random-button");
const toastContainerElement = document.getElementById("toast-container");
const TOAST_TIMEOUT = 5000;
const USE_LOCAL_STORAGE = true;
const appState = {
    messagesList: readFromLocalStorage(),
    currentToastId: null,
    timeoutId: null,
};
const generateRandomInput = () => {
    const { length } = randomMessages;
    const index = Math.floor(Math.random() * length);
    return randomMessages[index];
};
const appendMessageToList = (message) => {
    const newMessage = {
        id: Date.now(),
        message,
    };
    appState.messagesList.unshift(newMessage);
    if (USE_LOCAL_STORAGE)
        saveToLocalStorage(appState.messagesList);
};
const clearFormInput = () => {
    inputElement.value = "";
};
const renderMessages = () => {
    listElement.innerHTML = "";
    appState.messagesList.forEach(({ id, message }) => {
        const newMessage = createMessageElement(id, message);
        listElement.appendChild(newMessage);
    });
};
const removeMessageFromList = (id) => {
    appState.messagesList = appState.messagesList.filter((item) => item.id !== Number(id));
    if (USE_LOCAL_STORAGE)
        saveToLocalStorage(appState.messagesList);
};
const deleteToast = (element) => {
    element.remove();
    if (appState.timeoutId)
        clearTimeout(appState.timeoutId);
};
const assignTimeout = (element) => {
    appState.timeoutId = setTimeout(() => {
        deleteToast(element);
    }, TOAST_TIMEOUT);
};
const renderToastComponent = () => {
    // Delete previous toast
    if (toastContainerElement.childElementCount !== 0)
        deleteToast(toastContainerElement.childNodes[0]);
    // Check if there is a message to show
    if (appState.messagesList.length === 0)
        return;
    // Do not show the same message twice
    const { id, message } = appState.messagesList[0];
    if (appState.currentToastId === id)
        return;
    appState.currentToastId = id;
    const newToast = createToastElement(message);
    assignTimeout(newToast);
    toastContainerElement.appendChild(newToast);
};
const handleRandomButtonClick = () => {
    inputElement.value = generateRandomInput();
};
const handleRemoveMessage = (id) => {
    removeMessageFromList(id);
    renderMessages();
    renderToastComponent();
};
const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputElement.value === "")
        return;
    appendMessageToList(inputElement.value);
    clearFormInput();
    renderMessages();
    renderToastComponent();
};
const handleClickOnMessage = (e) => {
    if (e.target.tagName === "BUTTON") {
        const messageId = e.target.parentElement.dataset.id;
        handleRemoveMessage(messageId);
    }
};
const handleClickOnToast = (e) => {
    if (e.target.tagName === "BUTTON")
        deleteToast(e.target.parentElement);
};
const init = () => {
    renderMessages();
    randomButtonElement.addEventListener("click", handleRandomButtonClick);
    formlElement.addEventListener("submit", handleFormSubmit);
    listElement.addEventListener("click", handleClickOnMessage);
    toastContainerElement.addEventListener("click", handleClickOnToast);
};
init();
