'use strict';

const fs = require('fs');
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const result = await this.app.mysql.get('blog_content', {});
    this.ctx.body = result;
  }

  async addVistis() {
    const sql = `
      insert into visits(date, count) values(CURDATE(), 1) on duplicate key update count=count + 1;
    `;
    const result = await this.app.mysql.query(sql);
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: true,
      insertId,
    };
  }

  async getTopRecommend() {
    const sql = `      
      SELECT a.id id, a.title, a.introduce, left(a.article_content, 200) context, a.view_count, a.like_count, a.release_time releaseTime, a.updateAt, a.createAt,
      IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
      (SELECT JSON_ARRAYAGG(CONCAT('${this.app.config.myHost}/images/',file.filename)) FROM file WHERE a.id = file.article_id) images
      FROM article a
      LEFT JOIN article_label al ON a.id = al.article_id
      LEFT JOIN label l ON al.label_id = l.id
      WHERE a.release_time IS NOT NULL
      GROUP BY a.id
      ORDER BY view_count DESC
      LIMIT 0, 5;
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async getArticleList() {
    let { offset = 0, size = 8 } = this.ctx.query;
    if (size > 8) size = 8;
    const sql = `      
      SELECT a.id id, a.title, a.introduce, left(a.article_content, 200) context, a.view_count, a.like_count, a.release_time releaseTime, a.updateAt, a.createAt,
      IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
      (SELECT JSON_ARRAYAGG(CONCAT('${this.app.config.myHost}/images/',file.filename)) FROM file WHERE a.id = file.article_id) images
      FROM article a
      LEFT JOIN article_label al ON a.id = al.article_id
      LEFT JOIN label l ON al.label_id = l.id
      WHERE a.release_time IS NOT NULL
      GROUP BY a.id
      ORDER BY release_time DESC
      LIMIT ${offset}, ${size};
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async getArticleById() {
    const id = this.ctx.query.id;
    // 瀏覽人次＋1
    const addSql = `
      UPDATE article SET view_count = view_count + 1 WHERE id = ${id};
    `;
    await this.app.mysql.query(addSql);
    const sql = `
      SELECT a.id id, a.title, a.introduce, left(a.article_content, 200) context, a.view_count, a.like_count, a.release_time releaseTime, a.updateAt, a.createAt,
      IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
        (SELECT JSON_ARRAYAGG(CONCAT('${this.app.config.myHost}/images/',file.filename)) FROM file WHERE a.id = file.article_id) images,
        (SELECT IF(COUNT(c.id), JSON_ARRAYAGG(
        JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt, 'updateTime', c.updateAt,'user',
        JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', CONCAT('${this.app.config.myHost}', cu.avatar_url)))
        ), NULL) FROM comment c LEFT JOIN user cu ON c.user_id = cu.id WHERE a.id = c.article_id AND c.user_id NOT IN (SELECT u.id FROM user u WHERE u.block = 1) ) comments
      FROM article a
      LEFT JOIN article_label al ON a.id = al.article_id
      LEFT JOIN label l ON al.label_id = l.id
      WHERE a.id = ${id} AND a.release_time IS NOT NULL
      GROUP BY a.id;
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result[0],
    };
  }

  async getFileInfo() {
    const filename = this.ctx.params.filename;
    this.ctx.response.set('content-type', 'image/jpeg');
    this.ctx.body = fs.createReadStream('uploads/picture/' + filename);
  }

  async getLables() {
    const sql = `
      SELECT l.id, l.name,
      IF(COUNT(a.id), COUNT(a.id), NULL) articles
      FROM label l
      LEFT JOIN article_label al ON l.id = al.label_id
      LEFT JOIN article a ON al.article_id = a.id
      WHERE a.release_time IS NOT NULL
      GROUP BY l.id;
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async getArticleByLabelId() {
    const id = this.ctx.params.id;
    let { offset = 0, size = 8 } = this.ctx.query;
    if (size > 8) size = 8;
    const sql = `
      SELECT a.id id, a.title, a.introduce, left(a.article_content, 200) context, a.view_count, a.like_count, a.release_time releaseTime, a.updateAt, a.createAt,
      (SELECT JSON_ARRAYAGG(JSON_OBJECT('id', ls.id, 'name', ls.name)) 
      FROM label ls 
      LEFT JOIN article_label als ON ls.id = als.label_id 
      LEFT JOIN article ar ON ar.id = als.article_id 
      WHERE a.id = ar.id
      ) labels,
      (SELECT JSON_ARRAYAGG(CONCAT('${this.app.config.myHost}/images/',file.filename)) FROM file WHERE a.id = file.article_id) images
      FROM label l
      LEFT JOIN article_label al ON l.id = al.label_id
      LEFT JOIN article a ON al.article_id = a.id
      WHERE a.release_time IS NOT NULL AND l.id = ${id}
      LIMIT ${offset}, ${size};
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async getDetailRecommend() {
    const sql = `      
      SELECT a.id id, a.title, a.introduce, left(a.article_content, 200) context, a.view_count, a.like_count, a.release_time releaseTime, a.updateAt, a.createAt,
      IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
      (SELECT JSON_ARRAYAGG(CONCAT('${this.app.config.myHost}/images/',file.filename)) FROM file WHERE a.id = file.article_id) images
      FROM article a
      LEFT JOIN article_label al ON a.id = al.article_id
      LEFT JOIN label l ON al.label_id = l.id
      WHERE a.release_time IS NOT NULL
      GROUP BY a.id
      ORDER BY rand() LIMIT 3;
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = HomeController;
