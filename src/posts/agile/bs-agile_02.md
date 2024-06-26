---
title: 業務システムにおけるアジャイル その2：業務フローを元に考える
author: makiko-nakasato
date: 2023-11-07
prevPage: ./src/posts/agile/bs-agile_01.md
nextPage: ./src/posts/agile/bs-agile_03.md
---

## はじめに
中佐藤です。なんだかんだで1回目から間が空いてしまいました。

本連載2回目で、「業務フロー」を取り上げます。業務フローがどのようなものかは前提知識として説明を省きます。
そしてこれが前回予告した「イケてるプロダクトオーナー」vs「イケてないプロダクトオーナー」の話につながります。
（プロダクトオーナーは以下、POと略します）

## POが見るべき範囲
前回、業務システムの範囲は「人の動きも含めてシステムである」というお話をしました。では、（コンピューターシステムだけではなく）人の動きも含めたシステムをわかりやすく表現しているものは何かというと、これが業務フローではないかと思います。
私の経験上、システム部門ではない、ユーザー部門の方にも、少し説明すれば理解いただける図が業務フローです。会社様によっては、業務フローをユーザー部門で作成されていることもあります。
例えば、こんなイメージ（豆蔵の要求開発手法の研修で使用している図を流用します。ある家具販売会社の店頭でのやりとりを示していると思ってください）：

![基本の業務フロー](/img/agile/bs-agile_02-1.png)

基本的にはUMLのアクティビティ図の記法を使っていますが、記法は何でも構いません。このようにシステムレーンを別途出さない書き方もあると思いますが、今回はこのほうが端的に説明したいことを説明できるので、この書き方を採用します。
システムレーンの中のひとつひとつの箱が、ざっくりとしたプロダクトバックログアイテム（ユーザーストーリー）になる想定です。

まずはここから「イケてないPO」の関心範囲はどこかというと：

![イケてないPOの場合](/img/agile/bs-agile_02-2.png)

この黄色の枠の部分、つまり、システムレーンしか見ていません。
ここしか見ていないとどんな問題があるか。開発が順調で予定通りすべての機能が作成できるであればよいのです。ところが、開発はそれほど甘くない（だからこそアジャイル開発を採用しているとも言えます）。かなりの確率でスコープ調整が必要になります。その際に、POとユーザー部門で発生しがちな会話がこんな感じ：

PO「期限までに間に合わなさそうなので、『在庫を検索する』機能を削りたいのですが」
ユーザー「えー、困るよ、業務が回らなくなる」

こういう場合、たいていは業務現場の声が優先されるので、POはブツブツ言いながら、結局開発者に残業などの無理を強いることになります。
開発側にいる人は、これを「またユーザーがワガママだから」「うちの会社では結局アジャイル開発は機能しない」と言いがちですが、本当に「ユーザーのワガママ」なんでしょうか。私はPOにかなりの割合で責任があると思っています。

これが「イケてないPO」だとしたら、では「イケてるPO」の関心範囲はというと、ここ：

![イケてるPOの場合](/img/agile/bs-agile_02-3.png)

つまり業務フロー全体です。
再度繰り返します。「人の動きも含めてシステム」なのです。そのためには、業務フローの、システムレーンだけではなく、全体を見てユーザーと会話をする必要があるのです。
コンピューターで行うところだけを見ているのではなく、それをユーザーがどういう業務の中で、どう使うか、それをPOは理解している必要があります。
だからこそ、優先すべきことと、そうではないことを分割して提案できるのです：

PO「『在庫を検索する』機能の中でも、この業務ではこう使うはずだから、それ以外は一旦後回しにできるのでは」

POは業務側・ユーザー側の人であるべき、とか、システム側からPOを出すのであれば業務・ユーザーをよくわかっているべき、と言われるのは、結果としてこういうことではないかと思います。

## 従来の考え方からの転換
こういうシステムの作り方、実は従来の開発方法の効率化の考え方には反します。

従来の開発は、システム機能開発を効率的に行うため、似たような機能をすべて集めてひとつのユースケースにする傾向があります。例えば今回の例で言えば、在庫検索機能はおそらく様々な業務場面で使われるはずで、その使われ方の異なる在庫検索機能を集めて一挙に作ったほうが、開発としては効率がよいのです。
この考え方で要件定義をしていると、アジャイル開発でもひとつのユーザーストーリーが大きくなる傾向になります。

これで開発に支障がなければよいのですが、上のような状況でストーリーを分割する際には、業務に立ち戻って考える必要があります。
その際に、「こんなに断片的に作っては効率が悪い」と難色を示される場合がありますが、ここには発想の転換が必要です。

業務システム開発の場合は、あくまでも、まずどの業務が成り立つようにするかという、業務を含めた優先順位を考えます。
そのため、ソフトウェアの作りとしては、断片的になる可能性はあり、その部分は開発側のリファクタリング等の工夫で補う必要があるのです。

では、次回またどこかで。
