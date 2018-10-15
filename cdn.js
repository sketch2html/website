'use strict';

const path = require('path');
const fs = require('fs');
const stream = require('stream');
const SparkMD5 = require('spark-md5');
const OSS = require('ali-oss');
const config = require('./config/config.local')();

let client = new OSS(config.aliyun.oss);

let list = fs.readdirSync('./app/public');

async function upload() {
  console.warn('===start===');
  let hash = {};
  for(let i = 0; i < list.length; i++) {
    let item = list[i];
    let name;
    if(item.endsWith('.js') || item.endsWith('.css')) {
      let suffix = item.slice(item.lastIndexOf('.'));
      let file = fs.readFileSync(path.join('./app/public', item), { encoding: 'utf-8', });
      let md5 = SparkMD5.hash(file);
      name = config.aliyun.oss.prefix + md5+ suffix;
      let check = await client.list({
        prefix: name,
      });
      if(check.res && check.res.status === 200) {
        let objects = check.objects;
        if(objects && objects.length) {
          console.log(item, 304, name);
        }
        else {
          let readable = new stream.Readable();
          readable.push(file, { encoding: 'utf-8' });
          readable.push(null);
          let res = await client.putStream(name, readable);
          console.log(item, res.res.status, name);
        }
      }
      else {
        console.error(item, 503, name);
        return;
      }
      hash[item] = name;
    }
    else {
      name = config.aliyun.oss.prefix + item;
      let check = await client.list({
        prefix: name,
      });
      if(check.res && check.res.status === 200) {
        let objects = check.objects;
        if(objects && objects.length) {
          console.log(item, 304, name);
        }
        else {
          let res = await client.put(name, path.join(__dirname, './app/public', item));
          console.log(item, res.res.status, name);
        }
      }
      else {
        console.error(item, 503, name);
        return;
      }
    }
  }
  fs.writeFileSync(path.join(__dirname, './map.json'), JSON.stringify(hash), { encoding: 'utf-8', });
  console.warn('===end===');
}
upload();
