const storage = {
  getToken: () => {
    return JSON.parse(localStorage.getItem('token') as string);
  },
  setToken: (value: string) => {
    localStorage.setItem('token', JSON.stringify(value));
  },
  clearToken: () => {
    localStorage.removeItem('token');
  },
};

export default storage;