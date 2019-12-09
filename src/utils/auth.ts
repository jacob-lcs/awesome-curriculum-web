import Cookies from 'js-cookie';

const TokenKey = 'CurriculumKey';
const TokenName = 'CurriculumName';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string, options?: object) {
  // return Cookies.set(TokenKey, token)
  Cookies.set(TokenKey, token, options);
  return true;
}

export function getName() {
  return Cookies.get(TokenName);
}

export function setName(name: string, options?: object) {
  return Cookies.set(TokenName, name, options);
}

export function removeInfo() {
  Cookies.remove(TokenKey);
  return Cookies.remove(TokenName);
}
