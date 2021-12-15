# mamezou-tech-site

mamezou-tech公開サイトリソース。

URL: <https://developer.mamezou-tech.com/>

## 記事投稿方法

### 1. Featureブランチ作成

`main`ブランチより任意のFeatureブランチを作成してください。

ブランチ名は`feature/sample`のように`feature/`をプレフィックスにしてください。
コンフリクトを避けるためにブランチ作成時は必ず最新の`main`ブランチからブランチを切っていることを確認してください（`git pull --rebase`で最新化）。

### 2. 記事作成

基本はマークダウンで記事を作成するだけです。  
凝った導線でページを作成したい場合やマークダウン以外の形式で書きたい場合は別途R&Dグループまでご相談ください。

作成する場所は`src/posts`配下です。
ブログ記事の場合は`src/posts/blogs/<year>`配下に`mmdd_<title>.md`で作成してください。ブログ記事以外の場合は別途R&Dグループにご相談ください。

あとはマークダウン形式で記事を書くだけです。  
注意事項としてはファイルの先頭に必ず以下を挿入してください。

```markdown
---
title: (記事のタイトル)
author: (あなたのお名前)
date: (記事の作成日)
---
```

これ以降にあなたの持てる知識をマークダウンに書き下ろしてください。  
画像を貼り付けたい場合はgyazo等にアップロードしたリンクを使うか、`src/img/`配下に適当なディレクトリを掘ってそこに配置した画像をマークダウンでリンクしてください。

```markdown
アップロード画像へのリンク(png等の画像リンクにしてください)
![](https://i.gyazo.com/a6fc0564284c2a417db133a24a3a8432.png)

src/imgに配置した画像へのリンク
![](/img/sample/cool.png)
```

### 3. ローカルで動作確認

作成した記事はローカル環境で確認できます。

初回はnpmモジュールをインストールしてください(node.jsは事前にセットアップしてください。v14.17で動作確認済みです)。

```shell
# 初回のみ
npm install
```

2回目以降はプロジェクトルートで以下を実行します。

```shell
npm start
```

静的コンテンツのビルドが始まりローカルにWebサーバーが起動します。  
通常はブラウザで<http://localhost:8080>からアクセスできます（ポートが衝突した場合は8081とかになります）。

ホットリロードが有効なのでこの状態で変更すると即時反映されます。


### 4. プレビュー確認

次に実際にプレビュー環境にアップロードして確認します。

*直接`main`ブランチにマージ&プッシュしないでください！*

まずはgit(CLIでもGUIでもお好みのもので)で記事(画像がある場合は画像ファイルも)をコミットし、GitHubにプッシュしてください。  
その後にGitHubのUIからFeatureブランチから`main`に対してPR(プルリクエスト)を作成してください。
タイトルには（`XXXページを追加`等わかりやすいものにしてください）

PRが作成されるとNetlifyアプリが検知し、プレビュー環境に自動デプロイしてくれます。  
デプロイが完了するとPRのコメントにプレビュー環境用のURLを教えてくれますので、そこにアクセスして自分が作成した記事が想定通りに反映されていることを確認します。  
レイアウト崩れや誤字等不備がある場合は作成したFeatureブランチにコミットを重ねてプッシュすれば再度反映されます。

### 5. ソーシャルイメージ作成(ローカルビルド)

TwitterやFacebook等で使うソーシャルイメージを作成します。
ローカルで以下コマンドを実行してください。ソーシャルイメージが`src/previews`に作成されます。これらはコミット&プッシュしてください。

```shell
npm run build:local
```

### 6. レビュー&マージ依頼

R&Dグループに対して内容のチェックを依頼してください。  
以下メーリングリストに対してPRへのURLを添えて公開依頼してください。

R&Dグループメーリングリスト: <dept-bs-randd@mamezou.com>

### 7. 公開

R&Dグループメンバーが該当記事をマージし一般公開します。  

## その他

記事の作成だけでなく、レイアウト改善やSEO対応、新機能追加等のPR大歓迎！
グレート・ムタ事業部長から何かのボーナスがGETできるかもしれません（お約束はできません）！？

## 参考

- ホスティングサービス: [Netlify](https://www.netlify.com/)
- SSG: [eleventy(11ty)](https://www.11ty.dev/)
- CSS: [SASS](https://sass-lang.com/)
- テンプレートエンジン: [Nunjucks](https://mozilla.github.io/nunjucks/)
