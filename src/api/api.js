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
    SignUp({ email, phone, password, firstName, lastName, birthday, gender, code }, callback, fallback) {
        axios.put(cf.api.account + "/account", {
            email, phone, password, firstName, lastName, birthday, gender, code
        }).then(callback).catch(fallback);
    },
    GETAccount(token, callback, fallback) {
        axios.get(cf.api.account + "/account/" + token, {
            withCredentials: true
        }).then(callback).catch(fallback);
    },
    async update(token, obj) {
        const res = await axios.post(cf.api.account + "/update",
            { ...obj, token },
            { withCredentials: true }
        );
        return res.data
    }
}