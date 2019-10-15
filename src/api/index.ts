import axios from 'axios';

import config from '../configs';

export default {
    async signIn(username: string, password: string) {
        const res = await axios.post(config.api.account + '/signin',
            {
                username, password,
            },
            { withCredentials: true },
        );
        return res.data;
    },
    async verifyAccount(field: string, value: string) {
        const res = await axios.get(config.api.account + '/verify/account',
            {
                params: {
                    field, value,
                },
                withCredentials: true,
            },
        );
        return res.data;
    },
    async postAuthCode(type: string, value: string, firstName: string, lastName: string) {
        if (type === 'email') {
            const res = await axios.post(config.api.account + '/authcode/email',
                {
                    firstName, lastName,
                    email: value,
                },
                { withCredentials: true },
            );
            return res.data;
        }
        if (type === 'phone') {
            const res = await axios.post(config.api.account + '/authcode/phone',
                {
                    firstName, lastName,
                    phone: value,
                },
                { withCredentials: true },
            );
            return res.data;
        }
    },
    async verifyAuthCode(type: string, value: string, code: string) {
        if (type === 'email') {
            const res = await axios.get(config.api.account + '/verify/authcode/email', {
                params: {
                    code, email: value,
                },
                withCredentials: true,
            });
            return res.data;
        }
        if (type === 'phone') {
            const res = await axios.get(config.api.account + '/verify/authcode/phone', {
                params: {
                    code, phone: value,
                },
                withCredentials: true,
            });
            return res.data;
        }
    },
    SignUp(
        { email, phone, password, firstName, lastName, birthday, gender, code }: {
            email: string, phone: string, password: string, firstName: string,
            lastName: string, birthday: string, gender: number, code: string,
        },
        callback: any, fallback: any) {
        axios.post(config.api.account + '/account', {
            email, phone, password, firstName, lastName, birthday, gender, code,
        }).then(callback).catch(fallback);
    },
    GETAccount(token: any, callback: any, fallback: any) {
        axios.get(config.api.account + '/account/' + token, {
            withCredentials: true,
        }).then(callback).catch(fallback);
    },
    async putAccount(token: string, obj: any) {
        const res = await axios.put(config.api.account + '/account/' + token + '/' + obj.field,
            { ...obj, token },
            { withCredentials: true },
        );
        return res;
    },
};
