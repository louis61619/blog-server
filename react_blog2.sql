/*
 Navicat MySQL Data Transfer

 Source Server         : docker-blog
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3310
 Source Schema         : react_blog

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 09/05/2021 12:47:29
*/

SHOW DATABASES;
CREATE DATABASE react_blog;
USE react_blog;

CREATE USER 'root'@'%' IDENTIFIED BY 'root'; 
GRANT ALL ON *.* TO 'root'@'%'; 

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_id` int DEFAULT NULL,
  `github` varchar(200) DEFAULT NULL,
  `medium` varchar(200) DEFAULT NULL,
  `slogan` varchar(200) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of admin_user
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `introduce` varchar(255) DEFAULT NULL,
  `article_content` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `view_count` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `like_count` int DEFAULT NULL,
  `release_time` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` VALUES (1, '測試文章開頭9999111222', '測試文章簡介\n![000001111', '測試文章簡介ㄡ......\n![markdown](https://www.mdeditor.tw/images/logos/markdown.png \"markdown\")\n\n測試staticprops更新\n\n測試staticprops更新2\n\n測試staticprops更新3', 8061, '2021-02-01 23:04:24', '2021-05-07 17:45:24', 10, '2021-02-23');
INSERT INTO `article` VALUES (2, '999', '99000', '99888880001111222', 1, '2021-02-09 22:17:45', '2021-04-10 17:04:14', 0, NULL);
INSERT INTO `article` VALUES (3, '測試999', '99', '99', 1, '2021-02-09 22:24:20', '2021-04-10 17:04:14', 0, NULL);
INSERT INTO `article` VALUES (9, '0000', '11111111111222333311115555', '3333', 1, '2021-02-12 15:23:59', '2021-04-10 17:04:14', 0, NULL);
INSERT INTO `article` VALUES (10, '初識redux', '現代web應用的複雜狀態管理', '![images](images/16131198158113732.png)\n\n\n\n\n\n\n\n\n\n\n# 爲什麼要學習redux\n隨著對 JavaScript single-page 應用程式的要求變得越來愈複雜，我們的程式碼必須管理高於以往的 state。\n\n## 生態系\n\nRedux 是個非常小的 library，但它的介面和 API 都是精挑細選來衍生出工具和 extension 的生態系。\n\n如果需要一個有關 Redux 一切的廣泛清單，我們推薦 [Awesome Redux](https://github.com/xgrommx/awesome-redux)。它包含範例、boilerplate、middleware、utility library 和許多其他的東西。[React/Redux Links](https://github.com/markerikson/react-redux-links) 涵蓋了教學及其他有用的資源，不論是學習 React 或 Redux 的人，而 [Redux Ecosystem Links](https://github.com/markerikson/redux-ecosystem-links) 則列了許多與 Redux 有關的 library 及附加功能。\n\n在這個頁面上，我們將只列出它們之中一些 Redux 維護者已經親自審核的。不要因此而打消你嘗試其他項目的念頭！這個生態系成長得太快，我們沒有足夠的時間去查看所有的東西。請把這些當作「員工推薦」，如果你已經使用 Redux 做出了很棒的東西，請不要猶豫馬上提交一個 PR。\n\n### 影片\n\n* **[Getting Started with Redux](https://egghead.io/series/getting-started-with-redux)** — 直接從 Redux 的作者學習它的基礎 (30 部免費影片)\n* **[Learn Redux](https://learnredux.com)** — 建立一個簡單的照片應用程式，它簡化了 Redux、 React Router 和 React.js 背後的核心概念\n\n```\nimport { createStore } from \'redux\'\nimport todoApp from \'./reducers\'\nlet store = createStore(todoApp)\n```', 1120, '2021-02-12 16:49:41', '2021-05-07 17:45:16', 0, '2021-02-17');
INSERT INTO `article` VALUES (11, '讓開發者驚艷的react hook', '使用函數組件讓網頁開發有更多可能性', '![images](images/16132199281894453.png)\n\nreact hook 使用 react fiber 代替原先的 class 組件讓 function 組件有了生命週期．', 51, '2021-02-13 20:38:07', '2021-05-07 17:29:57', 0, '2021-02-13');
INSERT INTO `article` VALUES (12, '現代web打包工具', '作為現代打包工具webpack', '![images](images/16132225510104203.png)\n\n作為現代打包工具webpack', 46, '2021-02-13 21:21:55', '2021-05-07 17:45:16', 0, '2021-02-16');
INSERT INTO `article` VALUES (13, 'setState為什麼是異步的？', '使用setState或是useState總會遇到這樣的問題，和vue相比非常不直覺的操作方式', '![images](images/16132235847392332.png)\n\n使用setState或是useState總會遇到這樣的問題，和vue相比非常不直覺的操作方式', 97, '2021-02-13 21:39:18', '2021-05-07 17:45:24', 0, '2021-02-24');
INSERT INTO `article` VALUES (15, '5555', '555', '555', 98, '2021-03-23 20:03:35', '2021-05-07 17:45:24', 0, '2021-03-31');
INSERT INTO `article` VALUES (16, 'nextjs最好的SSR框架？', 'Next.js為您提供最佳的開發人員體驗，包括生產所需的所有功能：靜態和服務器混合渲染，TypeScript支持，智能捆綁，路由預取等。無需配置。', '\n# Next.js + MDX\n\nUse [MDX](https://github.com/mdx-js/mdx) with [Next.js](https://github.com/vercel/next.js)\n\n## Installation\n\n```\nnpm install @next/mdx @mdx-js/loader\n```\n\nor\n\n```\nyarn add @next/mdx @mdx-js/loader\n```\n\n## Usage\n\nCreate a `next.config.js` in your project\n\n```js\n// next.config.js\nconst withMDX = require(\'@next/mdx\')()\nmodule.exports = withMDX()\n```\n\nOptionally you can provide [MDX plugins](https://mdxjs.com/advanced/plugins#plugins):\n\n```js\n// next.config.js\nconst withMDX = require(\'@next/mdx\')({\n  options: {\n    remarkPlugins: [],\n    rehypePlugins: [],\n  },\n})\nmodule.exports = withMDX()\n```\n\nOptionally you can add your custom Next.js configuration as parameter\n\n```js\n// next.config.js\nconst withMDX = require(\'@next/mdx\')()\nmodule.exports = withMDX({\n  webpack(config, options) {\n    return config\n  },\n})\n```\n\nOptionally you can match other file extensions for MDX compilation, by default only `.mdx` is supported\n\n```js\n// next.config.js\nconst withMDX = require(\'@next/mdx\')({\n  extension: /\\.(md|mdx)$/,\n})\nmodule.exports = withMDX()\n```\n\n## Top level .mdx pages\n\nDefine the `pageExtensions` option to have Next.js handle `.mdx` files in the `pages` directory as pages:\n\n```js\n// next.config.js\nconst withMDX = require(\'@next/mdx\')({\n  extension: /\\.mdx?$/,\n})\nmodule.exports = withMDX({\n  pageExtensions: [\'js\', \'jsx\', \'mdx\'],\n})\n```\n\n## Typescript\n\nFollow [this guide](https://mdxjs.com/advanced/typescript) from the MDX docs.', 64, '2021-04-10 17:25:14', '2021-05-07 17:45:24', 0, '2021-04-10');
INSERT INTO `article` VALUES (17, 'Amazon EC2 ', '安全且可調整大小的運算能力可支援幾乎所有工作負載', 'Amazon Elastic Compute Cloud (Amazon EC2) 是一種 Web 服務，可在雲端提供安全、可調整大小的運算容量。該服務旨在降低開發人員進行 Web 規模雲端運算的難度。Amazon EC2 的 Web 服務界面非常簡單，您可以輕鬆獲取和配置容量。使用本服務，您可以完全控制運算資源，並在成熟的 Amazon 運算環境中執行。\n\nAmazon EC2 提供了最廣泛和最深入的運算平台，可以選擇處理器、儲存體、網路、作業系統和購買模型。我們提供雲端中最快的處理器，並且我們提供唯一具有 400 Gbps 以太網路的雲端。我們擁有適用於機器學習訓練和圖形工作負載的功能最強大的 GPU 執行個體，以及雲端中每次推論成本最低的執行個體。在 AWS 上執行的 SAP、HPC、機器學習和 Windows 工作負載比其他任何雲端都多。按一下此處以了解 Amazon EC2 的最新消息。', 62, '2021-04-10 17:35:30', '2021-05-07 17:44:16', 0, '2021-04-10');
INSERT INTO `article` VALUES (18, 'Redux Store2', 'store 掌控了你的應用程式的整個 state tree。 改變它裡面的 state 的唯一方法是在它上面 dispatch 一個 action', '# Store111111\n\nstore 掌控了你的應用程式的整個 [state tree](../Glossary.md#state)。\n改變它裡面的 state 的唯一方法是在它上面 dispatch 一個 [action](../Glossary.md#action)。\n\nstore 不是一個 class。他只是一個有幾個方法的物件。\n要建立它，必須傳遞你的 root [reducing function](../Glossary.md#reducer) 到 [`createStore`](createStore.md)。\n\n\n\n\n## Store Method\n\n回傳你的應用程式當下的 state tree。\n這等同於 store 的 reducer 最後一次回傳的值。\n\n### 回傳\n\n*(any)*：你的應用程式當下的 state tree。\n\n<hr>\n\nDispatch 一個 action。這是觸發 state 變更的唯一方式。\n\nstore 的 reducing function 將會同步的用當下 [`getState()`](#getState) 的結果和給定的 `action` 來呼叫。它的回傳值將會被當作下一個 state。從現在開始 [`getState()`](#getState) 將會回傳它，而 change listener 將會立刻被通知。\n\n\n\n### 參數\n\n1. `action` (*Object*<sup>†</sup>)：一個描述對你的應用程式有意義的變更的一般物件。Action 是把資料放進 store 的唯一方法，所以任何資料，無論是從 UI 事件、網路 callback、或是其他來源像是 WebSocket，最後都必須做為 action 被 dispatch。Action 必須有一個 `type` 屬性，它代表被執行的 action 的類型。Type 可以被定義成常數並從其他 module import。使用字串作為 `type` 會比使用 [Symbol](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Symbol) 好，因為字串是可 serialize 的。除了 `type` 以外，action 物件的結構完全取決於你。如果你有興趣，請查看 [Flux Standard Action](https://github.com/acdlite/flux-standard-action) 上有關應該如何建構 action 的建議。\n\n### 回傳\n\n(Object<sup>†</sup>)：被 dispatch 的 action (請參閱附註)。\n\n### 附註\n\n<sup>†</sup> 你藉由呼叫 [`createStore`](createStore.md) 所拿到的「原生」store 實作，只支援一般物件 action 而且會立刻被送到 reducer。\n\n但是，如果你把 [`createStore`](createStore.md) 用 [`applyMiddleware`](applyMiddleware.md) 包起來，這些 middleware 用不同的方式解釋 action，並提供對 dispatch [async action](../Glossary.md#async-action) 的支援。Async action 通常是一些非同步的基礎型別，像是 Promise、Observable、或是 thunk。\n\nMiddleware 是由社群所創造且不會預設附帶在 Redux 裡。你需要明確的安裝像是 [redux-thunk](https://github.com/gaearon/redux-thunk) 或是 [redux-promise](https://github.com/acdlite/redux-promise) 之類的套件以使用它。你也可以建立自己的 middleware。\n要學習如何去描述非同步的 API 呼叫、在 action creator 裡面讀取當下的 state、執行有 side effect 的動作、或是把它們鏈接起來按照順序執行，請查看 [`applyMiddleware`](applyMiddleware.md) 的範例。\n\n### 範例\n\n```js\nimport { createStore } from \'redux\'\nlet store = createStore(todos, [ \'Use Redux\' ])\n\nfunction addTodo(text) {\n  return {\n    type: \'ADD_TODO\',\n    text\n  }\n}\n\nstore.dispatch(addTodo(\'Read the docs\'))\nstore.dispatch(addTodo(\'Read about the middleware\'))\n```\n\n<hr>\n', 121, '2021-04-10 17:46:52', '2021-05-07 17:45:16', 0, '2021-04-10');
COMMIT;

