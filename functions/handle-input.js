const fetch = require('node-fetch');

function sendGreetingsTemplate(context, event) {
  return fetch(context.HSM_ENDPOINT, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': context.AUTHORIZATION
    },
    body: JSON.stringify({
      account: context.WHATSAPP_NUMBER,
      phone: event.From.replace('+', ''),
      name: context.HSM_NAME,
      parameters: []
    })
  })
}

/**
 * Handles the user input gathered in the ivr Function
 */
// eslint-disable-next-line consistent-return
exports.handler = function (context, event, callback) {
  let UserInput = event.Digits || event.SpeechResult;
  const twiml = new Twilio.twiml.VoiceResponse();

  if (!UserInput) {
    twiml.say('Lo siento, ocurrió un error');
    return callback(null, twiml);
  }

  let request = Promise.resolve();
  
  switch (UserInput) {
    case '1':
      twiml.say('¡Perfecto! Hasta pronto');
      request = sendGreetingsTemplate(context, event);
      break;
    default:
      twiml.say('Opción inválida');
      twiml.redirect('ivr');
  }

  request
    .then(() => {
      return callback(null, twiml);
    })
    .catch((err) => {
      return callback(err);
    });
};
