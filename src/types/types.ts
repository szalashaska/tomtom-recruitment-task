export type MessageType = {
  id: number;
  message: string;
};

export type AppStateType = {
  messagesList: MessageType[];
  currentToastId: number | null;
  timeoutId: number | null;
};
