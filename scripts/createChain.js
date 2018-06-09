var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var data = JSON.stringify({
  "external_ids": [
    "ZXh0ZXJuYWwgaWQ="
  ],
  "content": "TXkgTmV3IENoYWlu"
});

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("POST", "https://apiplus-api-sandbox-testnet.factom.com/v1/chains");

xhr.setRequestHeader('factom-provider-token', process.env.FACTOM_API_KEY);

xhr.send(data);
