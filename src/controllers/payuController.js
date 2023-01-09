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

  const courseTitleReplaced = req.body.title.replace(/ /g, "%20");
  const link = "https://tutorsalpha.herokuapp.com/payment_final/?title=" + courseTitleReplaced;

  const fixedPrice = req.body.price * 100;
  const courseTitle = req.body.title;
  const courseDescription = req.body.description.replace(/"/g, "'");
  const buyerEmail = req.body.email;

  const visibleDescription = courseTitle.slice(0, 80);

  const generateOrderRequest = await fetch(process.env.PAYU_ORDER_LINK, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: `{
      "notifyUrl": "http://localhost:3001/api/payu/notifyMe",
      "continueUrl": "${link}",
      "customerIp": "127.0.0.1",
      "merchantPosId": "${posId}",
      "description": "${courseDescription}",
      "visibleDescription": "${visibleDescription}",
      "statementDescription": "Tutors Alpha",
      "buyer.email": "${buyerEmail}",
      "currencyCode": "PLN",
      "totalAmount": ${fixedPrice},
      "products": [
        {
          "name": "${courseTitle}",
          "unitPrice": ${fixedPrice},
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