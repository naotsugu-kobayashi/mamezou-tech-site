---
title: Pytestを使ってみる（その１：準備編）
author: shuichi-takatsu
date: 2023-03-01
tags: [テスト, pytest]
---

Pythonでプログラムを書いていて「TDD（テスト駆動開発）」にトライしてみたいと思ったことは無いでしょか？  
そんなときは「テスティングフレームワーク」がおすすめです。  
JavaではJUnitが有名ですが、Pythonにもテスティングフレームワークが用意されています。  
Pythonには標準装備の「unittest」というテスティングフレームワークがありますが、今回は人気のある「Pytest」を紹介します。  

## Pytest とは

Pytestとは、Python用に設計された単体テスト用のフレームワーク（テスティングフレームワーク）です。  
Pytestは、Pythonに標準装備のunittestの欠点を克服するために開発されたモジュールで、unittestよりもテスト構文が直感的に書けるようになっています。  

## Pytest のインストール

インストールは非常に簡単です。  
次のコマンドでインストールします。

```shell
pip install pytest
```

## 簡単なサンプル

Pytestを試すための簡単なサンプルプログラムを作ってみましょう。  
「test_sample.py」という名称のテキストファイルを作成し、以下のプログラムを記述します。  
(ファイル名の先頭は「test_」で書き始めるのが慣習のようです。今回もそれに習います)  

```python
def test_ok():
    a = 1
    b = 1
    assert a == b

def test_ng():
    a = 1
    b = 1
    assert a != b
```
１つ目の関数「test_ok」は、２つの変数が「＝（イコール）」であるかどうかをアサーションで確認しています。  
２つ目の関数「test_ng」は、２つの変数が「！＝（ノット・イコール）」であるかどうかを確認しています。  
実行したときの結果として「１つ目の関数は成功」「２つ目の関数は失敗」するように設計・実装しました。  

上記のプログラムを  
```shell
python -m pytest test_sample.py
```
または
```shell
pytest test_sample.py
```
で実行します。

実行結果が以下のように表示されました。  
![](https://gyazo.com/86e8f2c36b05e4c285be3cbb63d9f851.png)

実行結果を見ると   
- １つ目の関数「test_ok」は成功
- ２つ目の関数「test_ng」は失敗

になっています。  
失敗した方の関数の方は、どのような理由でテストに失敗したのかについて変数の値を示して説明が出力されています。  
Pytestが正しく動いていることがわかります。  

## まとめ

今回は簡単ではありますが、「Pytest」のインストールと簡単なサンプルを紹介しました。  
以前連載した[「Google Test を使ってみる」編](/testing/#google-test)の「GoogleTest」の環境構築より、Pythonの場合はpipがすべてサポートしてくれるので簡単に構築できました。  
今後もいろいろなPytestの使い方を紹介していきたいと思います。  

[ソフトウェアテストに関する技法やテクニックをまとめています。](/testing/)

テストに活用していただければ幸いです。