-- ----------------------------
-- Table structure for article_label
-- ----------------------------
DROP TABLE IF EXISTS `article_label`;
CREATE TABLE `article_label` (
  `article_id` int NOT NULL,
  `label_id` int NOT NULL,
  PRIMARY KEY (`article_id`,`label_id`),
  KEY `label_id` (`label_id`),
  CONSTRAINT `article_label_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `article_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of article_label
-- ----------------------------
BEGIN;
INSERT INTO `article_label` VALUES (1, 1);
INSERT INTO `article_label` VALUES (3, 1);
INSERT INTO `article_label` VALUES (1, 2);
INSERT INTO `article_label` VALUES (2, 2);
INSERT INTO `article_label` VALUES (9, 2);
INSERT INTO `article_label` VALUES (10, 2);
INSERT INTO `article_label` VALUES (11, 2);
INSERT INTO `article_label` VALUES (15, 2);
INSERT INTO `article_label` VALUES (16, 2);
INSERT INTO `article_label` VALUES (18, 2);
INSERT INTO `article_label` VALUES (2, 3);
INSERT INTO `article_label` VALUES (9, 7);
INSERT INTO `article_label` VALUES (10, 8);
INSERT INTO `article_label` VALUES (18, 8);
INSERT INTO `article_label` VALUES (11, 9);
INSERT INTO `article_label` VALUES (13, 9);
INSERT INTO `article_label` VALUES (12, 10);
INSERT INTO `article_label` VALUES (16, 11);
INSERT INTO `article_label` VALUES (17, 13);
COMMIT;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `article_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_id` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `article_id` (`article_id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of comment
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for favorite
-- ----------------------------
DROP TABLE IF EXISTS `favorite`;
CREATE TABLE `favorite` (
  `user_id` int NOT NULL,
  `article_id` int NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`article_id`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `favorite_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `favorite_ibfk_2` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of favorite
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for file
-- ----------------------------
DROP TABLE IF EXISTS `file`;
CREATE TABLE `file` (
  `id` int NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  `size` int DEFAULT NULL,
  `article_id` int DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `article_id` (`article_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`article_id`) REFERENCES `article` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of file
-- ----------------------------
BEGIN;
INSERT INTO `file` VALUES (4, '16130676687988340.jpg', 'image/jpeg', NULL, 1, '2021-02-12 02:21:08', '2021-02-12 02:21:08');
INSERT INTO `file` VALUES (5, '16130671355721656.jpg', 'image/jpeg', NULL, 2, '2021-02-12 02:25:36', '2021-02-12 02:25:36');
INSERT INTO `file` VALUES (8, '16130983750142448.jpg', 'image/jpeg', NULL, 1, '2021-02-12 10:52:55', '2021-02-12 10:52:55');
INSERT INTO `file` VALUES (9, '16131137554556652.jpg', 'image/jpeg', NULL, 1, '2021-02-12 15:09:15', '2021-02-12 15:09:15');
INSERT INTO `file` VALUES (10, '16131138586882221.jpg', 'image/jpeg', NULL, 1, '2021-02-12 15:10:58', '2021-02-12 15:10:58');
INSERT INTO `file` VALUES (11, '16131138923063274.jpeg', 'image/jpeg', NULL, 1, '2021-02-12 15:11:32', '2021-02-12 15:11:32');
INSERT INTO `file` VALUES (12, '16131139570948997.jpg', 'image/jpeg', NULL, 1, '2021-02-12 15:12:37', '2021-02-12 15:12:37');
INSERT INTO `file` VALUES (13, '16131140107768920.jpg', 'image/jpeg', NULL, 1, '2021-02-12 15:13:30', '2021-02-12 15:13:30');
INSERT INTO `file` VALUES (14, '16131146453163764.jpg', 'image/jpeg', NULL, 9, '2021-02-12 15:24:05', '2021-02-12 15:24:05');
INSERT INTO `file` VALUES (15, '16131198158113732.png', 'image/png', NULL, 10, '2021-02-12 16:50:15', '2021-02-12 16:50:15');
INSERT INTO `file` VALUES (16, '16131202616052625.jpg', 'image/jpeg', NULL, 10, '2021-02-12 16:57:41', '2021-02-12 16:57:41');
INSERT INTO `file` VALUES (17, '16132199281894453.png', 'image/png', NULL, 11, '2021-02-13 20:38:48', '2021-02-13 20:38:48');
INSERT INTO `file` VALUES (18, '16132225510104203.png', 'image/png', NULL, 12, '2021-02-13 21:22:31', '2021-02-13 21:22:31');
INSERT INTO `file` VALUES (19, '16132235847392332.png', 'image/png', NULL, 13, '2021-02-13 21:39:44', '2021-02-13 21:39:44');
INSERT INTO `file` VALUES (20, '16156272408264616.jpeg', 'image/jpeg', NULL, 1, '2021-03-13 17:20:40', '2021-03-13 17:20:40');
INSERT INTO `file` VALUES (25, '16198783881042721.jpg', 'image/jpeg', NULL, 18, '2021-05-01 22:13:08', '2021-05-01 22:13:08');
COMMIT;

-- ----------------------------
-- Table structure for label
-- ----------------------------
DROP TABLE IF EXISTS `label`;
CREATE TABLE `label` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of label
-- ----------------------------
BEGIN;
INSERT INTO `label` VALUES (1, '測試', '2021-02-02 20:36:13', '2021-02-02 20:36:13');
INSERT INTO `label` VALUES (2, 'react', '2021-02-02 21:32:43', '2021-02-02 21:32:43');
INSERT INTO `label` VALUES (3, '000', '2021-02-09 20:38:06', '2021-02-09 20:38:06');
INSERT INTO `label` VALUES (4, '00000', '2021-02-09 20:38:39', '2021-02-09 20:38:39');
INSERT INTO `label` VALUES (5, '888', '2021-02-09 20:44:03', '2021-02-09 20:44:03');
INSERT INTO `label` VALUES (6, '000000', '2021-02-09 22:26:38', '2021-02-09 22:26:38');
INSERT INTO `label` VALUES (7, 'vue', '2021-02-12 16:17:44', '2021-02-12 16:17:44');
INSERT INTO `label` VALUES (8, 'redux', '2021-02-12 16:46:15', '2021-02-12 16:46:15');
INSERT INTO `label` VALUES (9, 'react-hook', '2021-02-13 20:34:50', '2021-02-13 20:34:50');
INSERT INTO `label` VALUES (10, 'webpack', '2021-02-13 21:21:11', '2021-02-13 21:21:11');
INSERT INTO `label` VALUES (11, 'next', '2021-04-10 17:23:11', '2021-04-10 17:23:11');
INSERT INTO `label` VALUES (12, '1111', '2021-04-10 17:23:46', '2021-04-10 17:23:46');
INSERT INTO `label` VALUES (13, 'aws', '2021-04-10 17:34:59', '2021-04-10 17:34:59');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(320) DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `avatar_url` varchar(200) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `block` tinyint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `emali` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for visits
-- ----------------------------
DROP TABLE IF EXISTS `visits`;
CREATE TABLE `visits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` date NOT NULL,
  `count` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `date` (`date`)
) ENGINE=InnoDB AUTO_INCREMENT=1021 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of visits
-- ----------------------------
BEGIN;
INSERT INTO `visits` VALUES (14, '2021-03-28', 36);
INSERT INTO `visits` VALUES (50, '2021-03-31', 1);
INSERT INTO `visits` VALUES (51, '2021-04-02', 41);
INSERT INTO `visits` VALUES (92, '2021-04-08', 113);
INSERT INTO `visits` VALUES (205, '2021-04-09', 44);
INSERT INTO `visits` VALUES (249, '2021-04-10', 118);
INSERT INTO `visits` VALUES (367, '2021-04-11', 65);
INSERT INTO `visits` VALUES (432, '2021-04-13', 8);
INSERT INTO `visits` VALUES (440, '2021-04-14', 11);
INSERT INTO `visits` VALUES (451, '2021-04-15', 6);
INSERT INTO `visits` VALUES (457, '2021-04-16', 98);
INSERT INTO `visits` VALUES (555, '2021-04-17', 259);
INSERT INTO `visits` VALUES (814, '2021-04-18', 8);
INSERT INTO `visits` VALUES (822, '2021-04-19', 95);
INSERT INTO `visits` VALUES (917, '2021-04-21', 13);
INSERT INTO `visits` VALUES (930, '2021-04-25', 8);
INSERT INTO `visits` VALUES (938, '2021-04-30', 19);
INSERT INTO `visits` VALUES (957, '2021-05-01', 1);
INSERT INTO `visits` VALUES (958, '2021-05-02', 1);
INSERT INTO `visits` VALUES (959, '2021-05-05', 25);
INSERT INTO `visits` VALUES (984, '2021-05-06', 16);
INSERT INTO `visits` VALUES (1000, '2021-05-07', 15);
INSERT INTO `visits` VALUES (1015, '2021-05-08', 6);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
