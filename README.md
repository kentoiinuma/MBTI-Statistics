# 16type Favorite Database  
## サービス概要  
MBTIタイプ診断をしたことのあるユーザーが、メディア(アニメ・音楽)ごとに、好きな作品を投稿することにより、MBTIタイプごとの好みをデータベース化するWedアプリケーションです。  
また、ユーザーが複数の好きな作品のサムネイルを組み合わせた画像をXに共有することにより、簡易的な自己紹介による交流のきっかけを提供します。

[MBTIとは？](https://ja.wikipedia.org/wiki/MBTI)  

## このサービスへの思い・作りたい理由  
### なぜMBTIタイプごとの好みをデータベース化するのか？
Xや掲示板でMBTIタイプごとの具体的な好みについて考えたり、予想したりしている人はたくさんいるのですが、あくまでその人たちの直観や肌感覚に依存するため、説得力が発信者の信用に基づいてしまうことに課題を見い出し、実際にデータを取って確かめたいという思いからこのサービスを作ろうと考えました。

### なぜ作品なのか？
MBTIは個人の指向によってタイプを分類する類型論なので、何かをデータベースに投稿・Xに共有するとしたら多種多様な表現方法を持つ作品が個人の指向を最も反映でき、タイプごとに好きな作品の傾向が表れるのではないかと考えたからです。
また、私自身がアニメ・音楽などの作品が好きなので、共有して交流のきっかけになればと思ったのと、私以外にも同じような思いを持っている人がいるのではないかと考えたからです。

## ユーザー層について   
- MBTI診断サイトでタイプ診断をしたことがあり、アニメ・音楽などの作品が好きなユーザー
- Wedサイトや書籍でMBTIに関する情報を集めたり、Xや掲示板でMBTIを通して交流したりし、MBTIが好きなユーザー
    
## サービスの利用イメージ  
- ユーザーはコンテンツ投稿画面から、アニメ・音楽のそれぞれ3つのメディアから自分が好きな1〜4つの作品を選び、その作品のサムネイルを組み合わせ生成された画像コンテンツをアプリ内に投稿・Xに共有できる。  
    - メディアをアニメ・音楽にした理由はメジャーであり、私も好きだから。
    - ex. メディアでアニメを選択し、作品で呪術廻戦,葬送のフリーレン,進撃の巨人を選択すれば、上記３つの作品のサムネイルを組み合わせ生成された画像コンテンツをアプリ内に投稿・Xに共有できる。
- データベース詳細画面ではユーザーがメディアごとに選んだ作品をもとに作られたデータベースを閲覧できる。  
- データベース詳細画面はMBTI16タイプを知覚機能（Ni/Ne/Si/Se）ごとのグループで分け、その4つのグループごとのデータベースを閲覧でき、コメントを投稿・いいねすることができる。  
    - 知覚機能でグループを分ける理由  
        - 初期の少ないユーザー数でもデータベースの傾向を見て取れるようにするための工夫の1つとして、MBTI16タイプをグルーピングしようと思ったから。  
        - MBTIに触れていく中で知覚機能の違いがタイプ間で最も大きな違いだと感じ、逆に言えば知覚機能が共通していれば、似たタイプとしてグルーピングできると思ったから。 

            - 知覚機能（Ni/Ne/Si/Se）で分けられた4つのグループ  
                - Se（ESFP/ESTP/ISFP/ISTP）  
                - Si（ESFJ/ESTJ/ISFJ/ISTJ）  
                - Ne（ENFP/ENTP/INFP/INTP）  
                - Ni（ENFJ/ENTJ/INFJ/INTJ）  
- 投稿一覧では他のユーザーの投稿した画像コンテンツをいいねできる。  
またユーザーのアイコンをクリックすると、そのユーザーのプロフィールに飛び、投稿・コメント・いいね一覧を閲覧できる。

## ユーザーの獲得について  
- Xでの宣伝  
- Qiita記事の作成  

## サービスの差別化ポイント・推しポイント  
### 差別化ポイント  
[Personality Database](https://www.personality-database.com)というMBTIに関するデータベースアプリがあるのですが、そのアプリで扱っているデータベースは有名人や架空のキャラクターのMBTIタイプをユーザーが投票し、多数決で決めたその人物やキャラクターのMBTIタイプなので、私の考えているMBTIタイプごとの個人の好みを収集するデータベースとは差別化できていると考えています。

### 推しポイント   
MBTIは最終的には自分でタイプを決める必要がある主観的な心理検査なので、ユーザーの誤診によりデータベースや統計が意味をなさないことが問題視されていますが、ユーザーの診断方法をプロフィールに記載し、その診断方法をもとにデータベースの母集団をフィルタリングする機能を実装することで、少しでも誤診を考慮した上でデータベースを見やすくできるようにしました。 
- ユーザーの診断方法  
そのユーザーのタイプ診断が  
    - 診断サイトのみを通じて決定したものなのか？（[16personalities](https://www.16personalities.com/ja)）
    - 書籍やWedサイト、SNSなどでMBTIに関する情報を集めて、自らの判断で決定したものなのか？（自認タイプ）  
    - 公式のセッションを通じて決定したものなのか？（[公式](https://www.mbti.or.jp/)タイプ）  

- ex.
フィルタリング機能で  
    - 公式タイプに絞り、公式を通して診断されたものだからこのデータは信用できる  
    - 16personalities・自認タイプ・公式タイプの全てを選択し、このデータは誤診を考慮して見なければいけないな  
など。

## 機能候補  
### MVPリリース  
- 使い方ページ  
- Googleログイン
- プロフィール  
    - プロフィール編集
    - 他のユーザーのプロフィール閲覧
- 通知  
    - 自分の画像コンテンツ投稿にいいねがついたとき  
    - 自分のコメントにいいね・返信がついたとき  
- 画像コンテンツ投稿  
    - 検索機能（オートコンプリート）と画像加工・合成  
        ３つのメディア（アニメ・音楽）ごとにAPIを使い、1〜4つの作品のサムネイルを取得し、そのサムネイルを組み合わせた画像を生成  
    - X共有機能  
- 画像コンテンツ投稿一覧表示   
    - 画像コンテンツ詳細
    - 画像コンテンツ編集
    - 画像コンテンツ削除
    - いいね・いいね解除
- データベース詳細  
    - データベース（棒グラフで表示）  
        - 少ないユーザー数でもデータベースの傾向を見て取れるようにするための工夫として、人と作品をグルーピングする
            - 知覚機能でグルーピングされたグループの中でタイプを複数選択できるようにし、初めは全てのタイプにチェックを入れておく 
                - ex.
                Seグループの場合  
                初めはESFP/ESTP/ISFP/ISTPの全てのタイプが選択されている  
                →ISFPのみのデータベースを表示したければ、ISFPのみを選択  

            - 診断方法は16personalities・自認タイプ・公式タイプから複数選択できるようにし、初めは全ての選択肢にチェックを入れておく 

            - メディアごとに投票された作品名またはジャンル名を投稿数順に表示し、作品ごとに表示するか、ジャンルごとに表示するか選べるようにする 
                - アニメジャンルex.  
                    - ファンタジー  
                    - SF  
                    - アクション  
                    - ミステリーetc.  

    - コメント欄  
        - コメント・コメント削除
        - いいね・いいね解除 

### 本リリース  
- レスポンシブデザイン  
- キューとバックグラウンド処理

## 機能の実装方針予定  
- フロントエンド
    - React 18.2.0
    - Tailwind CSS 3.3.6
    - daisyUI 3.8.3
- バックエンド  
    -  Ruby 3.2.2
	-  Rails(APIモード) 7.0.8
- API 
    - Annict API
    - Spotify API
- Gem
	- Googleログイン
		- devise
		- omniauth
	- オートコンプリート
		- stimulus-autocomplete
	- 通知
		- WebSocket通信・ActionCable
    - キューとバックグラウンド処理
	    - ActiveJob
	    - Sidekiq
		- Redis
    - その他
        - Pundit
        - RSpec
        - RuboCop
    - 画像加工・合成
        - cloudinary
- インフラ  
    - Heroku
- データベース
    - PostgreSQL

## 画面遷移図
https://www.figma.com/file/6RqB077Xm2APXdPgxQQGdM/16type-Favorite-Database?type=design&node-id=0%3A1&mode=design&t=Cljbhco66lUwXcXq-1

## ER図
[![Image from Gyazo](https://i.gyazo.com/141e10c4241668afb901452f94251e6b.png)](https://gyazo.com/141e10c4241668afb901452f94251e6b)