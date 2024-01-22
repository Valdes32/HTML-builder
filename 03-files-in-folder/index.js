/* eslint-disable prettier/prettier */

const fs = require('fs').promises;
const path = require('path');

const folderPath = path.join(__dirname, 'secret-folder');

async function displayFileInfo() {
  try {
    // Чтение содержимого папки
    const files = await fs.readdir(folderPath, { withFileTypes: true });

    // Обработка каждого объекта в папке
    for (const file of files) {
      // Проверка, является ли объект файлом
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);

        // Получение информации о файле
        const stats = await fs.stat(filePath);

        // Форматирование вывода
        const fileSizeInKB = (stats.size / 1024).toFixed(3); // Преобразование в кБ с округлением
        const fileInfo = `${file.name} - ${path.extname(
          file.name,
        )} - ${fileSizeInKB}kb`;

        // Вывод информации в консоль
        console.log(fileInfo);
      }
    }
  } catch (error) {
    console.error(`Произошла ошибка: ${error.message}`);
  }
}

// Вызов функции для отображения информации о файлах
displayFileInfo();
