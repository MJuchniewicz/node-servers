const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf8'});
const writeStream = fs.createReadStream("./docs/blog4.txt");

readStream.on('data', (chunk) => {

    console.log(chunk)
    writeStream.write('\nNEW Ch')
    writeStream.write(chunk)
})

readStream.pipe(writeStream)