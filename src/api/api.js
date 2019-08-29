const axios = require("axios");
import config from '../assets/js/config';

export default {
    async signIn(username, password) {
        const res = await axios.post(config.api.account + "/signin",
            {
                username, password
            },
            { withCredentials: true }
        )
        return res.data
    },
    async verify(field, value) {
        const res = await axios.get(config.api.account + "/verify",
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
            const res = await axios.post(config.api.account + "/genauthcode",
                {
                    type, firstName, lastName,
                    email: value,
                },
                { withCredentials: true }
            );
            return res.data
        }
        if (type == "phone") {
            const res = await axios.post(config.api.account + "/genauthcode",
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
            const res = await axios.get(config.api.account + "/verifyauthcode", {
                params: {
                    type, code, email: value,
                },
                withCredentials: true
            });
            return res.data
        }
        if (type == "phone") {
            const res = await axios.get(config.api.account + "/verifyauthcode", {
                params: {
                    type, code, phone: value,
                },
                withCredentials: true
            });
            return res.data
        }
    },
    async signUp(email, phone, password, firstName, lastName, birthday, gender, code) {
        const res = await axios.post(config.api.account + "/signup", {
            email, phone, password, firstName, lastName, birthday, gender, code
        });
        return res.data
    },
    async getAccount(token) {
        const res = await axios.get(config.api.account + "/getaccount", {
            params: { token },
            withCredentials: true
        });
        return res.data
    },
    async update(token, obj) {
        const res = await axios.post(config.api.account + "/update",
            { ...obj, token },
            { withCredentials: true }
        );
        return res.data
    }
}