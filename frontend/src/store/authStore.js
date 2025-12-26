let token;

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

export const getAccessToken = () => token;

export const getAuthHeader = () => {
  if (!token) return {};
  return { Authorization: `Bearer ${token}` };
};

export const deleteAccessToken = () => {
  token = null;
};
