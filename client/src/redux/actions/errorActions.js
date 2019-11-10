import { CLEAR_ERRORS, GET_ERRORS } from "./types";

// return errors
export const returnErrors = (msg, status, id = null) => ({
  type: GET_ERRORS,
  payload: {
    msg,
    status,
    id
  }
});

// clear errors
export const clearErrors = () => ({
  type: CLEAR_ERRORS
});
