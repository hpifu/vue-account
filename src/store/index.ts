import Vue from 'vue';
import Vuex from 'vuex';

import account from './account';
import signin from './signin';
import signup from './signup';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        signin,
        signup,
        account,
    },
    strict: process.env.NODE_ENV !== 'production',
});
