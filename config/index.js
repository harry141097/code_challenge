module.exports = {
    version: '1.0.0',
    timezone: '+07:00',
    token: '639346879:BBGK0ASDeZzXQXxOkhEyYUI8gUJqCghJKUs',
    token_life: 1000,
    port: 3001,
    language: 'vi',
    maintenance: false,

    // db
    mongodb: {
        host: 'server_ip',
        port: '27017',
        // user: "mongoWiredTiger",
        // pass: "1111qqqq##QQ",
        // roles: [ { role: "dbOwner", db: "telegram_db"}],
        database: 'tech_base'
    },

    redis: {
        Host: "server_ip",
        Port: 6379,
        Password: "1111qqqq@Q",
        DB: 0
    },

};
