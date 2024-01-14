export const handleFailure = (error) => {
  let message = "";
  if (error.response) {
    message = error.response.data;
  } else if (error.request) {
    message = error.request;
  } else {
    message = error.message || error.toString();
  }
  return message;
};
