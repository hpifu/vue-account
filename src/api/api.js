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
    async verifyAccount(field, value) {
        const res = await axios.get(cf.api.account + "/verify/account",
            {
                params: {
                    field, value
                },
                withCredentials: true
            }
        );
        return res.data
    },
    async postAuthCode(type, value, firstName, lastName) {
        if (type == "email") {
            const res = await axios.post(cf.api.account + "/authcode/email",
                {
                    firstName, lastName,
                    email: value,
                },
                { withCredentials: true }
            );
            return res.data
        }
        if (type == "phone") {
            const res = await axios.post(cf.api.account + "/authcode/phone",
                {
                    firstName, lastName,
                    phone: value,
                },
                { withCredentials: true }
            );
            return res.data
        }
    },
    async verifyAuthCode(type, value, code) {
        if (type == "email") {
            const res = await axios.get(cf.api.account + "/verify/authcode/email", {
                params: {
                    code, email: value,
                },
                withCredentials: true
            });
            return res.data
        }
        if (type == "phone") {
            const res = await axios.get(cf.api.account + "/verify/authcode/phone", {
                params: {
                    code, phone: value,
                },
                withCredentials: true
            });
            return res.data
        }
    },
    SignUp({ email, phone, password, firstName, lastName, birthday, gender, code }, callback, fallback) {
        axios.post(cf.api.account + "/account", {
            email, phone, password, firstName, lastName, birthday, gender, code
        }).then(callback).catch(fallback);
    },
    GETAccount(token, callback, fallback) {
        axios.get(cf.api.account + "/account/" + token, {
            withCredentials: true
        }).then(callback).catch(fallback);
    },
    async putAccount(token, obj) {
        const res = await axios.put(cf.api.account + "/account/" + token + "/" + obj.field,
            { ...obj, token },
            { withCredentials: true }
        );
        return res
    }
}