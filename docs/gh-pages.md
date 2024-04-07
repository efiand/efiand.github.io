# Как опубликовать проект на Guthub Pages

## 1. Настраиваем сборку проекта в ветку gh-pages

### 1A. Способ 1 - Github actions

Добавляем в проект файл `.github/workflows/deploy.yml`. **Важно: не путайте папки `.git` и `.github`, надо создать именно вторую.**

В этот файл размещаем такой код:

```yml
name: Action
on:
  push:
    branches:
      - master
      - main
  pull_request:
    branches:
      - master
      - main

jobs:
  ci:
    name: Deploy
    runs-on: ubuntu-latest
    steps:
      - name: Set up Node.js
        uses: actions/setup-node@v1
        with:
          node-version: '16'
      - name: Checkout
        uses: actions/checkout@master
      - name: Install dependencies
        run: npm i
      - name: Build
        run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

Это код github-экшна, который при пушах и пулреквестах в главную ветку вашего проекта автоматически соберет его и положит билд в ветку gh-pages.
Подразумевается, что проект собирается в папку `build` командой `npm run build`.

Перед тем как запушить данный файл, мы должны убедиться, что гитхабу выданы права на запись в наш репозиторий. Для этого необходимо выполнить данную **однократную процедуру**:

![изображение](https://github.com/efiand/efiand.github.io/assets/26799424/114591a5-70f5-477d-a6e9-9d602183edd8)

1. Переходим в раздел `Settings`
2. В подраздел `Actions`
3. Выбираем пункт `General`

Также эти настройки доступны по прямой ссылке - `https://github.com/<YOUR_NAME>/<REPO_NAME>/settings/actions`,
где вместо `<YOUR_NAME>` укажите ваш никнейм на гитхабе, `<REPO_NAME>` - имя репозитория.

В самом низу данной страницы, в разделе `Workflow permissions`, выбираем опцию `Read and write permissions`, если она не выбрана ранее:

![изображение](https://github.com/efiand/efiand.github.io/assets/26799424/efac4531-39a2-42c8-8933-1b0fea049014)

И нажимаем `Save`.

Далее убеждаемся, что билд был собран после очередного коммита в ветку gh-pages:

![изображение](https://github.com/efiand/efiand.github.io/assets/26799424/dd745029-5f25-4397-b71d-604a5bd12da5)

Зеленая галочка (либо красный крестик в случае ошибки) - ссылки на детали процесса
(лог практически не отличается от того, что вы видите локально в процессе выполнения `mpm install` и `npm run build`).

С момента первого успешного выполнения экшна появляется ветка `gh-pages` с содержимым папки `build`:

![изображение](https://github.com/efiand/efiand.github.io/assets/26799424/f639d694-5bfb-4951-a7fa-170d85f8f541)


### 1Б. Способ 2 - альтернативный, npm-модуль `gh-pages`

Подходит для ситуаций, когда необходим ручной контроль деплоя. Файл `yml` не нужен, но нужно глобально установить npm-пакет [gh-pages](https://npmjs.com/package/gh-pages):

```
npm i -g gh-pages
```

И после выполнения команды `npm run build` выполнить команду `gh-pages -d build`.

В результате, после завершения процесса в терминале, на гитхабе также появляется ветка `gh-pages` с содержимым папки `build`.

## 2. Настройка домена

После появления ветки `gh-pages` необходимо снова однократно обратиться к настройкам:

![изображение](https://github.com/efiand/efiand.github.io/assets/26799424/13d3e67d-f059-43c3-9e5e-aba3edd3e7c7)

1. `Settings`
2. `Pages` (в результате двух шагов попадаем на страницу `https://github.com/<YOUR_NAME>/<REPO_NAME>/settings/pages`)
3. Выбираем источник данных - вариант `Deploy from a branch`
4. Выбираем ветку `gh-pages`, обязательно указываем корневой каталог:
   ![изображение](https://github.com/efiand/efiand.github.io/assets/26799424/34e459c3-6ed4-42ae-a44d-13dd035d9fbd)
5. Нажимаем `Save`

Спустя некоторое время (а именно - когда мы увидим зеленую галочку напротив коммита в ветке gh-pages) сайт будет доступен по адресу:
`https://<YOUR_NAME>.github.io/<REPO_NAME>`.

Рекомендуется указать эту ссылку в настройках репозитория:
![изображение](https://github.com/efiand/efiand.github.io/assets/26799424/0ebc25a5-da22-4e99-a42f-6250900837ca)

### Важно!

Если в опубликованной версии перестали подключаться картинки, стили или скрипты, убедитесь, что вы указали относительные пути вместо абсолютных:

НЕ

```html
<link rel="/css/style.css">

<img src="/img/my.png">
```

```css
@font-face {
  url: url("/font/my-font.woff2");
}

.my-img {
  background-image: url("/img/my.png");
}
```

А

```html
<link rel="css/style.css">

<img src="img/my.png">
```

```css
@font-face {
  url: url("../font/my-font.woff2");
}

.my-img {
  background-image: url("../img/my.png");
}
```

Дело в том, что абсолютный путь предполагает адрес от корня сайта, то есть `https://<YOUR_NAME>.github.io/img/my.png`, в то время как реальный адрес в опубликованной версии - `https://<YOUR_NAME>.github.io/<REPO_NAME>/img/my.png`.
