---
title: コードカバレッジの血の海から抜けて網羅度のBlueOceanを探そう
author: shinichiro-iwaki
date: 2023-08-01
tags: [テスト, summer2023]
summerRelayUrl: https://developer.mamezou-tech.com/events/season/2023-summer/
---
この記事は[夏のリレー連載2023](/events/season/2023-summer/)の7日目、バカンス枠の記事[^1]です！！ 

[^1]:　嘘です。夏といえば海 ということでタイトルだけでも夏を感じやすいようにしてみました。  

弊社では月次で「[豆寄席](https://mamezou.connpass.com/)」という技術イベントを開催していまして、先日のイベントではテスト界隈で著名な湯本剛氏に「[アジャイル開発におけるQAエンジニアの関わり方](https://mamezou.connpass.com/event/288071/)」という演題でご登壇頂きました。  

講演の主題[^2]も非常に示唆に富んだものだったのですが、トピックとして網羅について語られていた部分が筆者の心に刺さりました。そこで私見を多々交えつつ網羅度について整理してみたいと思います。  

[^2]:　開発の方法論に応じて変えるべきところ/変えてはならないところについて、氏の豊富な経験を踏まえつつ品質の文脈から語って頂きました。既に参加レポートを公開されている方もいるようですし、追って弊社からも参加レポートなど情報を公開するかと思います。  

## 改めて網羅度/Coverageとは
網羅度/Coverageを考えるにあたって、まずはどのような定義がなされているか[ISTQBの用語集](https://istqb-glossary.page/)を参照[^3]してみます。  

[^3]:　無論「この定義が全て」と言うつもりではないですが、人によって異なるものを指すことがままある言葉ですので、議論の基準としてISTQB用語集の定義を参照します。  

* カバレッジ（coverage）: 特定のカバレッジアイテム(=同値分割やステートメントなど基礎となる実体や属性)をテストスイートが遂行した度合。パーセンテージで表す。  

用語集ですのでちょっと堅苦しい感じの表現になっていますね。筆者の責任で口語訳すると「テスト対象をある尺度でモデル化(同値モデル、制御フローモデルなど)した際に、テストを実行することでカバーされるモデルの属性の割合」といったところでしょうか。  

つまり、カバレッジを論じる際には「対象をどのようにモデル化してどんな属性をもって充足を図るか」が非常に大切です。言い換えるならば、「カバレッジによってテスト対象についてどのような品質上の主張ができるか」に意味があるということです。  

:::column:よく言われる「カバレッジ」について 
開発をしているとよく出てくるC0/C1…といった「カバレッジ」を想定されていた方はこの定義を見て「??」となっているかもしれません。  
C0やC1といった指標で語られる「カバレッジ」はISTQBの用語集では「コードカバレッジ」として以下のように定義されています。カバレッジの1種類であるコードカバレッジが慣用的に「カバレッジ」と略されることもカバレッジの議論が噛み合いにくい一因かもしれないですね。  
* コードカバレッジ（code coverage）: テストスイートが、ソフトウェアのどの部分を実行（網羅）し、どの部分が未実行かを判定する分析手法。たとえば、ステートメントカバレッジ、デシジョンカバレッジ、条件カバレッジ。  
:::

## コードカバレッジの抱える課題
コードカバレッジはテスト対象の処理(自体)をカバレッジアイテムとした指標と言えます。言い換えると、「テストの際にカバーされたテスト対象のソースコード」について主張できます。  
比較的古くから用いられている指標値ですし、開発言語ごとに計測を支援するツールも提供されているので開発時に取得されている方も多いかと思います。  

さて、このコードカバレッジですが、「コードカバレッジの高さがテスト対象の高品質を意味する」かのように用いられることがあります。が、「テストの際にテスト対象のソースコードの多くの部分を使用して」いることは、必ずしもテスト対象の品質には結びつきません。  

コードカバレッジのアンチパターンについては様々に提唱されていますので詳細は省きますが、例えば以下のようにカバレッジの高さとテスト対象の品質が乖離することがあります。  
* [テストの質についてコードカバレッジは何の情報も与えない](https://martinfowler.com/bliki/TestCoverage.html)。例えばアサーションが無いテストでコードカバレッジ100%を達成することもできる  
* [ゼロ除算エラーのような処理フロー上は分岐しないが問題を引き起こすパターン](https://testing.googleblog.com/2008/03/tott-understanding-your-coverage-data.html)はコードカバレッジとは無関係に発生しうる(そのケースを担保しなくてもコードカバレッジ100％を達成できる)  

「十分にテストがされている」テスト対象のコードカバレッジは高い傾向にあることは筆者自身の経験からも違和感なく受け入れられます。ただし、そこから論理的に成り立つのは「コードカバレッジが低い」テスト対象は十分にはテストされていない[^4]ということだけです。コードカバレッジが高い場合にテスト対象が十分にテストされているかを知るには、コードカバレッジ以外の情報も含めて評価する必要があります。  

[^4]:　論理学で言う対偶命題ですね。ここで述べているのはテストを十分に行ったかどうかなので、テスト対象の品質に関しての良し悪しは分かりません。とはいえ、十分にテスト対象が確認されていないということは品質がどうであるか分からない、高リスクな状態であることは間違いありませんよね。  

そう、コードカバレッジが有効な「テスト対象の品質」の根拠になるには「妥当なテストが実行されている」という情報が必要になります。テストが十分であることをコードカバレッジから主張しようとしたら、ニワトリ卵問題になってしまいますね。コードカバレッジは低いときにテストが不十分であることを示す際には非常に有用な指標値ですが、高いときにそれだけをもってテストの質を評価できるものではありません。 

しかし、上記の内容を踏まえたうえでも、例えば顧客やマネージャなど非エンジニアの人に対してテストが十分であることを説明する際に定量的な指標が魅力的[^5]であることも事実ではあります。  

[^5]:　まだそういう人がいるかは分かりませんが、、、「コードカバレッジ何％?あ、90％ならもうちょっとで完璧だね」なんて反応する人も昔はいました。筆者もペーペーだったので「80→90の10％と90→100の10%が同じコストだと思いますか?」とか、「そもそもコードカバレッジって対象の品質については何の情報も与えないけどいいですか」なんて反論はできていません。

ということで、コードカバレッジ以外にテストの網羅度を語りうる技術を簡単に整理してみます。  

## 仕様/要求からのアプローチ
ISTQBの検証(Verification)/妥当性確認(Validation)の定義から、テストとは「定めた振る舞いを達成することを客観的な証拠をもって示すこと」になると筆者は捉えています。  

「定めた振る舞い」は開発時に要件、仕様やユーザーストーリー、ユースケース等の形で合意されるものですので、これをどの程度網羅できているかを計測できれば網羅度の説得力としてはコードカバレッジより高いものになりそうです。その観点からのアプローチを考えてみます。  

### モデルベーステスト
要件、仕様、ユーザーストーリーなどの「定め」は自然言語を利用して定められることが多いかと思います。自然言語は曖昧さを内包[^6]しているため、定めた内容については解釈による差異が発生する可能性があり、そのまま網羅の対象とすることにはやや難があります。  

[^6]:　筆者は言語学者ではないので経験的に感じているに過ぎませんが、こと日本語に関しては行間や文脈をあわせないと意味が確定できない表現も多く 解釈のズレが起きることが多いですよね。同じ言葉が複数の解釈余地を持つ事例としては「このはしとおるべからず」(橋?端?)や「黒い尻尾の大きな犬」(大きくて黒い尻尾をもつ犬?、尻尾が大きい黒犬?、尻尾が黒い大型犬?)の解釈ズレなどがあります。  

テスト対象の「定め」を解釈ズレが少ないようにテスト用のモデル[^7]として表現し、モデルが表現する属性を(意味付けられたパターンに従って)保障するようにテストを設計することをモデルベーステストと言います。モデルの種類はテスト対象の「担保すべき特性」に応じて選択されうるものです。少し古い講演資料ですが、[電気通信大学の西康晴氏の講演資料](https://www.jasst.jp/archives/jasst07e/pdf/D4-1.pdf)では例として以下のようなモデルが紹介されています。  

 - フローモデル[^8]:ロジックを確認する  
 - 状態遷移モデル:GUIなど、テスト対象の状態が振る舞いに関与するものを確認する  
 - 組み合わせモデル:条件を組み合わせた際の振る舞いを確認する  

[^7]:　[ISTQBの用語集](https://istqb-glossary.page/jp/%E3%83%A2%E3%83%86%E3%83%AB%E3%83%98%E3%83%BC%E3%82%B9%E3%83%88%E3%83%86%E3%82%B9%E3%83%88-model-based-testing/)などを確認すると、モデルの来歴については現時点で特に定めがありません。即ち、要求や仕様がモデルで表記されていようが、自然言語で書かれているものをテスト用にモデル化しようが、一定のルールに従って図表として規定されたものがテスト用のモデルになるということです。  

[^8]:　制御フローモデル(対象ソースコードのロジックをモデル化したもの)を対象にテスト設計をすると、ロジックの経路を網羅するような＝ソースコードを漏れなくカバーするような テストになりますね。本記事はコードカバレッジにケンカを売るようなタイトルにはなっていますが、このように「ロジックをカバーする」ことを目的としたテスト設計の結果として(対象ロジックの)コードカバレッジがxx% ということであればそれは非常に意味のある指標だと思います。  

上記のモデルに対しテストが行われた要素の割合(モデルカバレッジ)を計測すれば、要件や仕様として定めた内容に対しどの程度の条件を網羅しているのか定量的に計測できます。モデルカバレッジ＝「定めた内容」を担保している割合 を示すことができれば、テスト対象の品質を示す指標としては直感的にも納得度が高くなります。  

難点としては(コードカバレッジに比べると)人が計測したり計測の仕組みを構築する必要がある等、計測にかかるコストが大きくなりがち点が挙げられます。またフローモデル(状態網羅、分岐網羅など)や状態遷移モデル(Ｎスイッチ網羅など)のように網羅度を評価する方法論が確立されているものを除き、要素の網羅基準[^9]についても定める必要が出る可能性もあります。  

[^9]:　例えばシーケンスをテストモデルとした場合、代替も含めたシーケンス経路(正常に処理が進むシーケンス)を網羅すれば十分なのか、エラー応答など中断するパターンを含めて全量とするか、等の基準を定めないと定量化はできませんよね。  

また、テスト対象の品質に関してはテストモデルの質(評価すべき項目を適切に抽出したモデルになっているか)にも影響を受けます。適切にテストを設計しないと品質に寄与できないのはモデルベーステストに限った話ではないのですが、カバレッジの対象とする場合はテスト設計の質の影響がより大きくなるということですね。  

### 受入テスト駆動開発
受入テスト駆動開発 は、テスト駆動開発(TDD)/振舞い駆動開発(BDD)の文脈やアジャイル開発の文脈で語られることが多いアプローチです。  

テスト駆動/振舞い駆動開発を簡単に説明すると、まず対象が満たすべきテスト/振舞いを定義し、定義どおりに動作するように対象を変更していくサイクル状のアプローチです。  

受入テスト駆動開発はそのサイクルを顧客(テスト対象の受入者)との間にまで拡張したものになります。要求事項(ユーザーストーリーなど)は比較的詳細な定義がされないことが多く、解釈ずれのリスクが高くなりがちです。そこで提供しなければならないビジネス意図を確認するための「受入テストケース」として、誤解を生みにくい詳細度まで定めたものを合意し、それを満たすように開発を進めていきます。  

テスト対象の「定めた振る舞い」を網羅するという観点から見れば、ユーザーストーリーのうち「受入れテストケースとして合意された」ものを保障すべき全量とすることで、提供すべきビジネス意図を網羅[^10]していることを主張できます。  

[^10]:　網羅度の評価について議論してもいいですが、受入テストケースのカバー率は意味合いからして「100％成功ではない状態」は「合意済みの受入条件のうち提供できないものがある」のです。どういった観点で評価するかを考えても、、、ねえ  

もちろん、テスト対象の品質という意味では合意した受入テストケースが成功さえしていればそれだけで十分というのは乱暴な理論です。明示的に合意したビジネス価値のみで十分な品質になる(＝顧客の満足が得られる)とは限りませんので、テスト対象を評価するテスト(主としてユーザビリティ評価や性能などユーザーストーリーに現れにくい部分など)を上手く併用していくように、テストの全体像はしっかりと計画/設計するべきです。とはいえ、合意したビジネス価値を網羅的に保証しているというのは網羅度の主張としては非常に強いカードになりそうです。  

難点は顧客側にかなり強いコミットを要求することでしょうか。特に「初期の対象物が開発されていない状態」で顧客側と「このテストケースが成功したらこの要求事項は達成でいいですよね?」なんてやるのは、相当に良い関係性を築いたうえでないと難しいものがありそうです。  

## ソースコードからのアプローチ
テスト対象の「定めた振舞い」を起点とする網羅度について整理してきましたが、テストが十分であることを「誤りがあった場合の検出能力」をもって説明するという別のアプローチもあります。  

テストの「誤り検出能力」について、テスト(ケースやコード)のレビューにて適切な条件を確認していることをもって説明することもあるかと思います。しかし、「レビューが十分であること」はどうしても定性的な評価に寄ってしまうため、定量的な指標に比べると説得力が弱くなる傾向があります。  

それに対し、意図的に混入した誤りをテストを行うことで検出できるかを指標としてテストの質を評価する考え方(エラーシーディング、ミューテーションテストなど)があります。混入した誤りの検出する能力でテストの質を評価するアプローチは考え方としては数十年前から存在しており、論文なども発表されてきているようです。が、ソフトウェア開発業務に日常的に活用する事例は比較的最近まで見られません[^11]でした。  
  
[^11]:　筆者が寡聞なだけかもしれませんが、2010年代前半までは実際の開発に活用したという話は聞いていません。「誤りを埋め込んで検出可否を評価」するアプローチなので費用対効果的に(間違ったコードを埋め込んでテストする のである程度のコストをかけないとできない手法です)選ばれてこなかったものと思います。  

しかし、ミューテーションテストを支援するツールの開発が進んできている[^12]こともあり、近年注目を集めつつあるアプローチになっています。この手の試みをどんどん行って公開してくれることで有名なGoogleから2017年に[実績に基づいた論文](https://research.google/pubs/pub46584/)も公開されていますね。  

[^12]:　主要な開発言語であれば何かしらのミューテーションテストツールが公開されている模様です。筆者が全部使っているわけでもないので、具体的な情報については[まとめてくれている方のページ](https://github.com/theofidry/awesome-mutation-testing)の紹介に留めます。  

### ミューテーションテストとは
ミューテーションテストはテスト対象が誤った振舞いを示すように、条件(例:条件判定の不等号を逆転する)に基づいて機械的に改変した対象(ミュータント)を作成します。テストが誤りの混入に対して頑健(条件誤りによる挙動変化を検知できるように境界値をテストしている)になっていれば、ミュータントに対して実行した際に、改変由来で発生した振舞いの変化をテスト失敗として捕捉するはずです。  

ミュータントをテストした際に、改変を「テストの失敗」として正しく検出(ミュータントをkill)できたかによってテストの質を評価します。生成した改変に対してきちんと「テスト失敗によって検出できた」割合をミューテーションカバレッジ(あるいはミューテーションスコア)と呼びます。  

様々なパターンの改変に対してミューテーションカバレッジが高い[^13]ということは、開発中に誤りが発生していたとしてもテストで検出して修正できるということを意味しますので、ソースコードに対して確認すべきパターンをテストできていることを示す網羅度となります。  

[^13]:　ツールによる改変は機械的に行われますので、例えばログ出力部分などテスト対象の振る舞いとして主要でない箇所であっても条件に従って改変されます。そのため盲目的に100%を目指すことの意味は薄いのですが、どんな改変がカバーされていないかの情報を含めテストの十分性を測る指標としては説得力が高いものと思います。  

数値だけで評価できるものではないのですが、「コードカバレッジ80％」と「ミューテーションカバレッジ80％」を並べた場合にはミューテーションカバレッジ80％のほうが様々なパターンをきちんとテストしていることを示せるように筆者は感じます[^14]。  

[^14]:　ミューテーションのパターンが少なかったり、偶々設定した改変が発生し難いコードだったり、といった可能性は当然あります。当然のことですがこれ1つで完璧というものではないですが、コードカバレッジと比較すると「誤り混入を検知する能力」のほうがよりテストの十分性を語れる指標になります。  

難点は、ツールが機械的に処理するとはいえ「改変→テスト→テスト結果の評価」を繰り返すことになるので、テストのコスト(実行時間など)が高くなることです。採り入れる際にはテスト対象をどうするか(全体を対象にミューテーションテストを実施するのはコスト効果が悪いので変更部分のみをミューテーションテストの対象とする 等)など、どのようなアプローチを採るかをしっかりと定めておく必要があります。  

また、テストのパターンなどが充足していることの根拠にはなりえますが、テスト誤り(「正解」を間違えたテストコードなど)については評価できません。テスト対象の品質を語るには別の評価との組み合わせが必要になります。  

## まとめ
網羅度のBlueOceanを探そうというテーマで色々とご紹介してきましたが、泳いでみたい魅力的な海はありましたか。  

| 網羅度の指標 | Good^^ | Bad--; |
| ---- | ---- | ---- |
| コードカバレッジ | 比較的簡易に測定できる <br> テスト不十分な場合の指標として信頼できる | カバレッジの高さは必ずしもテストが十分なことを示さない <br> (けれども誤解に基づいて100%を求める人もいるかもしれない) <br> テスト対象の品質については別評価との組み合わせが必要 |
| モデルカバレッジ | 対象とした要件や仕様の属性網羅なので品質と結びつけやすい | モデルによっては評価指標などから検討する必要がありコスト高となる <br> テスト対象の品質についてはモデルの質に左右される |
| 受入テストケースの網羅 <br> （受入テスト駆動開発） | 全量が顧客と合意した内容になるため開発のゴール指標として定めやすい | 顧客の理解やコミットが必要なため導入障壁は高い <br> テスト対象の品質については別のアプローチで補強が必要 |
| ミューテーションカバレッジ | テストの頑健さ(誤りがあった場合の検出能力)を示せる | 手法上、テスト実行時間などのコストがかかる <br> テスト対象の品質については別評価との組み合わせが必要 |


網羅度の指標に何を選択したとしても、現時点ではその値のみでは完全な評価にはなり得ません。「何を保証するためにどういった指標で評価するのか」をしっかり計画/設計することが大切になります。カバレッジに苦しんでいる方がいたら、「何を網羅したいのか」しっかり頭に汗を書いてもらうとその先に綺麗な海があるかもしれませんね。  

長い文章になってしまいましたがお付き合いくださった方はありがとうございます。暑い日が続きますので、気分だけでもBlueOceanを感じてもらえればということで筆者から泳いでみたい海のイメージだけを贈らせていただきます。

![Infinit Blue](/img/blogs/2023/0801-blue-ocean-image.jpg)