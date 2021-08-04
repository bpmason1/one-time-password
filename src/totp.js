const hotp = require('./hotp');

function generateTOTP(secret, window = 0) {
  const counter = Math.floor(Date.now() / 30000);
  return hotp.generateHOTP(secret, counter + window);
}

function verifyTOTP(token, secret, window = 1) {
  if(Math.abs(window) > 10) {
    console.error('Window size is too large');
    return false;
  }

  for(let errorWindow = -window; errorWindow <= window; errorWindow++) {
    const totp = generateTOTP(secret, errorWindow);
    if(token == totp) {
      return true;
    }
  }

  return false;
}

function getAuthURL(b32Secret) {
  return `otpauth://totp/${process.env.APP_NAME}?secret=${b32Secret}`;
}

const totp = {
  getAuthURL: getAuthURL,
  generateTOTP: generateTOTP,
  verifyTOTP: verifyTOTP,
};

module.exports = totp;
