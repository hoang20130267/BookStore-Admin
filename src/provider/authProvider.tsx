import { AuthProvider } from 'react-admin';

export const authProvider: AuthProvider = {
    login: ({ username, password }) =>  {
        const request = new Request(`${process.env.REACT_APP_ENDPOINT_API}/auth/signin`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(auth => {
                localStorage.setItem('auth', JSON.stringify(auth));
            })
            .catch(() => {
                throw new Error('Sai tài khoản hoặc mật khẩu')
            });
    },
    logout: () => {
        localStorage.removeItem('auth');
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('auth');
            // return Promise.reject({ message: false });
            return Promise.reject({ message: 'Unauthorized user!' });
        }
        // other error code (404, 500, etc): no need to log out
        return Promise.resolve();
    },
    checkAuth: () => {
        const authData = localStorage.getItem('auth');
        if (authData) {
            const { roles } = JSON.parse(authData);
            if (roles && roles.includes('ADMIN')) {
                return Promise.resolve();
            } else if(roles && roles.includes('MODERATOR')) {
                return Promise.resolve();
            } else if(roles && roles.includes('USER')) {
                return Promise.reject({ message: 'Tài khoản của bạn không có quyền admin' });
            }
        }
        return Promise.reject({ message: 'Hết phiên đăng nhập' });
    },
    getIdentity: () => {
        const authData = localStorage.getItem('auth');
        try {
            if (authData !== null) {
                const { id, username, image } = JSON.parse(authData);
                const fullName = username;
                const avatar = image;
                return Promise.resolve({ id, fullName, avatar });
            } else {
                return Promise.reject({ message: 'login.required' });
            }
        } catch (error) {
            return Promise.reject(error);
        }
    },
    handleCallback: () => Promise.resolve(/* ... */),
    // authorization
    getPermissions: () => Promise.resolve(/* ... */),
};