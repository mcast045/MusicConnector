import axios from 'axios';

// Set global header to token if token exists in local storage 
// Otherwise delete token from headers
// Why? Send token with every request rather than choosing when to send it
const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token
    } else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken;