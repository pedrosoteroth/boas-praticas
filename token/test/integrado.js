// test/integrado.js
const expect = require('chai').expect;
const sinon = require('sinon');

// criando uma sessão para os testes da classe token
describe('Teste integrado OiToken', function () {

    // importando a classe OiToken
    let oitoken = require('../OiToken');

    describe('Enviar', function () {

        let sandbox;

        beforeEach(() => {
            sandbox = sinon.sandbox.create();
        });

        afterEach(() => {
            sandbox.restore();
        });

        it('Deve enviar o token', function (done) {
            // mockando apenas o gerar
            let gerarStub = sandbox.stub(oitoken, 'gerar').callsFake(() => {
                return Promise.resolve('123456');
            });

            oitoken.enviar('21999999999')
                .then(resultado => {
                    expect(resultado).to.be.equal('O SMS [123456] foi enviado para 21999999999');
                    done();
                });
        });

        it('Deve gerar o token', function (done) {
            // mockando apenas o enviar
            let gerarStub = sandbox.stub(oitoken.enviarMensagem, 'enviarSms').callsFake((token, numero) => {

                // garante que esta gerando o token
                expect(token).to.match(/^[0-9]{6}$/);

                done();
            });

            oitoken.enviar('21999999999');
        });

        it('Deve gerar e enviar o token', function (done) {
            oitoken.enviar('21999999999')
                .then(resultado => {
                    done();
                });
        });
    });
});