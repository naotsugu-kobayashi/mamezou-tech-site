# mamezou-tech-site

[![Netlify Status](https://api.netlify.com/api/v1/badges/585ee948-cb8f-4598-a37f-e6304bfee394/deploy-status)](https://app.netlify.com/sites/peaceful-bassi-80a807/deploys)

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
tags: (つけるタグがあれば)
---
```

これ以降にあなたの持てる知識をマークダウンに書き下ろしてください。

以下に執筆時に役立つTipsがありますので、適宜参考にしてください。

- [記事執筆に関するTips集](/author-tips.md)

### 3. 校正
文章を[textlint](https://github.com/textlint/textlint)で校正してください。

```shell
npm run textlint -- src/posts/path/to/article.md
```

スペルミスや句読点モレなど単純に対応できるものは対応し、それ以外の指摘についても検討・対応すると文章の質が向上します。

### 4. ローカルで動作確認

作成した記事はローカル環境で確認できます。

初回やpackage.jsonの依存ライブラリ変更時はnpmモジュールをインストールしてください(node.jsは事前にセットアップしてください。v16以上推奨)。

```shell
# 初回のみ OR package.json変更時
npm install
```

2回目以降はプロジェクトルートで以下を実行します。

```shell
npm start
```

静的コンテンツのビルドが始まり、ローカルにWebサーバーが起動します。  
通常はブラウザで<http://localhost:8080>からアクセスできます（ポートが衝突した場合は8081とかになります）。

ホットリロードが有効なのでこの状態で変更すると即時反映されます。

### 5. プレビュー確認

次に、実際にプレビュー環境にアップロードして確認します。

*新規作成時は直接`main`ブランチにマージ&プッシュしないでください！*

まずは、git(CLIでもGUIでもお好みのもので)で記事(画像がある場合は画像ファイルも)をコミットし、GitHubにプッシュしてください。  
その後に、GitHubのUIからFeatureブランチから`main`に対してPR(プルリクエスト)を作成してください。
タイトルには（`XXXページを追加`等わかりやすいものにしてください）

PRが作成されるとNetlifyアプリが検知し、プレビュー環境に自動デプロイしてくれます。  

デプロイが完了するとPRのコメントにプレビュー環境用のURLを教えてくれますので、そこにアクセスして自分が作成した記事が想定通りに反映されていることを確認します。  

レイアウト崩れや誤字等不備がある場合は作成したFeatureブランチにコミットを重ねてプッシュすれば再度反映されます。

また、PR作成時にGitHub ActionsでOGPイメージの作成が実行されます。ここではOGPイメージを作成後にPRのソースブランチにコミットします。

このため、PRにコミットを重ねるときは、その前にFeatureブランチを最新化(`git pull -r`でgithub-actionsのコミットを取り込む)してください。

なお、自分が作成した記事とは異なるOGPイメージが差分とでることもありますが、そこは無視して構いません。自分の記事のOGPイメージが追加されていれば問題ありません。

### 6. レビュー&マージ依頼

以下のSlackチャンネルで、PRのチェックを依頼してください。

Slackチャンネル: [#developer-site](https://app.slack.com/client/T04HZJZ9U/C034MCKP4M6)

### 7. 公開

R&Dグループメンバーが該当記事をマージし一般公開します。  

公開後に誤字脱字や内容誤り等の修正は`main`ブランチに直接コミットしてかまいません。

## その他

記事の作成だけでなく、レイアウト改善やSEO対応、新機能追加等のPR大歓迎！

グレート・ムタ執行役員から何かのボーナスがGETできるかもしれません（お約束はできません）！？

## 参考

- ホスティングサービス: [Netlify](https://www.netlify.com/)
- SSG: [eleventy(11ty)](https://www.11ty.dev/)
- CSS: [SASS](https://sass-lang.com/)
- テンプレートエンジン: [Nunjucks](https://mozilla.github.io/nunjucks/)
