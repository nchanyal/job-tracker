const storeTokens = (tokens) => {
    localStorage.setItem('refreshToken', tokens['refresh']);
    localStorage.setItem('accessToken', tokens['access']);
};

export default storeTokens;