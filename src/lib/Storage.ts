const getToken = () => {
  return JSON.parse(localStorage.getItem('token') as string);
};

const setToken = (value: string) => {
  localStorage.setItem('token', JSON.stringify(value));
};

const clearToken = () => {
  localStorage.removeItem('token');
};

export default { getToken, setToken, clearToken } as const;
