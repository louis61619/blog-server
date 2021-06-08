

# 部落格服務端

這是一個restful風格的API接口，作為部落格的服務端使用，使用Egg.js搭建，你的星星是我最大的鼓勵

部落格地址：https://mycoderland.tw

前台源碼：https://github.com/louis61619/blog-frontstage.git

後台源碼：https://github.com/louis61619/blog-backstage.git

服務端源碼：https://github.com/louis61619/blog-server.git



## 技術棧

- Egg.js
- Mysql
- Jwt



## 開發環境搭建

> 由於本項目是採用前後端分離，所以需要同時下載前後端的部分，項目中提供了一組FB登錄API的測試權杖

- 下載nodejs，nodejs版本需大於13，推薦使用yarn取代npm

- 下載本項目後端 : https://github.com/louis61619/blog-server

- 資料庫使用mysql

  - 如果要使用本地mysql，請匯入後端項目內的sql資料，具體步驟如下:
    - 創建資料庫並命名為react_blog
    - 設定mysql端口為3310
    - 匯入資料，該檔案位於/react-blog02.sql
    - 如果要修改設定參數請參閱[服務端環境變數](https://github.com/louis61619/blog-server#%E7%92%B0%E5%A2%83%E8%AE%8A%E9%87%8F)
  - 如果不想使用本地mysql 可以使用docker，只要下指令**dokcer -d -p 3310:3306 louis61619/blog-data**即可運行該鏡像
    - 如果想要修改對外端口，可以直接修改 3310這個參數
    - 如果想要掛載volume，可以在指令中加入 -v <本地目錄>:/var/lib/mysql

- 啟用後端API

  ```
  yarn install && yarn dev
  ```

- 如果想要在開發環境中瀏覽部落格，請下載[blog前台]( https://github.com/louis61619/blog-frontstage.git)，然後在根目錄下指令(默認啟用端口為3000)

  ```
  yarn install && yarn start
  ```

- 如果想要在開發環境中編輯部落格內容，請下載[blog後台](https://github.com/louis61619/blog-backstage.git) ，然後在根目錄下指令(默認啟用端口為3001)

  ```
  yarn install && yarn dev
  ```

  

## 環境變量

egg.js採用配置及代碼的方式加載環境變量，檔案位於/config/config.default.js

資料庫連接設定

```
config.mysql = {
    // database configuration 資料庫設定
    client: {
      // host
      host: '0.0.0.0',
      // port
      port: '3310',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'react_blog',
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
```

cookie加密參數

```
config.keys = appInfo.name + '0000';
```

jwt加密參數(前台登錄鑑權)

```
config.jwt = {
  secret: '0000',
};
```

