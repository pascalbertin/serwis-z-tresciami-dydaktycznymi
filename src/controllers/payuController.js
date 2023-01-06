require('dotenv').config();
const fetch = require('node-fetch');

const generatePayuOrder = async (req, res) => {
  const posId = process.env.PAYU_POS_ID;
  const grantType = process.env.PAYU_CLIENT_GRANT_TYPE;
  const clientId = process.env.PAYU_POS_ID;
  const clientSecret = process.env.PAYU_CLIENT_SECRET;
  const generateAccessTokenLink = process.env.PAYU_ACCESS_TOKEN_GENERATE_LINK;

  const generateAccessTokenRequest = await fetch(generateAccessTokenLink, {
    method: 'POST',
    body: `grant_type=${grantType}&client_id=${clientId}&client_secret=${clientSecret}`,
    headers: {
      'Content-Type':'application/x-www-form-urlencoded'
    }
  });

  let data = await generateAccessTokenRequest.json();

  const accessToken = data.access_token;

  const generateOrderRequest = await fetch(process.env.PAYU_ORDER_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: `{
      "continueUrl": "https://serwis-z-tresciami.herokuapp.com/course/?title=Kurs%20z%20matematyki%202",
      "customerIp": "127.0.0.1",
      "merchantPosId": "${posId}",
      "description": "Dzięki temu kursowi będziesz w stanie bez problemu wykonywać wszytkie obliczenia!",
      "visibleDescription": "Widzialny opis na stronie PayU(80zzs)",
      "additionalDescription": "Dodatkowy Opis",
      "statementDescription": "Tutors Alpha",
      "buyer.email": "email@kupujacego.com",
      "currencyCode": "PLN",
      "totalAmount": "1000",
      "products": [
        {
          "name": "Kurs z matematyki 2",
          "unitPrice": "1000",
          "quantity": "1",
          "virtual": "true"
        }
      ]
    }`
  });

  data = await generateOrderRequest.url;

  return res.status(200).json({"link": data});
}

module.exports = {
  generatePayuOrder
};