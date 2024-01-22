/* eslint-disable prettier/prettier */
const fs = require('fs').promises;
const path = require('path');

async function buildCssBundle() {
  try {
    // Шаг 2: Прочитать содержимое папки 'styles'
    const stylesFolderPath = path.join(__dirname, 'styles');
    const styles = await fs.readdir(stylesFolderPath);

    // Шаг 3-6: Обработка файлов стилей
    const cssContents = [];
    for (const file of styles) {
      const filePath = path.join(stylesFolderPath, file);
      const fileStat = await fs.stat(filePath);

      // Проверить, является ли объект в папке файлом и имеет правильное расширение
      if (fileStat.isFile() && path.extname(file) === '.css') {
        // Прочитать файл стилей и записать прочитанные данные в массив
        const fileContent = await fs.readFile(filePath, 'utf-8');
        cssContents.push(fileContent);
      }
    }

    // Записать массив стилей в файл 'bundle.css'
    const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
    await fs.writeFile(bundleFilePath, cssContents.join('\n'));

    console.log('CSS пакет успешно создан!');
  } catch (error) {
    console.error('Ошибка при создании CSS пакета:', error.message);
  }
}

// Вызовем функцию buildCssBundle
buildCssBundle();
