# 部落格服務端

這是一個部落格練習項目

前台程式碼：https://github.com/louis61619/blog-frontstage.git

後台程式碼：https://github.com/louis61619/blog-backstage.git

服務端程式碼：https://github.com/louis61619/blog-server.git

## 使用技術

- Egg.js
- Mysql
- Jwt

## 開發環境搭建

- 下載 nodejs，nodejs 版本需大於 13
- 下載前後台和服務端程式碼，然後在各自的資料夾執行

```
npm i && npm run dev
```

- 資料庫使用 mysql，預設讀取端口為 3310

  - 匯入項目內的 blog-data-sample.sql 資料
  - 如遇到 `Client does not support authentication protocol requested by server;` 錯誤，可以參考：https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

## 環境變量

位於根目錄 .env

| Keys                   | Introduction           |
| ---------------------- | ---------------------- |
| DB        | 資料庫名稱             |
| DB_HOST     | 資料庫主機地址           |
| DB_PORT           | 資料庫端口           |
| DB_USERNAME         | 使用者名稱     |
| DB_PASSWORD     | 使用者密碼   |
| SERVER_URL | 服務段網址 |
| SECRET_KEY       | 加密金鑰     |
| START_PORT       | 啟動端口     |
