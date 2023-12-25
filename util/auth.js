import axios from 'axios';

const API_KEY = process.env.API_KEY;

export async function authenticate(email, password, mode) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });
  return response.data;
}

export function createUser(email, password) {
  return authenticate(email, password, 'signUp');
}

export function login(email, password) {
  return authenticate(email, password, 'signInWithPassword');
}

export async function refreshTokenLogIn(refreshToken) {
  const url = `https://securetoken.googleapis.com/v1/token?key=${API_KEY}`;
  const response = await axios.post(url, {
    grant_type: 'refresh_token',
    refresh_token: refreshToken,
  });
  console.log(response.data)
  return response.data;
}
