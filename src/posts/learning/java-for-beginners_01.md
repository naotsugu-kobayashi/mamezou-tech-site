---
title: 初心者のためのJavaプログラミング再学習（その1 基本データ型とオブジェクト型）
author: hiroaki-taka
date: 2022-09-07
tags: [java,初心者向け]
---

## はじめに
「初心者のためのJavaプログラミング再学習」と題して、初心者の方向けにJavaプログラミングの解説シリーズを立ち上げました。Javaプログラミングを網羅的にカバーするのではなく、新人研修等で躓く受講者が多い部分、一度勉強したけど理解が難しい部分に絞って執筆する予定です。どちらかといえば、厳密な理解よりも、イメージを掴んでもらうことを重視した内容です。

初回は「基本データ型とオブジェクト型」について解説します。イメージを掴んでもらうことを重視していますので、今回は現実世界での例え話を中心に構成しています。

なんと今回の記事、ソースコードが一行も出てきません（笑）。

:::alert
本記事の内容は本来であれば、「インスタンス」という用語も使用して説明をすべき内容です。しかし、初心者には「オブジェクト」と「インスタンス」という同様の概念で異なる用語が出てくるのは混乱を招くと考えられるため、本記事では「オブジェクト」という用語のみを用いて説明しています。
:::

## 教科書的な基本データ(プリミティブ)型とオブジェクト型の説明
まずは教科書的な視点で、基本データ型（プリミティブ型）とオブジェクト型について説明しておきます。

### 基本データ(プリミティブ)型
基本データ型は以下の8種類あり、データ型によって必要なバイト数がそれぞれ異なります。

|名前|サイズ|説明|
|:----|----:|:----|
|byte|1バイト|符号付き整数|
|short|2バイト|符号付き整数|
|int|4バイト|符号付き整数|
|long|8バイト|符号付き整数|
|float|4バイト|浮動小数点数（単精度）|
|double|8バイト|浮動小数点数（倍精度）|
|char|2バイト|文字（1文字のみ）|
|boolean|-|真偽値|

基本データ型の特徴は以下の通りです。
- 名前は必ず小文字
- 変数の型に利用できる
- 基本データ型の変数は、値を直接保持する

### オブジェクト型

オブジェクト型（オブジェクト）には、以下の特徴があります。
- 名前はクラス名であり、Javaではパスカルケースが慣習（単語の先頭が大文字になる。StudentやBankAccountなど）
- オブジェクトを利用するには、new演算子を使ったオブジェクト生成が必要
- オブジェクト型の変数は、オブジェクトへの参照（アドレス）が保存される

## 現実世界の話で「基本データ」と「オブジェクト」を例えてみる

今回、初心者の方にイメージを持ってもらえるように、例え話で基本データ型とオブジェクト型について説明してみたいと思います。

### オブジェクトは「建造物」、基本データ型は「建築資材」だと思ってみる

クラスはよく「オブジェクトの設計図」という説明がされます。このクラスには、コンストラクタを定義します。new演算子でコンストラクタが呼び出されたときに、メモリ上にオブジェクトが作られます[^1]。また、基本データ型は、クラスの属性を定義するために利用できますので、オブジェクトの構成要素と言えます。

[^1]:クラスから生成された実体、つまりコンピュータ上でシミュレートされたオブジェクトのことを本来であれば「インスタンス」と呼びます。

今回、オブジェクトは「建造物」に例えましょう。コンストラクタの英語表記[^2] からも、建造物という例えは違和感がないと思います。オブジェクトを生成するということは、現実世界でいう建造物を立てるというイメージです。

[^2]:constructor : 建設者、建設会社の意。

基本データ型は、オブジェクトという建造物の構成要素、つまり建造物を建てるために必要な「建築資材」という位置づけです。建築資材も、柱やボルト、板などさまざまで、それぞれ大きさが異なります。建築資材の種類がintやdoubleなどの名前、建築資材の大きさがバイト数に相当するイメージです。

![基本データ型とオブジェクトのイメージ](/img/edu/java-for-beginners_01-01.jpg)

<br>

### 変数は「土地の名前と用途を決めたもの」だと思ってみる

