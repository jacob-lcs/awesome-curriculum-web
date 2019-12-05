import Cookies from 'js-cookie';

const TokenKey = 'CurriculumKey';
const TokenName = 'CurriculumName';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token: string) {
  // return Cookies.set(TokenKey, token)
  document.cookie = `${TokenKey}=${token}`;
  return true;
}

export function getName() {
  return Cookies.get(TokenName);
}

export function setName(name: string) {
  return Cookies.set(TokenName, name);
}

export function removeInfo() {
  Cookies.remove(TokenKey);
  return Cookies.remove(TokenName);
}
