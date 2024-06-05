import { useEffect } from 'react';
import { toast } from 'react-toastify';

export const useTokenCheck = (authProvider:any, interval:any) => {
    useEffect(() => {
        const tokenCheck = setInterval(() => {
            const authData = JSON.parse(localStorage.getItem('auth') || '{}');
            const request = new Request(`http://localhost:8080/api/auth/checkToken/${authData.token}`, {
                method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
            });
            fetch(request)
                .then(response => {
                    if (response.status === 400) {
                        authProvider.logout();
                    }
                    if (response.status === 200) {
                        return response.json();
                    }
                    return response.json().then(responseBody => ({status: response.status, body: responseBody}));
                })
                .catch(() => {
                });
        }, interval);

        return () => {
            clearInterval(tokenCheck);
        };
    }, [authProvider, interval]);
};