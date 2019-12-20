import Cookies from 'js-cookie';

const TokenKey = 'CurriculumKey';
const TokenEmail = 'CurriculumEmail';
const TokenName = 'CurriculumName';
const TokenAvatar = 'CurriculumAvatar';

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

export function getEmail() {
  return Cookies.get(TokenEmail);
}

export function setEmail(name: string, options?: object) {
  return Cookies.set(TokenEmail, name, options);
}

export function getAvatar() {
  return Cookies.get(TokenAvatar);
}

export function setAvatar(name: string, options?: object) {
  return Cookies.set(TokenAvatar, name, options);
}

export function removeInfo() {
  Cookies.remove(TokenKey);
  Cookies.remove(TokenEmail);
  Cookies.remove(TokenAvatar);
  return Cookies.remove(TokenName);
}
