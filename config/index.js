module.exports = {
    version: '1.0.0',
    timezone: '+07:00',
    token: '939854371:AAGK0JUQeZzXQXhOkhEyNZJ2gUJqCxuELVs',
    token_life: 1000,
    port: 3000,
    language: 'vi',
    maintenance: false,

    // db
    mongodb: {
        host: 'db',
        port: '27017',
        // user: "mongoWiredTiger",
        // pass: "1111qqqq##QQ",
        // roles: [ { role: "dbOwner", db: "telegram_db"}],
        database: 'tech_base'
    },

    redis: {
        Host: "redis",
        Port: 6379,
        Password: "1111qqqq@Q",
        DB: 0
    },

};