プログラム上では、データを保存するために変数を定義する必要があります。変数を定義するためには、変数名と変数の型が必要です。

これまで、「建築資材」や「建造物」という例えをしてきました。現実世界の建築資材や建造物は、保管するにも、建造物を建てるにもスペースが必要です。

変数名は「土地の名前」に相当すると考えましょう。現実世界では、「○○県○○市○○町xx番地xxに荷物を送る」という言い方よりも、「○○さんの家に荷物を送る」という方がわかりやすいですよね。

変数の型は「土地の用途」に相当すると考えましょう。これは、基本データ型かオブジェクト型かによって用途が変わってきますので後述します。

![変数のイメージ](/img/edu/java-for-beginners_01-02.jpg)

<br>

### 基本データ型の変数は「資材置き場」だと思ってみる

基本データ型変数の特徴は、値が直接保存されることです。

基本データ型は「建築資材」に相当しますので、基本データ型の変数は「資材置き場」と考えることができます。現実世界の建築資材はそれなりに大きなものなので、保管するためには場所が必要ですよね。

基本データ型の種類（int,dobuleなど）は、「保管する建築資材の種類」に相当します。当然、建築資材ごとに大きさは異なるため、確保しなければならない土地の広さも、建築資材によって異なります。

![基本データ型変数のイメージ](/img/edu/java-for-beginners_01-03.jpg)

<br>

### オブジェクト型の変数は「看板のみ立てられた土地」だと思ってみる

オブジェクト型の変数には、オブジェクトへの参照（アドレス）が保存されることになります。つまり、オブジェクトの実体はオブジェクト型の変数には保存されておらず、あくまでもオブジェクトの場所の情報を保存しているにすぎません。

オブジェクト型の変数は、「看板のみ立てられた土地」に例えましょう。どちらかといえば、「移転のお知らせ」に近いものかと思います。実際にメモリ上のデータがお引越ししたわけではないのですが（苦笑）。

お店が移転した際、移転のお知らせが掲載されていることが多いと思います。つまり、お店はこの場所にはないけど、移転のお知らせを見ればそのお店に行くことができます。オブジェクト型変数も、これと近い状況になっています。

![オブジェクト型変数のイメージ](/img/edu/java-for-beginners_01-04.jpg)

## まとめ
今回、基本データ型とオブジェクト型について、現実世界の建物に例えて説明してみました。表でまとめると以下のとおりです。

|名前|例え|
|:----|:----|
|オブジェクト|建造物|
|基本データ型|建築資材|
|変数|土地の名前と用途を決めたもの|
|基本データ型の変数|建築資材置き場|
|オブジェクト型の変数|看板（≒移転のお知らせ）のみ立てられた土地|

もちろん例え話ですので、厳密性を欠くところはあります。それでも、初心者の方の理解に少しでも繋がれば幸いです。

## 編集後記

今回の執筆に際して、意識した点が2つあります。

1点目は、できるだけソースコードを出さずに説明することです。結果として、ソースコードは記載していません。

2点目は、変数は「箱」、「入れ物」というよく使われる例えを避けることです。この例えは、変数は何かを分かりやすく説明する上では良い例えだと思います。しかし、オブジェクトの話になると辻褄が合わなくなり、些か役不足なのかなと感じています。また、箱や入れ物で説明しているケースが多いため、別の切り口の説明もあった方が良いのではと考え、今回の記事を執筆しました。

<br>
教育チームメンバーで次の記事も執筆しています。よかったらこちらもご一読ください。

- 豆蔵社員のリモートワーク環境ご紹介 
    - [その5 オンライン新人研修の環境](/blogs/2022/07/09/remote-env005/)
    - [その7 オンライン研修の快適な配信を目指して](/blogs/2022/08/10/remote-env007/)
- メイン講師体験記
    - [その1 準備編](/learning/main-teacher-experience_01/)
    - [その2 研修期間中編](/learning/main-teacher-experience_02/)
    - [その3 事後作業編](/learning/main-teacher-experience_03/)
- その他
    - [オンライン研修　成功させるために抑えるべき4つのポイント](/learning/online-lecture-tips/)