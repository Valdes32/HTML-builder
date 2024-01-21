/* eslint-disable prettier/prettier */
const fs = require('fs');
const path = require('path');

// Путь к файлу text.txt
const filePath = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(filePath, { encoding: 'utf8' });

// Направление потока чтения в стандартный вывод
readStream.pipe(process.stdout);
