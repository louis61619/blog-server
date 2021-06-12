'use strict';

module.exports = app => {
  const { router, controller } = app;
  router.get('/default/sitemap', controller.default.home.index);
  router.get('/default/author', controller.admin.main.getAdminInfo);

  router.patch('/default/addVistis', controller.default.home.addVistis);
  router.get('/default/getStaticList', controller.default.home.getStaticList);

  router.get('/default/searchArticleTitle', controller.default.home.searchArticleTitle);
  router.get('/default/searchArticleLabel', controller.default.home.searchArticleLabel);

  router.get('/default/getTopRecommend', controller.default.home.getTopRecommend);
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  router.get('/default/getArticleById', controller.default.home.getArticleById);
  router.get('/default/getLabels', controller.default.home.getLables);
  router.get('/default/getArticleByLabelId/:id', controller.default.home.getArticleByLabelId);
  router.get('/default/getDetailRecommend', controller.default.home.getDetailRecommend);

  router.get('/images/:filename', controller.default.home.getFileInfo);
};
