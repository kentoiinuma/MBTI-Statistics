# [MBTIデータベース](https://www.mbti-database.com/)
[![Image from Gyazo](https://i.gyazo.com/658c850fedea3db773a8125bef23ca9c.png)](https://gyazo.com/658c850fedea3db773a8125bef23ca9c)
[MBTIデータベース](https://www.mbti-database.com/)は、MBTIタイプに紐付けて好きな作品を共有するwebアプリです。
投稿された作品はグラフとしてデータベース化され、フィルタリングすることで気になるタイプの好きな作品を見ることができます。

[MBTIとは？](https://ja.wikipedia.org/wiki/MBTI)

## サービスへの想い
### なぜMBTIタイプごとの好みをデータベース化するのか？
インターネット上ではMBTIタイプごとの具体的な好みについて語る人が多く見られたのですが、あくまでその人たちの直観や肌感覚に依存するため、説得力が発信者の信用に基づいてしまうことに課題を感じました。
そこで、実際にデータを取って確かめたいという思いから、このサービスを作成しました。

### なぜ作品なのか？
MBTIは個人の指向によってタイプを分類する類型論です。そのため、何かをデータベースに投稿・SNSに共有するとしたら、多種多様な表現方法を持つ作品が個人の指向を最も反映でき、作品を通してタイプごとの好みの傾向が表れるのではないかと思ったからです。

## メイン機能の使い方

| MBTIタイプの登録 | 好きな作品の投稿とX共有 | データベースの閲覧 |
|------------------|------------------------|-------------------|
| [![Image from Gyazo](https://i.gyazo.com/e652d874443276e429eaf289504f3f58.png)](https://gyazo.com/e652d874443276e429eaf289504f3f58) | [![Image from Gyazo](https://i.gyazo.com/9258e5671cf51f19bf3654ee50b98d4e.jpg)](https://gyazo.com/9258e5671cf51f19bf3654ee50b98d4e) | [![Image from Gyazo](https://i.gyazo.com/e323440e74b83a257f6bd66bd6e51e1a.png)](https://gyazo.com/e323440e74b83a257f6bd66bd6e51e1a) |
| - サインアップ後、モーダルが表示されるので、MBTIタイプを登録してください。<br>- [おすすめの16タイプ診断サービス](https://mentuzzle.com/shindan/report/16type)を利用して、自分のタイプを確認できます。<br>- [MBTIとは？](https://ja.wikipedia.org/wiki/MBTI)<br>- 心理機能について詳しく知りたい方は、以下のリンクを参照してください：<br>[Se](http://rinnsyou.com/archives/339) [Si](http://rinnsyou.com/archives/341) [Ne](http://rinnsyou.com/archives/345) [Ni](http://rinnsyou.com/archives/347) [Te](http://rinnsyou.com/archives/327) [Ti](http://rinnsyou.com/archives/329) [Fe](http://rinnsyou.com/archives/333) [Fi](http://rinnsyou.com/archives/335)<br>- より正確な診断結果を得るには[MBTI公式セッション](https://jppjapan.com)を受講する必要があります。 | - 1~4つの好きなアニメや音楽アーティストのイメージ画像を投稿できます。<br>- 現在、アニメと音楽アーティストの投稿が可能です。<br>- XにMBTIタイプと共に好きな作品を共有することで、簡易的な自己紹介ができます。 | - グラフで表示されたデータベースをフィルタリングして、気になるMBTIタイプの好きな作品を閲覧できます。

## 使用技術一覧
| カテゴリ | 使用技術 | バージョン |
|----------|----------|------------|
| フロントエンド | React | 18.2.0 |
| バックエンド | Ruby / Ruby on Rails (APIモード) | 3.2.2 / 7.0.8 |
| CSSフレームワーク | Tailwind CSS / daisyUI / MUI | 3.3.6 / 3.8.3 / 5.15.5 |
| API | Anilist API / Spotify Web API ||
| 認証 | Clerk ||
| 画像加工 | Cloudinary / imgkit ||
| グラフ | react-chartjs-2 ||
| インフラ | Heroku ||
| データベース | PostgreSQL ||

## ER図
[![Image from Gyazo](https://i.gyazo.com/7c7c0e13a781987107f8f823a364d1bc.png)](https://gyazo.com/7c7c0e13a781987107f8f823a364d1bc)