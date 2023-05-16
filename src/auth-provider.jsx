const localStorageKey = "__auth_provider_token__";

async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(user) {
  window.localStorage.setItem(localStorageKey, "token");
  return {
    token: "token",
    user,
  };
}

function login({ username }) {
  return handleUserResponse(username);
}

async function logout() {
  window.localStorage.removeItem(localStorageKey);
}

export { getToken, login, logout, localStorageKey };
