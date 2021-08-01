# mamezou-tech-site

mamezou-tech公開サイトリソース。

URL(実験用): <https://rd-test.mamezou-tech.com/>

## 記事投稿方法

### 1. featureブランチ作成

`main`ブランチより任意のFeatureブランチを作成してください。

ブランチ名は`feature/sample`のように`feature/`をプレフィックスにしてください。
コンフリクトを避けるためにブランチ作成時は必ず最新の`main`ブランチであることを確認してください（`git pull --rebase`で最新化）。

### 2. 記事作成

基本はマークダウンで記事を作成するだけです。  
凝った導線でページを作成したい場合は別途R&Dグループまでご相談ください。

作成する場所は`src/posts`配下です。カテゴリごとのディレクトリ内にマークダウン形式で記事を書いてください。  
注意事項としてはファイルの先頭に必ず以下を挿入してください。

```markdown
---
title: (記事のタイトル)
author: (あなたのお名前)
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
まずはgit(CLIでもGUIでもお好みのもので)で記事(画像がある場合は画像ファイルも)をコミットし、GitHubにプッシュしてください。
その後でGitHubのUIからFeatureブランチから`main`に対してPR(プルリクエスト)を作成してください。タイトルには（`XXXページを追加`等わかりやすいものにしてください）

PRが作成されるとNetlifyアプリが検知し、プレビュー環境にデプロイします。
デプロイが完了するとNetlifyアプリがPRのコメントにプレビュー環境用のURLを教えてくれますので、そこにアクセスして自分が作成した記事が想像通りに反映されていることを確認します。
レイアウト崩れ等不備がある場合は作成したFeatureブランチにコミットを重ねてプッシュすれば再度反映されます。

### 5. レビュー&マージ依頼

R&Dグループに対して内容のチェックを依頼してください。依頼方法はメールでもSlackでも何でもいいです。

### 6. 公開

R&Dグループメンバーが該当記事をマージし一般公開します。
ブログとかは書いた人がマージしちゃった方がいいかな（スピード感が大事）？

## その他

記事の作成だけでなく、レイアウト改善やSEO対応、新機能追加等のPR大歓迎！
グレート・ムタ事業部長より何かのボーナスがGETできるかもしれません！？

## 参考

- ホスティングサービス: [Netlify](https://www.netlify.com/)
- SSG: [eleventy(11ty)](https://www.11ty.dev/)
- CSS: [SASS](https://sass-lang.com/)
- テンプレートエンジン: [Nunjucks](https://mozilla.github.io/nunjucks/)
