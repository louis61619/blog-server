'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;

  const {
    verifyLogin,
    verifyAuth,
    verifyReply,
    verifyPermission,
    verifyBlock,
    avatarHandler,
  } = middleware.userauth(app);

  router.post('/user/login', verifyLogin, controller.default.user.login);

  // 取得會員相應的資料 EX: 收藏
  router.get('/user/info', verifyAuth, controller.default.user.info);
  // 獲取頭像
  router.get('/user/avatar/:id', controller.default.user.getAvatarInfo);
  // 修改個人資料
  router.patch('/user/info/modify', verifyAuth, controller.default.user.modify);
  // 上傳頭像
  router.post('/user/avatar/upload', verifyAuth, avatarHandler, controller.default.user.upload);
  // 獲取收藏清單
  router.get('/user/favoriteList', verifyAuth, controller.default.user.favoriteList);
  // 點擊收藏
  router.post('/user/favorite', verifyAuth, controller.default.user.favorite);
  // 取消收藏
  router.delete('/user/cancelFavorite', verifyAuth, controller.default.user.cancelFavorite);
  // 留言
  router.post('/user/comment', verifyAuth, verifyBlock, verifyReply, controller.default.user.comment);
  // 回覆留言
  // router.post('/user/reply/:commentId', verifyAuth, controller.default.user.reply);
  // 修改留言
  router.patch('/user/modifyComment/:commentId', verifyAuth, verifyPermission, controller.default.user.modifyComment);
  // 刪除留言
  router.delete('/user/deleteComment/:commentId', verifyAuth, verifyPermission, controller.default.user.deleteComment);
  // 獲取通知
  router.get('/user/notice', verifyAuth, controller.default.user.notice);
};
