const fs = require('fs');
const path = require('path');
const SVGSpriter = require('svg-sprite');
const glob = require('glob');

// Конфигурация
const config = {
  mode: {
    symbol: {
      dest: 'src/assets/sprites',
      sprite: 'sprite.svg',
      bust: true,
    },
  },
};

const spriter = new SVGSpriter(config);

// Автоматически добавить все SVG из src/assets/icons
const svgFiles = glob.sync('src/assets/icons/*.svg');
svgFiles.forEach((file) => {
  spriter.add(file, null, fs.readFileSync(file, 'utf-8'));
});

// Скомпилировать спрайт
spriter.compile((error, result) => {
  if (error) {
    console.error(error);
    process.exit(1);
  }
  // Сохраняем все файлы, которые вернул компилятор
  for (const mode in result) {
    for (const resource in result[mode]) {
      fs.mkdirSync(path.dirname(result[mode][resource].path), {
        recursive: true,
      });
      fs.writeFileSync(
        result[mode][resource].path,
        result[mode][resource].contents
      );
      console.log(`Создан файл: ${result[mode][resource].path}`);
    }
  }
});
