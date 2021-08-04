require('dotenv').config();

if(!process.env.APP_NAME) {
  console.error('ERROR: please set the environment variable "APP_NAME"');
  process.exit(1);
}

const prompt = require('prompt');

// let QRCode = require('qrcode');
let QRCode = require('qrcode-terminal');
const Secret = require('./secret');
const TOTP = require('./totp');


// the secret needs to be unique to each user and persisted somewhere
let secret = 'ID26MJLK2VPA24GF6RGYE5NEFFK4CQOEOHZKM4T3MVHOX6AXR6NYQRGKTO2YOIFPZS6E4XFKGUUIQTW7S7736Q4GHMBKGLM4'
//let secret = Secret.generateBase32Secret();
let otp_auth_url = TOTP.getAuthURL(secret);

//function toDataURL_callback(err, data_url) {
//  // let data_url = getOtpAuthURL(secret);
//
//  console.log(data_url);
//
//  // Display this data URL to the user in an <img> tag
//  let html = `<img src="${data_url}" />`;
//  document.write(html);
//}
//
//QRCode.toDataURL(otp_auth_url, toDataURL_callback);


console.log( QRCode.generate(otp_auth_url, {small: true}) );
console.log(`QRCode data: ${otp_auth_url}`);


// verify the one-time-password (OTP)

function prompt_callback(err, result) {
  if(err) {
    console.log(err)
    return 1;
  }
  let valid = TOTP.verifyTOTP(result.passcode, secret);
  console.log(valid);
}

  prompt.start()
  prompt.get(['passcode'], prompt_callback);
  console.log('Enter the passcode from your authenicator app: ');

  //prompt.stop();
