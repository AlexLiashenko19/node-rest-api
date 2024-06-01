const messageList = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflicted",
} as const;

export const HttpError = (
  status: keyof typeof messageList,
  message = messageList[status]
) => {
  const error: any = new Error(message);
  error.status = status;
  return error;
};
