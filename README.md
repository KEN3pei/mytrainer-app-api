#### mytrainer-app-frontのバックエンド
#### 開発中

ローカルのDBはmongoDBで作るか、test-data.jsonを使う。
mongoコンテナで設定すること

１，adminにログイン（docker-compose.ymlで指定した値）
MONGO_INITDB_ROOT_USERNAME: ${MONGO_INITDB_ROOT_USERNAME}
MONGO_INITDB_ROOT_PASSWORD: ${MONGO_INITDB_ROOT_PASSWORD}

２，DBの切り替え -> collectionの作成

３，user作成（ここで指定したuserとpassでauthenticationを実施する）

４，一度mongoシェルから出る（user反映のため）

５，databaseディレクトリにあるtest-data.json内のデータを挿入
