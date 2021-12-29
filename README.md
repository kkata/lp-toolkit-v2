LP 開発環境

以下の環境で動作を確認しています。

- macOS Mojave 10.14.6
- Node.js 16.2.0
- npm 7.13.0

Node.js のバージョンは[nodenv](https://github.com/nodenv/nodenv)で固定しています。

## 環境構築

Node.js 16.2.0 以上がインストールされていれば、以下のコマンドでローカルサーバ（[http://localhost:3000](http://localhost:3000)）が立ち上がります。

```bash
$ cd このディレクトリへのパス
$ npm ci
$ npx husky install
$ npm run gulp
```

[EditorConfig](https://editorconfig.org/) の使用を推奨します。  
また、Git コミット時に、[Prettier](https://prettier.io/) でコードフォーマットを行います。

## ディレクトリ構成

```
.
├── public
├── release
└── src
    ├── css
    │   ├── common
    │   │   ├── _components.scss
    │   │   ├── _generic.base.scss
    │   │   ├── _generic.normalize.scss
    │   │   ├── _generic.reset.scss
    │   │   ├── _objects.layout.scss
    │   │   ├── _objects.wrappers.scss
    │   │   ├── _settings.global.scss
    │   │   ├── _tools.mixins.scss
    │   │   ├── _trumps.links.scss
    │   │   └── _trumps.utility.scss
    │   └── hoge
    │       ├── _page.hoge.scss
    │       └── hoge.scss
    ├── html
    │   ├── _partial
    │   │   ├── footer.pug
    │   │   └── header.pug
    │   ├── index.pug
    │   └── hoge
    │       └── hoge.pug
    ├── img
    ├── js
    │   ├── common.js
    │   ├── modules
    │   │   ├── Drawer.js
    │   │   └── LinkScroll.js
    │   └── hoge
    │       └── hoge.js
    └── ssi
```

### `src/`

コンパイルなどの処理をさせるファイルはこのディレクトリ配下に配置します。

### `src/html/`

HTML にコンパイルされる前のテンプレートファイルをこのディレクトリに配置します。  
テンプレートエンジンは[pug](https://pugjs.org/api/getting-started.html)を使用しています。

### `src/css/`

CSS にコンパイルされる前の [Sass](https://sass-lang.com/) ファイルをこのディレクトリに配置します。  
設計は[ITCSS](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)、[inuitcss](https://github.com/inuitcss/inuitcss) などを参考にしています。  
[stylelint](https://stylelint.io/) でフォーマットを行います。

#### 暫定ルール

- id セレクターは原則使用禁止
- id 名、class 名はケバブケース
- モバイルファーストでコーディング（PC の CSS はモバイルを上書きするようにする）
- z-index について、`common/` 内では 100 を基準に 10 刻みで指定
- JavaScript で扱う id 名と class 名は `js-` のプレフィックスを付ける
- JavaScript で状態変化に伴って付与する class 名には `is-` のプレフィックスを付ける
- アンカーリンクに使用する id 名には `anc-` のプレフィックスを付ける

### `src/js/`

コンパイルされる前の JavaScript ファイルをこのディレクトリに配置します。  
ファイルは[Babel](https://babeljs.io/)でトランスパイルされて[Webpack](https://webpack.js.org/)でバンドルされます。

### `src/img/`

画像を配置します。  
自動で圧縮されます。

### `src/ssi/`

SSI のインクルードファイルを配置します。  
ローカルサーバでの確認用です。

### `public/`

ローカルサーバで確認するためのファイルが出力されます。  
Git で管理しません。  
このディレクトリのファイルを直接編集することは推奨しません。

### `release/`

サーバにアップロードするファイルが出力されます。  
Git で管理しません。  
このディレクトリのファイルを直接編集することは推奨しません。

## 開発

以下のコマンドでローカルサーバを立ち上げます。  
pug、scss、js、画像を更新するとブラウザ（chrome）がオートリロードします。

```bash
$ npm run gulp
```

以下のコマンドで、サーバにアップロードするファイルが出力されます。

```bash
$ npm run release
```

## 参考

[https://github.com/manabuyasuda/website-template](https://github.com/manabuyasuda/website-template)  
[普通の HTML の書き方](https://github.com/hail2u/html-best-practices/blob/master/README.ja.md)  
[フロントエンドチェックリスト日本語訳](https://github.com/miya0001/Front-End-Checklist)
