import { isEmpty, lowerCase, trim, upperFirst } from 'lodash';

export function validateEmptyString(string) {
  return isEmpty(trim(string));
}

export function validateEmail(email) {
  console.log("email: ", email);
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function fieldNameToSentence(fieldName) {
  return upperFirst(lowerCase(fieldName));
}
