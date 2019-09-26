import api from '../api/api'

const state = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: '',
    code: '',
    birthday: '',
    gender: '',
}

const mutations = {
    setFirstName(state, value) {
        state.firstName = value
    },
    setLastName(state, value) {
        state.lastName = value
    },
    setEmail(state, value) {
        state.email = value
    },
    setPhone(state, value) {
        state.phone = value
    },
    setPassword(state, value) {
        state.password = value
    },
    setCode(state, value) {
        state.code = value
    },
    setBirthday(state, value) {
        state.birthday = value
    },
    setGender(state, value) {
        state.gender = value
    },
}

const actions = {
    verifyAccount({ state }, type) {
        if (type == "email") {
            return api.verifyAccount("email", state.email)
        }
        if (type == "phone") {
            return api.verifyAccount("phone", state.phone)
        }
    },
    postAuthCode({ state }, type) {
        if (type == "email") {
            return api.postAuthCode(type, state.email, state.firstName, state.lastName)
        }
        if (type == "phone") {
            return api.postAuthCode(type, state.phone, state.firstName, state.lastName)
        }
    },
    verifyAuthCode({ state }, type) {
        if (type == "email") {
            return api.verifyAuthCode(type, state.email, state.code)
        }
        if (type == "phone") {
            return api.verifyAuthCode(type, state.phone, state.code)
        }
    },
    SignUp({ state }) {
        return api.SignUp({
            email: state.email,
            phone: state.phone,
            password: state.password,
            firstName: state.firstName,
            lastName: state.lastName,
            birthday: state.birthday,
            gender: state.gender,
            code: state.code,
        }, res => {
            if (res.status == 201) {
                // success
            }
            if (res.status == 400) {
                console.log(res.data)
            }
        }, err => {
            console.log(err)
        })
    }
}

export default {
    namespaced: true,
    state,
    actions,
    mutations,
}
