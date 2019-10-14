import cookie from 'js-cookie';

function getUserId() {
  if (cookie.get('Authorization') === undefined) {
    return undefined;
  }

  return Number(JSON.parse(atob(cookie.get('Authorization'))).user_id);
}

function getUserLevel() {
  if (cookie.get('Authorization') === undefined) {
    return undefined;
  }

  return Number(JSON.parse(atob(cookie.get('Authorization'))).level);
}

export { getUserId, getUserLevel };
