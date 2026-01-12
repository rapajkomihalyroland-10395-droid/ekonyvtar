let token;
let user;
let isAdmin = false;

export const setAccessToken = (newToken) => {
  if (!newToken) {
    token = null;
    return;
  }

  if (typeof newToken !== "string") {
    token = null;
    return;
  }

  token = newToken.replace(/^Bearer\s+/i, "").trim();
};

export const getAuthHeader = () => {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const deleteAccessToken = () => {
  token = null;
};

export const SetUser = (newUser) => {
  if (!newUser) {
    user = null;
    isAdmin = false;
    return;
  }
  user = newUser;
  
  if (newUser.admin !== undefined) {
    isAdmin = newUser.admin;
  }
};

export const GetUser = () => {
  return user;
};

export const GetIsAdmin = () => {
  return isAdmin;
};

export const SetIsAdmin = (value) => {
  isAdmin = value;
};

export const DeleteUser = () => {
  user = null;
  isAdmin = false;
};
