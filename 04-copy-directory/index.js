/* eslint-disable prettier/prettier */
const fs = require('fs').promises;
const path = require('path');

async function copyDir() {
  try {
    // Шаг 2: Создать папку 'files-copy', если ее еще не существует
    const copyFolderPath = path.join(__dirname, 'files-copy');
    await fs.mkdir(copyFolderPath, { recursive: true });

    // Шаг 3: Прочитать содержимое папки 'files'
    const filesFolderPath = path.join(__dirname, 'files');
    const files = await fs.readdir(filesFolderPath);

    // Шаг 4: Скопировать файлы из папки 'files' в папку 'files-copy'
    for (const file of files) {
      const sourcePath = path.join(filesFolderPath, file);
      const destinationPath = path.join(copyFolderPath, file);

      await fs.copyFile(sourcePath, destinationPath);
    }

    console.log('Папка успешно скопирована!');
  } catch (error) {
    console.error('Ошибка при копировании папки:', error.message);
  }
}

// Вызовем функцию copyDir
copyDir();
