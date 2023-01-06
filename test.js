const express = require("express");
const crypto = require('crypto');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.post('/test/generateSignature', async (req, res) => {
  const form = null;
});


// second key = 5fe7962f65760bad1e38d921e34d691a
//algorithm = SHA-256
//pos_id = 459174
//signature = FUNKCJA

const htmlForm = {
  customerIp: "123.123.123.123",
  merchantPosId: "459174",
  description: "Opis",
  totalAmount: "1000",
  currencyCode: "PLN",
  productsName: "Nazwaproduktu",
  productsUnitPrice: "1000",
  productsQuantity: "1",
  notifyUrl: "http://localhost:3001",
  continueUrl: "http://localhost:3001"
}

const sortObjectByKey = (obj) => {
	// Create an array of objects with the keys and values of the input object
	let objectArray = Object.entries(obj).map(([key, value]) => ({key, value}));

	// Sort the array by the 'key' value in ascending order
	objectArray.sort((a, b) => a.key > b.key ? 1 : -1);

	// Create a new object with the sorted key/value pairs
	let sortedObject = {};
	for (let entry of objectArray) {
		sortedObject[entry.key] = entry.value;
	}

	return sortedObject;
}

const generateSignature = (form, secondKey, algorithm, posId) => {
  sortedValues = sortObjectByKey(form);
  console.log("SORTED VALUES: ", sortedValues);

  let content = '';

  Object.keys(sortedValues).forEach(key => {

    content += key + "=" + encodeURIComponent(sortedValues[key]) + "&";
  });

  content = content + secondKey;

  // result = "signature=" + algorithm.apply(content) + ";";
  // result = result + "algorithm=SHA-256"
  // result = result + "sender=459174"

  let value="continueUrl=http://localhost:3001&currencyCode=PLN&customerIp=123.123.123.123&description=Opis&merchantPosId=459174&notifyUrl=http://localhost:3001&products[0].name=Nazwaproduktu&products[0].quantity=1&products[0].unitPrice=1000&totalAmount=1000&5fe7962f65760bad1e38d921e34d691a";

  let hash = crypto.createHash('sha256').update(value).digest('hex');
  
  //hash = 8890c80b070a32640c71fd4e0cf8daf0812ed51c65751955acc62fbec72b9ade

  return hash;
}

console.log(generateSignature(htmlForm, "5fe7962f65760bad1e38d921e34d691a", "SHA-256", "459174"));



var access_token = ''
var pos_id = '459174';

var request = require('request');

request({
  method: 'POST',
  url: 'https://secure.snd.payu.com/api/v2_1/orders/',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + access_token
  },
  body: {
    "notifyUrl": "https://your.eshop.com/notify/",
    "customerIp": "127.0.0.1",
    "merchantPosId": pos_id,
    "description": "RTV market",
    "currencyCode": "PLN",
    "totalAmount": "21000",
    "products": [
      {
        "name": "Wireless mouse",
        "unitPrice": "15000",
        "quantity": "1"
      },
      {
        "name": "HDMI cable",
        "unitPrice": "6000",
        "quantity": "1"
      }
    ]
  }
}, function (error, response, body) {
  console.log('Status:', response.statusCode);
  console.log('Headers:', JSON.stringify(response.headers));
  console.log('Response:', body);
});

const port = 8080;
app.listen(port, () => {
  console.log(`[server.js]: Server is running at port ${port}`);
});