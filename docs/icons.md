# Автоматизация работы с иконками

__Практическое руководство.__

Статья предназначена для обучающихся вёрстке.

## 1. Фоновый спрайт (растровый и(или) векторный)

Способ не рекомендуется, так как имеет недостатки:

* зависимость от порядка файлов в каталоге
* генерация CSS-файлов с не всегда подходящими именами классов и кучей лишнего кода (вытаскивание из него значений background-position - задача неоправданная)
* требует жесткого ограничения ширины элемента, то есть применить на родителе без псевдоэлемента не удастся, придется писать лишний код.
* нет интерактивности для svg
* необходимость подгрузки двух спрайтов в случае наличия иконок двух типов.

## 2. SVG-спрайт, не привязанный к визуальному позиционированию

Рекомендуемым вариантом является спрайт в виде svg-файла, в котором каждая иконка вложена в элемент `<symbol>`.
Этот спрайт позволяет делать иконки интерактивными, при этом не прибегая к встраиванию в разметку всего SVG-кода за счет обращения к внешнему файлу.

1. Установите в проект соответсвующий плагин: `npm i -D gulp-svgstore`.
2. Создайте задачу для gulp наподобие такой:

```js
var svgstore = require('gulp-svgstore');
var imagemin = require('gulp-imagemin');

gulp.task('sprite', function () {
  return gulp.src('source/img/sprite/**/*.svg')
    .pipe(imagemin([
      imagemin.svgo()
    ]))
    .pipe(svgstore({
      name: 'sprite.svg',
      inlineSvg: true
    }))
    .pipe(gulp.dest('build/img'));
});
```

Рекомендуемые настройки для svgo можно взять, например, [здесь](https://github.com/efiand/gulp-template-student/blob/master/package.json) – в данном файле это содержимое секции gulp.imagemin.svgo.

3. Добавьте ее в перечень задач в задачу `start`, `build` и т. п., которые приводят к сборке проекта.

4. Используйте в разметке (`id` - имя исходного файла без расширения):

```s
<svg aria-hidden="true">
  <use xlink:href="img/sprite.svg#id" />
</svg>
```

Вариант встраивания всего спрайта в разметку мы не рассматриваем, так как это приводит к неоправданному увеличению веса загружаемых страниц. Для браузеров, не понимающих внешних спрайтов, есть полифилл `svg4everybody`:

1. `npm i -d svg4everybody`.

2. В один из собственных скриптов (к примеру, `source/js/start.js`) добавляется вызов:

```js
svg4everybody();
```

3. Задача по сборке может выглядеть примерно так:

```js
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');

gulp.task('script', function () {
  return gulp.src([
    'node_modules/picturefill/dist/picturefill.min.js',
    'node_modules/svg4everybody/dist/svg4everybody.min.js',
    'source/js/start.js',
    'source/js/menu.js',
    'source/js/popup.js'
  ], {
    sourcemaps: true
  }).pipe(plumber())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('build/js'), {
    sourcemaps: '.'
  });
});
```

## 3. Встраивание фоновых иконок в CSS в кодировке base64

Может использоваться в дополнение к предыдущему способу по причине ряда преимуществ:

* Упрощение разметки за счёт неинтерактивных иконок.
* Единообразие работы с растровыми и векторными фоновыми иконками.
* Загрузка одного лишь файла css (если нет интерактивных иконок) вместо нескольких спрайтов.

1. Установите в проект соответсвующий плагин: `npm i -D gulp-css-base64`.

2. Создайте задачу по минификации иконок:

```js
var imagemin = require('gulp-imagemin');

gulp.task('iconsmin', function () {
  return gulp.src('source/img/icons/**/*.{svg,png}')
    .pipe(imagemin([
      imagemin.svgo(),
      imagemin.optipng()
    ]))
    .pipe(gulp.dest('source/img/icons'));
});
```

3. Подключите ее к задаче сборки, важно – до задачи создания css и не параллельно с ней. Не обязательно устанавливать слежение, неминифицированные иконки будут подключены корректно, но в начале сборки рекомендуется такую оптимизацию проводить.

4. Расширьте задачу создания css-файла, добавив нижеуказанный код после звена компиляции или перепаковки медиазапросов (если используется). Важно подключить до вызова автопрефиксера.

```js
var server = require('browser-sync').create();
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var combineMq = require('gulp-combine-mq');
var cssBase64 = require('gulp-css-base64');
var autoprefixer = require('gulp-autoprefixer');
var del = require('del');

gulp.task('style', function () {
  return gulp.src('source/less/style.less', {
    sourcemaps: true
  })
  .pipe(plumber())
  .pipe(less())
  .pipe(combineMq())
  .pipe(cssBase64({
    baseDir: '../img/icons',
    maxWeightResource: 10000,
    extensionsAllowed: [
      '.svg',
      '.png'
    ]
  }))
  .pipe(autoprefixer())
  .pipe(gulp.dest('build/css', {
    sourcemaps: '.'
  }))
  .pipe(server.stream());
});
```

5. Используйте в css :

```less
.card-link {
  background-image: url("card.svg");
}

.old-mail-link {
  background-image: url("mail.png");
}
```

Важно указывать имя файла без пути. Так как плагин gulp-css-base64 проходит по всем стилям, он подставляет путь из `baseDir` к имеющемуся в `url()`. В этом случае он совпадёт с расположением иконки, и она будет интегрирована в CSS в кодировке base64. По пути с `../img/` плагин иконок не найдёт, и замены не будет: этот код останется как есть.
