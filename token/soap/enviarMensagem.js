// soap/enviarMensagem.js
// Simula o envio de um SMS para o exemplo
class EnviarMensagem {
    enviarSms(texto, numero) {
        return new Promise((resolve, reject) => {
            resolve(`O SMS [${texto}] foi enviado para ${numero}`);
        });
    };
};

module.exports = new EnviarMensagem();