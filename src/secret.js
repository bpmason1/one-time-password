const crypto = require('crypto');
const base32 = require('hi-base32');

function getOtpAuthURL(secret) {
  return `otpauth://totp/${process.env.APP_NAME}?secret=${secret}`;
}

function generateBase32Secret(length = 60) {
  const randomBuffer = crypto.randomBytes(length);
  return base32.encode(randomBuffer).replace(/=/g, '');
}

module.exports = {
  generateBase32Secret: generateBase32Secret
};
