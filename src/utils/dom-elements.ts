export const createMessageElement: (
  id: number,
  message: string
) => HTMLLIElement = (id, message) => {
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

export const createToastElement: (message: string) => HTMLDivElement = (
  message
) => {
  const divElement = document.createElement("div");
  const deleteButton = document.createElement("button");
  const messageText = document.createElement("p");

  messageText.innerText = message;
  deleteButton.innerText = "x";
  deleteButton.type = "button";

  divElement.appendChild(deleteButton);
  divElement.appendChild(messageText);
  return divElement;
};
