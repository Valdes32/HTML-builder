/* eslint-disable prettier/prettier */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const filePath = path.join(__dirname, 'output.txt');

// Создание потока записи в файл
const writeStream = fs.createWriteStream(filePath, { flags: 'a' }); // 'a' - режим дополнения файла

// Создание интерфейса для чтения из консоли
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Приветствие в консоли
console.log(
  'Привет! Введите текст. Для завершения введите "exit" или используйте Ctrl+C.',
);

// Обработка события появления новой строки в консоли (ввода пользователя)
rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('До свидания!');
    rl.close();
    process.exit();
  }

  // Запись введенного текста в файл
  writeStream.write(`${input}\n`);

  // Ожидание нового ввода
  console.log('Введите еще текст:');
});

// Обработка события завершения процесса Ctrl+C
rl.on('close', () => {
  console.log('Процесс завершен.');
  process.exit();
});
