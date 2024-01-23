/* eslint-disable prettier/prettier */
const fsPromises = require('fs').promises;
const path = require('path');

async function copyDir() {
  const sourceDir = path.join(__dirname, 'files');
  const targetDir = path.join(__dirname, 'files-copy');

  try {
    // Проверяем наличие папки files-copy и удаляем её, если она существует
    const targetExists = await fsPromises
      .access(targetDir)
      .then(() => true)
      .catch(() => false);
    if (targetExists) {
      console.log('Удаление существующей папки files-copy');
      await fsPromises.rm(targetDir, { recursive: true });
    }

    // Создаем папку files-copy
    await fsPromises.mkdir(targetDir, { recursive: true });

    // Читаем содержимое папки files
    const files = await fsPromises.readdir(sourceDir);

    // Копируем каждый файл
    for (const file of files) {
      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, file);

      // Копируем файл
      await fsPromises.copyFile(sourcePath, targetPath);
    }

    console.log('Копирование завершено');
  } catch (error) {
    console.error('Ошибка при копировании:', error.message);
  }
}

// Вызываем функцию
copyDir();
