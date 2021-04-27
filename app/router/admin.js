'use strict';

module.exports = app => {
  const { router, controller } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/admin/index', controller.admin.main.index);
  router.post('/admin/checkOpenId', controller.admin.main.checkLogin);
  router.post('/admin/logout', controller.admin.main.logout);

  router.get('/admin/getInfo', adminauth, controller.admin.main.getAdminInfo);
  router.post('/admin/editInfo', adminauth, controller.admin.main.editAdminInfo);
  router.post('/admin/uploadAvatar', adminauth, controller.default.user.upload);

  router.get('/admin/getLabelInfo', adminauth, controller.admin.main.getLabelInfo);
  router.post('/admin/addLabel', adminauth, controller.admin.main.addLabel);

  router.get('/admin/getArticleList', adminauth, controller.admin.main.getArticleList);
  router.get('/admin/searchArticleList', adminauth, controller.admin.main.searchArticleList);

  router.get('/admin/getMemberList', adminauth, controller.admin.main.getMemberList);

  router.get('/admin/getArticleById/:id', adminauth, controller.admin.main.getArticleById);
  router.post('/admin/addContent', adminauth, controller.admin.main.addContent);
  router.post('/admin/updateContent', adminauth, controller.admin.main.updateContent);
  router.delete('/admin/deleteContent/:id', adminauth, controller.admin.main.deleteContent);
  router.post('/admin/:articleId/labels', adminauth, controller.admin.main.setArticleLabels);
  router.get('/admin/comment', adminauth, controller.admin.main.comment);
  router.post('/admin/reply/:commentId', adminauth, controller.admin.main.reply);
  // 修改留言
  router.patch('/admin/modifyComment/:commentId', adminauth, controller.default.user.modifyComment);
  // 刪除留言
  router.delete('/admin/deleteComment/:commentId', adminauth, controller.default.user.deleteComment);
  router.patch('/admin/addBlock', adminauth, controller.admin.main.addBlock);

  router.post('/admin/upload', adminauth, controller.admin.main.uploadPicture);
  router.delete('/admin/deletePicture', adminauth, controller.admin.main.deletePicture);
  router.get('/admin/getVisitsStatistics', adminauth, controller.admin.main.getVisitsStatistics);
};
