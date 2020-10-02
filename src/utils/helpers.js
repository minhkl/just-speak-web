const API_HOST = process.env.REACT_APP_API_HOST;

export const apiUrl = (path) => `${API_HOST}${path}`;
