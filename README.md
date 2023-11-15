# EventCalendar

# 1\. アプリ開発の背景

## 1\. アプリの解決したい課題

- Instagram でイベントのスケジュールを一度投稿すると、変更がある際にその投稿を消さなければ修正することができない
- イベントのスケジュールを Instagram に投稿しても、その投稿が埋もれる可能性が高いため、参加者がイベントのスケジュールを把握しにくい。
- 申し込みのリンクを参加者が見つけにくいため、参加者獲得のチャンスが減っている

## 2\. アプリの世界観

- 大切な縁をつくり、その出会いが心動かす瞬間をつくりたい。
- 温かい人と出会えるイベントをつくりたいため、温かみのある色（オレンジベース）を使用したい

# 2\.　機能

## 1\. 基本機能

![USERとAdmin用の基本機能](images/Basic-function.png "basic-function")

## 2\. カレンダー

![カレンダーとモダル](images/Calendar-images.png "calendar-images")
![説明](images/Calendar-description.png "calendar-description")

## 3\. イベント詳細

![イベント詳細と編集ページ](images/Event-detail%26edit.png "calendar-detail&edit")

## 4\. 申込フォーム

![申込フォーム](images/Apply-image.png "apply-image")
![説明](images/Apply-description.png "apply-description")

## 5\.　イベント作成

![イベント作成](images/Create-event.png "create-event")

# 3\. データベース設計

## 1\. 全体構造

![全体構造](images/structure.png "structure")

## 2\. Users

| id  | role (User/Admin) | name | ID  | password |
| --- | ----------------- | ---- | --- | -------- |
|     |                   |      |     |          |

## 3\. Events

| id  | category_id | title_id | date | time | place | target | maximum participant | fee | image | description | participant_number |
| --- | ----------- | -------- | ---- | ---- | ----- | ------ | ------------------- | --- | ----- | ----------- | ------------------ |
|     |             |          |      |      |       |        |                     |     |       |

## 4\. Categories

| id  | name               | color   |
| --- | ------------------ | ------- |
| 1   | 勉強会             | #FEA340 |
| 2   | 多文化共生イベント | #4090FE |
| 3   | PodCasts           | #956ADF |
| 4   | 季節イベント       | #FE408A |
| 5   | 交流会             | #64D753 |
| 6   | スポーツ           | #6362DD |

## 5\. Titles

| id  | category_id  | name                   | form_id |
| --- | ------------ | ---------------------- | ------- |
| 1   | 勉強会       | Joyful English Meetup  | 1       |
| 2   | 勉強会       | ひよこプログラミング塾 | 2       |
| 3   | PodCasts     | Listen to Voice        | 3       |
| 4   | 季節イベント | クリスマス会           | 4       |
| 5   | スポーツ     | バレーボール           | 5       |

## 6\. Forms

| id  | form_url                            |
| --- | ----------------------------------- |
| 1   | https://forms.gle/j7ayVeeAwewx6D2Q8 |
| 2   | ・・・                              |

## 7\. Applications

| id  | form_id | event_id | mail | sex_id | property_id | year_id | qualification | confirmed |
| --- | ------- | -------- | ---- | ------ | ----------- | ------- | ------------- | --------- |
| 1   |         |          |      |        |             |         |               |           |

## 8\. Years

| id  | year           |
| --- | -------------- |
| 1   | 始めたばかり   |
| 2   | 1 年 ～ 3 年   |
| 3   | 3 年 ～ 5 年   |
| 4   | 5 年 ～ 10 年  |
| 5   | 10 年 ～ 15 年 |
| 6   | 15 年 ～       |

## 9\. Properties

| id  | name               |
| --- | ------------------ |
| 1   | 経営者・役員       |
| 2   | 会社員             |
| 3   | パート・アルバイト |
| 4   | 公務員             |
| 5   | 教職員             |
| 6   | 医療関係者         |
| 7   | 専業主婦・主夫     |
| 8   | 自営業・自由業     |
| 9   | 大学生・大学院生   |
| 10  | 専門学校生・短大生 |
| 11  | 中高生             |
| 12  | 無職               |
| 13  | 定年退職           |
| 14  | その他             |

## 10\. Sexes

| id  | name   |
| --- | ------ |
| 1   | 男     |
| 2   | 女     |
| 3   | その他 |
