---
title: ペアワイズ法テストケース生成ツール「PictMaster」の直交表を使う
author: shuichi-takatsu
date: 2023-02-05
tags: [テスト, pairwise, pict, pictmaster]
---

[前回](/blogs/2023/01/08/pictmaster-prototype-sheet-2-option/)はペアワイズ法テストケース生成ツール「PictMaster」の”原型シート”機能(因子編)について紹介しました。  
今回はペアワイズ法ではなく直交表を使って組み合わせテストケースを生成してみます。

## 直交表ってなに？

直交表とは，複数の因子・水準の組み合わせにおいて、任意の２因子について「水準の組み合わせが同じ回数だけ現れる」という性質をもつ”組み合わせ表”を指します。  

複数因子・水準を組み合わせてテストする時、因子間に「交互作用」が存在すると、テスト結果が影響を受ける場合があります。（交互作用とは２つの因子が組み合わさることで発生する相乗効果のことです）  
直交表の性質「水準の組み合わせが同じ回数だけ現れる」を使って、交互作用を相殺したり、交互作用の有無を判断することができます。  
(詳しいことは「実験計画法」で検索すると情報を得ることができます)

直交表は全ての因子・水準をバランスよくカバーしてますが、そこまでバランスを気にしない場合、直交表の「水準の組み合わせが同じ回数だけ現れる」という条件を緩和させて、「水準の組み合わせが１回以上現れればよい」としてテストケースを作成する方法がペアワイズ法です。  

## ３因子２水準の組み合わせテストケース

直交表を使って、３因子２水準の組み合わせテストケースを作成してみます。  
![](https://gyazo.com/ecc595ad6847958beb4cf97b43b51c3a.png)

PictMasterで直交表を使用するためには、環境設定の「生成方式」を「直交表」に設定します。  
（生成方式の下の「直交表」の枠の中が選択可能になりますが、ここでは「サイズ優先」を選択しておきます）  
![](https://gyazo.com/c87df3662e011d23442d352c1ed382cd.png)

直交表で作成したテストケースは以下のようになりました。  
![](https://gyazo.com/8c330ab7cafdccb4c4929c1e02a13747.png)

比較対象として、ペアワイズ法で作成したテストケースは以下のようになりました。  
![](https://gyazo.com/0f28b568342a9a85c486cd275bc18073.png)

この程度の因子・水準数であれば直交表とペアワイズ法の結果に大きな差は出ません。

## ５因子２水準の組み合わせテストケース

２水準の因子を５個にしてみます。  
![](https://gyazo.com/6d2b7f081b912de7db700fe986f49bcf.png)

直交表で作成したテストケースは以下のようになりました。  
![](https://gyazo.com/e2a846d54a4983b72f98dfe8dea4e594.png)

直交表なので、各列の水準の数は４個ずつの”同数”になっています。
![](https://gyazo.com/20edde14623a4383360a67f7fd139225.png)

比較対象として、ペアワイズ法で作成したテストケースは以下のようになりました。  
![](https://gyazo.com/34d6ed067860fa048579a70306cb2ed2.png)

直交表で生成したテストケース数は８個に、ペアワイズ法で生成したテストケース数は７個になりました。
組み合わせの条件が緩和されているので、ペアワイズ法のテストケース数の方が直交表のものよりも１個少なくなっています。

## どちらを使うべきか？

直交表もペアワイズ法も組み合わせテストケースを効率よく生成する手法ですが、直交表の方が制約が厳しいものになっている分、テストケース数は多めに生成されます。  
因子間の交互作用が無視できるケースではペアワイズ法でテストケースを生成する方がテストケース数の削減に寄与すると思いますが、交互作用が無視できない場合は直交表の利用を検討する必要があると思います。

## まとめ

組み合わせテストケースの生成に「直交表」を使うことによって、全ての因子・水準をバランスよくカバーするテストケースを生成できることがわかりました。  
PICTには他にも色々なオプションが用意されていて、PictMasterから利用可能です。  
次回も別のオプションを紹介していきたいと思います。

[ソフトウェアテストに関する技法やテクニックをまとめています。](/testing/)

テストに活用していただければ幸いです。