// OiToken.js
class OiToken {
    constructor() {
        this.enviarMensagem = require('./soap/enviarMensagem');
    };

    gerar() {
        return new Promise((resolve, reject) => {
            try {
                // por ser um exemplo, não levamos em consideração como esse numero é gerado
                // precisamos apenas de um numero aleatorio de 6 caracteres
                var token = String(parseInt(Math.random() * (999999 - 111111) + 111111));

                resolve(token);

            } catch (error) {
                reject(error);
            }
        });
    };

    enviar(numero) {
        var base = this;

        return this.gerar()
            .then(token => {
                return base.enviarMensagem.enviarSms(token, numero);
            })
    };
};

module.exports = new OiToken();