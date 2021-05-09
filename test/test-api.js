var chai = require('chai');
var chaiHttp = require('chai-http');
chai.should();
chai.use(chaiHttp);

describe('ĐĂNG NHẬP', function () {
    it('Đăng nhập một user với username và password đã đăng ký và nhận được token!', function (done) {
        chai.request('http://localhost:3000')
            .post('/api/auth/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({'username': 'harry', 'password': '123'})
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('success');
                res.body.data.should.be.a('object');
                res.body.data.should.have.property('username');
                res.body.data.should.have.property('token');
                done();
            });
    });
    it('Đăng nhập một user chưa đăng ký!', function (done) {
        chai.request('http://localhost:3000')
            .post('/api/auth/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({'username': 'nv1', 'password': '111'})
            .end(function (err, res) {
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('User invalid!');
                done()
            })
    });
    it('Đăng nhập mà không truyền tham số!', function (done) {
        chai.request('http://localhost:3000')
            .post('/api/auth/login')
            .end(function (err, res) {
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Params invalid!');
                done()
            })
    });
    it('Đăng nhập mà không truyền đủ tham số!', function (done) {
        chai.request('http://localhost:3000')
            .post('/api/auth/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({'username': '6'})
            .end(function (err, res) {
                res.should.have.status(500);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('error').eql('Params invalid!');
                done()
            })
    })
});

describe('XEM TẤT CẢ THÀNH VIÊN', function () {
    it('Đăng nhập rồi xem tất cả thành viên trong công ty', function (done) {
        chai.request('http://localhost:3000')
            .post('/api/auth/login')
            .set('content-type', 'application/x-www-form-urlencoded')
            .send({'username': 'harry', 'password': '123'})
            .end(function (err, res) {
                chai.request('http://localhost:3000')
                    .get('/api/member/get')
                    .set('content-type', 'application/x-www-form-urlencoded')
                    .set('authorization', res.body.data.token)
                    .end(function (err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        res.body.should.be.a('object');
                        res.body.should.have.property('success');
                        res.body.data.should.be.a('array').length < 1500;
                        done();
                    });
            });

    });
    it('Không đăng nhập mà xem tất cả thành viên trong công ty', function (done) {
        chai.request('http://localhost:3000')
            .get('/api/member/get')
            .end(function (err, res) {
                res.should.have.status(403);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('No token provided.');
                done();
            });

    });
    it('Dùng token giả để xem tất cả thành viên trong công ty', function (done) {
        chai.request('http://localhost:3000')
            .get('/api/member/get')
            .set('content-type', 'application/x-www-form-urlencoded')
            .set('authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjYwOTRiYWI1ZTUwYmM1MGJlYzkwMzUxMSIsInVzZXJuYW1lIjoiNiIsInBhc3N3b3JkIjoiMSJ9LCJpYXQiOjE2MjAzOTIyNDIsImV4cCI6MTYyMDM5MzI0Mn0.XFVCo1g9OMwq7uZaSAjHjrfi7z8Emxe_yPXw-eaOyBA')
            .end(function (err, res) {
                res.should.have.status(401);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('message').eql('Unauthorized.');
                done();
            });

    });
});

