function deflectScript(context, event) {
  const twiml = new Twilio.twiml.VoiceResponse();
  
  const gather = twiml.gather({
    numDigits: 1,
    action: 'handle-input',
    input: 'dtmf',
  });
  gather.say('Estimado cliente, actualmente tenemos un tiempo de espera de 30 minutos.');
  gather.say('Presione 1 si prefiere que lo contactemos por WhatsApp.');
  
  twiml.redirect();
  return twiml;
}

/**
 * Returns TwiML that prompts the users to make a choice.
 * If the user enters something it will trigger the handle-input Function and otherwise go in a loop.
 */
exports.handler = function (context, event, callback) {
  const twiml = deflectScript(context, event);
  callback(null, twiml);
};
