const configs: any = {
    production: {
        org: 'HPiFu',
        api: {
            account: 'https://api.account.hatlonely.com',
            cloud: 'https://api.cloud.hatlonely.com',
            tech: 'https://api.tech.hatlonely.com',
        },
        web: {
            account: 'https://account.hatlonely.com',
            tech: 'https://tech.hatlonely.com',
        },
    },
    development: {
        org: 'HPiFu',
        api: {
            account: 'http://127.0.0.1:16060',
            cloud: 'http://127.0.0.1:16061',
            tech: 'http://127.0.0.1:16063',
        },
        web: {
            account: 'http://127.0.0.1:4000',
            tech: 'http://127.0.0.1:4001',
        },
    },
};

export default configs[process.env.NODE_ENV];
