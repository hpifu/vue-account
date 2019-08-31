const axios = require("axios");
import config from '../assets/js/config';

let cf = config[process.env.NODE_ENV];

export default {
    async signIn(username, password) {
        const res = await axios.post(cf.api.account + "/signin",
            {
                username, password
            },
            { withCredentials: true }
        )
        return res.data
    },
    async verify(field, value) {
        const res = await axios.get(cf.api.account + "/verify",
            {
                params: {
                    field, value
                },
                withCredentials: true
            }
        );
        return res.data
    },
    async genAuthCode(type, value, firstName, lastName) {
        if (type == "email") {
            const res = await axios.post(cf.api.account + "/genauthcode",
                {
                    type, firstName, lastName,
                    email: value,
                },
                { withCredentials: true }
            );
            return res.data
        }
        if (type == "phone") {
            const res = await axios.post(cf.api.account + "/genauthcode",
                {
                    type, firstName, lastName,
                    phone: value,
                },
                { withCredentials: true }
            );
            return res.data
        }
    },
    async verifyAuthCode(type, value, code) {
        if (type == "email") {
            const res = await axios.get(cf.api.account + "/verifyauthcode", {
                params: {
                    type, code, email: value,
                },
                withCredentials: true
            });
            return res.data
        }
        if (type == "phone") {
            const res = await axios.get(cf.api.account + "/verifyauthcode", {
                params: {
                    type, code, phone: value,
                },
                withCredentials: true
            });
            return res.data
        }
    },
    async signUp(email, phone, password, firstName, lastName, birthday, gender, code) {
        const res = await axios.post(cf.api.account + "/signup", {
            email, phone, password, firstName, lastName, birthday, gender, code
        });
        return res.data
    },
    async getAccount(token) {
        const res = await axios.get(cf.api.account + "/getaccount", {
            params: { token },
            withCredentials: true
        });
        return res.data
    },
    async update(token, obj) {
        const res = await axios.post(cf.api.account + "/update",
            { ...obj, token },
            { withCredentials: true }
        );
        return res.data
    }
}