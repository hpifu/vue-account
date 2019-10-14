import api from '../api';

const states = {
    username: '',
    password: '',
};

const mutations = {
    setUsername(state: any, value: any) {
        state.username = value;
    },
    setPassword(state: any, value: any) {
        state.password = value;
    },
};

const actions = {
    signIn({ state }: { state: any }) {
        return api.signIn(state.username, state.password);
    },
    verifyAccount({ state }: { state: any }, type: string) {
        if (type === 'username') {
            return api.verifyAccount('username', state.username);
        }
    },
};

export default {
    namespaced: true,
    state: states,
    actions,
    mutations,
};
