import randomMessages from "./helpers/randomMessages.js";
const formlElement = document.getElementById("message-form");
const listElement = document.getElementById("message-list");
const inputElement = document.getElementById("user-input");
const randomButtonElement = document.getElementById("random-button");
let messagesList = [];
const generateRandomMessage = () => {
    const { length } = randomMessages;
    const index = Math.floor(Math.random() * length);
    return randomMessages[index];
};
const handleRandomButtonClick = () => {
    inputElement.value = generateRandomMessage();
};
const appendMessageToList = (message) => {
    const newMessage = {
        id: Date.now(),
        message,
    };
    messagesList.unshift(newMessage);
};
const clearFormInput = () => {
    inputElement.value = "";
};
const createMessageElement = (id, message) => {
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
const renderMessages = () => {
    listElement.innerHTML = "";
    messagesList.forEach(({ id, message }) => {
        const newMessage = createMessageElement(id, message);
        listElement.appendChild(newMessage);
    });
};
const removeMessageFromList = (id) => {
    messagesList = messagesList.filter((item) => item.id !== Number(id));
};
const handleRemoveMessage = (id) => {
    removeMessageFromList(id);
    renderMessages();
};
const handleFormSubmit = (e) => {
    e.preventDefault();
    if (inputElement.value === "")
        return;
    appendMessageToList(inputElement.value);
    clearFormInput();
    renderMessages();
};
const init = () => {
    randomButtonElement.addEventListener("click", handleRandomButtonClick);
    formlElement.addEventListener("submit", handleFormSubmit);
    listElement.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const messageId = e.target.parentElement.dataset.id;
            handleRemoveMessage(messageId);
        }
    });
};
init();
