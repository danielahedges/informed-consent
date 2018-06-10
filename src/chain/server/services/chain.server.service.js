import { XMLHttpRequest } from 'xmlhttprequest';
import mongoose from 'mongoose';
import _ from 'lodash';

function toBase64(str) {
  return Buffer.from(str).toString('base64');
}

function fromBase64(str) {
  return Buffer.from(str, 'base64').toString('ascii');
}

function cleanResponse(response) {
  if (response.external_ids) {
    response.external_ids = _.map(response.external_ids, fromBase64);
  }
  return response;
}

var Chain;

export class ChainService {
  static init() {
    Chain = mongoose.model('Chain');
  }
  static makeRequest(options, cb) {
    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener('readystatechange', function() {
      if (this.readyState === this.DONE) {
        cb(cleanResponse(JSON.parse(this.responseText)));
      }
    });
    let method = options.method || 'POST';
    if (!options.url) {
      throw new Error('url is a mandatory option');
    }
    if (!process.env.FACTOM_API_KEY) {
      throw new Error('API key is a mandatory environment variable');
    }
    let url = options.url;
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.setRequestHeader('factom-provider-token', process.env.FACTOM_API_KEY);
    xhr.send(this.processData(options));
  }
  static processData(options) {
    var data = {};
    if (options.external_ids) {
      data.external_ids = _.map(options.external_ids, toBase64);
    }
    if (options.content) {
      data.content = toBase64(options.content);
    }
    return JSON.stringify(data);
  }
  static create({ external_ids, content }, cb) {
    this.makeRequest(
      {
        external_ids,
        content,
        method: 'POST',
        url: 'https://apiplus-api-sandbox-testnet.factom.com/v1/chains'
      },
      response => {
        if (!response) {
          throw new Error('No response');
        }
        if (response.errors && response.errors.detail) {
          throw new Error(response.errors.detail);
        }
        var chain = new Chain(response);
        Object.assign(chain, {
          external_ids,
          content
        });
        chain.save((err, obj) => {
          if (err || !obj) {
            throw new Error('failed to create chain: ', JSON.stringify(chain));
          }
          cb(obj);
        });
      }
    );
  }
  static search({ external_ids }, cb) {
    this.makeRequest(
      {
        external_ids,
        method: 'POST',
        url: 'https://apiplus-api-sandbox-testnet.factom.com/v1/chains/search'
      },
      cb
    );
  }
  static getChain({ chain_id }, cb) {
    this.makeRequest(
      {
        method: 'GET',
        url:
          'https://apiplus-api-sandbox-testnet.factom.com/v1/chains/' + chain_id
      },
      cb
    );
  }
  static entries({ chain_id }, cb) {
    this.makeRequest(
      {
        method: 'GET',
        url:
          'https://apiplus-api-sandbox-testnet.factom.com/v1/chains/' +
          chain_id +
          '/entries'
      },
      cb
    );
  }
  static enter({ chain_id, external_ids, content }, cb) {
    this.makeRequest(
      {
        external_ids,
        content,
        method: 'POST',
        url:
          'https://apiplus-api-sandbox-testnet.factom.com/v1/chains/' +
          chain_id +
          '/entries'
      },
      cb
    );
  }
  static searchEntry({ chain_id, external_ids }, cb) {
    this.makeRequest(
      {
        external_ids,
        method: 'POST',
        url:
          'https://apiplus-api-sandbox-testnet.factom.com/v1/chains/' +
          chain_id +
          '/entries/search'
      },
      cb
    );
  }
  static getEntry({ chain_id, entry_hash }, cb) {
    this.makeRequest(
      {
        method: 'GET',
        url:
          'https://apiplus-api-sandbox-testnet.factom.com/v1/chains/' +
          chain_id +
          '/entries/' +
          entry_hash
      },
      cb
    );
  }
}
