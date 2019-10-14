import api from '../api/';

const states = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    birthday: '',
    gender: '',
    avatar: '',
    isSignedIn: false,
};

const mutations = {
    setID(state: any, value: any) {
        state.id = value;
    },
    setFirstName(state: any, value: any) {
        state.firstName = value;
    },
    setLastName(state: any, value: any) {
        state.lastName = value;
    },
    setEmail(state: any, value: any) {
        state.email = value;
    },
    setPhone(state: any, value: any) {
        state.phone = value;
    },
    setPassword(state: any, value: any) {
        state.password = value;
    },
    setCode(state: any, value: any) {
        state.code = value;
    },
    setBirthday(state: any, value: any) {
        state.birthday = value;
    },
    setGender(state: any, value: any) {
        state.gender = value;
    },
    setIsSignedIn(state: any, value: any) {
        state.isSignedIn = value;
    },
    setAvatar(state: any, value: any) {
        state.avatar = value;
    },
};

const actions = {
    verifyAccount(
        { commit }: { commit: any },
        { field, email, phone }: { field: string, email: string, phone: string },
    ) {
        if (field === 'email') {
            const res: any = api.verifyAccount('email', email);
            if (res.ok) {
                commit('setEmail', email);
            }
            return res;
        }
        if (field === 'phone') {
            const res: any = api.verifyAccount('phone', phone);
            if (res.ok) {
                commit('setPhone', phone);
            }
            return res;
        }
    },
    GETAccount({ commit }: { commit: any }, token: any) {
        api.GETAccount(token, (res: any) => {
            if (res.status === 200) {
                const account = res.data;
                commit('setID', account.id);
                commit('setFirstName', account.firstName);
                commit('setLastName', account.lastName);
                commit('setEmail', account.email);
                commit('setPhone', account.phone);
                commit('setBirthday', account.birthday);
                commit('setGender', account.gender);
                commit('setIsSignedIn', true);
                commit('setAvatar', account.avatar);
            }
        }, (err: any) => {
            // console.log(err);
        });
    },
    async putAccount(
        { commit }: { commit: any },
        { token, field, firstName, lastName, birthday, gender, password, oldPassword, email, phone, avatar }: {
            token: any, field: string, firstName: string, lastName: string, birthday: string,
            gender: number, password: string, oldPassword: string, email: string, phone: string, avatar: string,
        }) {
        if (field === 'name') {
            const res = await api.putAccount(token, { field, firstName, lastName });
            if (res.status === 202) {
                commit('setFirstName', firstName);
                commit('setLastName', lastName);
            }
            return res;
        }
        if (field === 'birthday') {
            const res = await api.putAccount(token, { field, birthday });
            if (res.status === 202) {
                commit('setBirthday', birthday);
            }
            return res;
        }
        if (field === 'gender') {
            const res = await api.putAccount(token, { field, gender });
            if (res.status === 202) {
                commit('setGender', gender);
            }
            return res;
        }
        if (field === 'password') {
            return await api.putAccount(token, { field, password, oldPassword });
        }
        if (field === 'email') {
            const res = await api.putAccount(token, { field, email });
            if (res.status === 202) {
                commit('setEmail', email);
            }
            return res;
        }
        if (field === 'phone') {
            const res = await api.putAccount(token, { field, phone });
            if (res.status === 202) {
                commit('setPhone', phone);
            }
            return res;
        }
        if (field === 'avatar') {
            const res = await api.putAccount(token, { field, avatar });
            if (res.status === 202) {
                commit('setAvatar', avatar);
            }
            return res;
        }
    },
};

export default {
    namespaced: true,
    state: states,
    actions,
    mutations,
};
