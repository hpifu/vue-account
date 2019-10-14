import api from '../api';

const states = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    code: '',
    birthday: '',
    gender: '',
};

const mutations = {
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
};

const actions = {
    verifyAccount({ state }: { state: any }, type: string) {
        if (type === 'email') {
            return api.verifyAccount('email', state.email);
        }
        if (type === 'phone') {
            return api.verifyAccount('phone', state.phone);
        }
    },
    postAuthCode({ state }: { state: any }, type: string) {
        if (type === 'email') {
            return api.postAuthCode(type, state.email, state.firstName, state.lastName);
        }
        if (type === 'phone') {
            return api.postAuthCode(type, state.phone, state.firstName, state.lastName);
        }
    },
    verifyAuthCode({ state }: { state: any }, type: string) {
        if (type === 'email') {
            return api.verifyAuthCode(type, state.email, state.code);
        }
        if (type === 'phone') {
            return api.verifyAuthCode(type, state.phone, state.code);
        }
    },
    SignUp({ state }: { state: any }) {
        return api.SignUp({
            email: state.email,
            phone: state.phone,
            password: state.password,
            firstName: state.firstName,
            lastName: state.lastName,
            birthday: state.birthday,
            gender: state.gender,
            code: state.code,
        }, (res: any) => {
            if (res.status === 201) {
                // success
            }
            if (res.status === 400) {
                // console.log(res.data);
            }
        }, (err: any) => {
            // console.log(err);
        });
    },
};

export default {
    namespaced: true,
    state: states,
    actions,
    mutations,
};
