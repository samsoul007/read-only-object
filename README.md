


A very small module to make objects read only. Useful for config objects such as process.ENV or others.


# installation

`npm install --save read-only-object`

# usage

## Load object

```javascript
const RO = require("read-only-object")

const config = {
  pass: "1234",
  urls: [
    'http1',
    'http2'
  ]
}

const oRoObj = RO.load(config); // config is now read-only in oRoObj
const oRoObj2 = RO.get(); // will retrieve the loaded config
```

## Value access

```javascript
console.log(oRoObj.pass) // shows "1234"

oRoObj.a = 1 // Throw an error
oRoObj.urls.push("http3") // throw an error
```
