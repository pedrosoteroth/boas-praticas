// test/unitario.js
const expect = require('chai').expect;
const sinon = require('sinon');

// criando uma sessão para os testes da classe token
describe('Teste unitário OiToken', function () {

    // importando a classe OiToken
    let oitoken = require('../OiToken');

    describe('Gerar', function () {
        it('Deve possuir o método gerar', function (done) {
            expect(oitoken).to.have.property('gerar');
            done();
        });

        it('Deve retornar uma string de 6 caracteres', function (done) {
            oitoken.gerar()
                .then(token => {
                    expect(token.length).to.be.equal(6);
                    done();
                });
        });

        it('Deve gerar tokens diferentes', function (done) {

            let primeira, segunda, terceira;

            oitoken.gerar()
                .then(token => {
                    primeira = token;
                    return oitoken.gerar();
                })
                .then(token => {
                    segunda = token;
                    return oitoken.gerar();
                })
                .then(token => {
                    terceira = token;

                    expect(primeira).to.not.be.equal(segunda);
                    expect(primeira).to.not.be.equal(terceira);
                    expect(segunda).to.not.be.equal(terceira);

                    done();
                });
        });

        it('Deve gerar tokens com apenas números', function (done) {
            oitoken.gerar()
                .then(token => {
                    primeira = token;
                    return oitoken.gerar();
                })
                .then(token => {
                    segunda = token;
                    return oitoken.gerar();
                })
                .then(token => {
                    terceira = token;

                    expect(primeira).to.match(/^[0-9]{6}$/);
                    expect(segunda).to.match(/^[0-9]{6}$/);
                    expect(terceira).to.match(/^[0-9]{6}$/);

                    done();
                });
        });

    });

    describe('Enviar', function () {

        let sandbox, enviarMensagemStub, gerarStub;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();

            // criando um stub para o metodo enviar da classe oitoken.enviarMensagemService
            // dessa forma garantimos que o teste unitario não dependerá de nada externo.
            enviarMensagemStub = sandbox.stub(oitoken.enviarMensagem, 'enviarSms').callsFake(() => {
                return Promise.resolve('SMS foi enviado...');
            });

            gerarStub = sandbox.stub(oitoken, 'gerar').callsFake(() => {
                return Promise.resolve('123456');
            });
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('Deve possuir o método enviar', function (done) {
            expect(oitoken).to.have.property('enviar');
            done();
        });

        it('Deve chamar o método de geração de token', function (done) {
            oitoken.enviar()
                .then(() => {
                    expect(gerarStub.calledOnce).to.be.ok;
                    done();
                });
        });

        it('Deve chamar o método de envio de sms', function (done) {
            oitoken.enviar()
                .then(() => {
                    expect(enviarMensagemStub.calledOnce).to.be.ok;
                    done();
                });
        });

        it('Deve chamar o método de envio de sms com os parâmetros corretos', function (done) {
            oitoken.enviar('21999999999')
                .then(() => {
                    // testa se o metodo de envio de SMS esta sendo chamado com um token e com o número de telefone correto.
                    expect(enviarMensagemStub.calledWith(sinon.match(/^[0-9]{6}$/), '21999999999')).to.be.ok;
                    done();
                });

        });

        it('Deve respeitar o fluxo correto', function (done) {
            oitoken.enviar('219999999999')
                .then(() => {
                    expect(sinon.assert.callOrder(gerarStub, enviarMensagemStub));
                    done();
                });
        });
    });
});