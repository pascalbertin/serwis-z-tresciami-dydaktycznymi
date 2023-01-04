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

const port = 8080;
app.listen(port, () => {
  console.log(`[server.js]: Server is running at port ${port}`);
});



// const { URLSearchParams } = require('url');
// const fetch = require('node-fetch');
// const encodedParams = new URLSearchParams();
// encodedParams.set('key','JP***g');
// encodedParams.set('amount','10.00');
// encodedParams.set('txnid','txnid3945908608');
// encodedParams.set('firstname','PayU User');
// encodedParams.set('email','test@gmail.com');
// encodedParams.set('phone','9876543210');
// encodedParams.set('productinfo','iPhone');
// encodedParams.set('surl','https://apiplayground-response.herokuapp.com/');
// encodedParams.set('furl','https://apiplayground-response.herokuapp.com/');
// encodedParams.set('pg','');
// encodedParams.set('bankcode','');
// encodedParams.set('ccnum','');
// encodedParams.set('ccexpmon','');
// encodedParams.set('ccexpyr','');
// encodedParams.set('ccvv','');
// encodedParams.set('ccname','');
// encodedParams.set('txn_s2s_flow','');
// encodedParams.set('hash','b9d096f09fa84219263bafe753418e92e971291450b3e4a603dd975e67af42f405ab14792e75431c1dd0a201341e41681376eec1a13b463ee35e9131cb6d6596');
// const url = 'https://test.payu.in/merchant/_payment';
// const options = {method: 'POST',headers: {Accept: 'application/json','Content-Type': 'application/x-www-form-urlencoded'},body: encodedParams};fetch(url, options).then(res => res.json()).then(json => console.log(json)).catch(err => console.error('error:' + err));