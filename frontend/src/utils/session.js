import cookie from 'js-cookie';

export default function getUserId() {
  if (cookie.get('Authorization') === undefined) {
    throw new Error('Impossible, user not logged !');
  }

  return JSON.parse(atob(cookie.get('Authorization'))).user_id
}
