'use strict';
const fs = require('fs');
const path = require('path');
const md5password = require('../../utils/password-handle');
const Controller = require('egg').Controller;

class MainController extends Controller {
  async index() {
    this.ctx.body = 'hi api';
  }

  async checkLogin() {
    const user = this.ctx.request.body.name;
    const password = md5password(this.ctx.request.body.password);

    // 沒有的話創建新帳號
    const checkSql = `
      SELECT COUNT(id) count FROM admin_user;
    `;
    const [{ count: adminNum }] = await this.app.mysql.query(checkSql);
    if (adminNum === 0) {
      const sql = `
        INSERT INTO user (email, name) VALUES ('admin', 'admin');
      `;
      const result = await this.app.mysql.query(sql);
      const insertId = result.insertId;
      const createAdminSql = `
        INSERT INTO admin_user (name, password, user_id) VALUES ('${user}', '${password}', ${insertId});
      `;
      await this.app.mysql.query(createAdminSql);
    }

    const sql = `SELECT name FROM admin_user WHERE name = '${user}' AND password = '${password}';`;

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      const openId = new Date().getTime();
      this.ctx.session.openId = { openId };
      this.ctx.body = { data: 'success', openId };
    } else {
      this.ctx.body = { data: 'fail' };
    }
  }

  async getVisitsStatistics() {
    const sql = `
      SELECT d.days, IFNULL( v.count, 0) count
      FROM (
          SELECT curdate() as days
          union all
          SELECT date_sub(curdate(), interval 1 day) as days
          union all
          SELECT date_sub(curdate(), interval 2 day) as days
          union all
          SELECT date_sub(curdate(), interval 3 day) as days
          union all
          SELECT date_sub(curdate(), interval 4 day) as days
          union all
          SELECT date_sub(curdate(), interval 5 day) as days
          union all
          SELECT date_sub(curdate(), interval 6 day) as days
      ) d
      LEFT JOIN visits v ON v.date = d.days;
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async getAdminInfo() {
    // console.log(this.app.config.myHost, "0000")
    const sql = `
      SELECT u.id userId, u.name, CONCAT('${this.app.config.myHost}', u.avatar_url) avatarUrl, a.slogan, a.github, a.medium, a.email, a.id adminId
      FROM admin_user a
      LEFT JOIN user u ON a.user_id = u.id;
    `;
    const res = await this.app.mysql.query(sql);
    this.ctx.body = res[0];
  }

  async editAdminInfo() {
    // const { name, github, medium, slogan } = this.ctx.request.body;
    const { id } = this.ctx.query;
    const [ infoKey ] = Object.keys(this.ctx.request.body);
    const value = this.ctx.request.body[infoKey];
    let result;
    if (infoKey === 'name') {
      const sql = `
        UPDATE user SET name = '${value}' WHERE id = ${id};
      `;
      result = await this.app.mysql.query(sql);
    } else {
      const sql = `
        UPDATE admin_user SET ${infoKey} = '${value}' LIMIT 1;
      `;
      result = await this.app.mysql.query(sql);
    }
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async getLabelInfo() {
    const res = await this.app.mysql.select('label');
    this.ctx.body = { data: res };
  }

  async addContent() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.insert('article', tmpArticle);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async updateContent() {
    const tmpArticle = this.ctx.request.body;
    const result = await this.app.mysql.update('article', tmpArticle);
    console.log(result);
    const updateSuccess = result.affectedRows === 1;

    this.ctx.body = {
      isSuccess: updateSuccess,
      insertId: tmpArticle.id,
    };
  }

  async addLabel() {
    const label = this.ctx.request.body;
    const result = await this.app.mysql.insert('label', label);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async setArticleLabels() {
    const labels = this.ctx.request.body;
    const articleId = this.ctx.params.articleId;
    for (const label of labels) {
      const hasLabel = `
        SELECT * FROM article_label WHERE article_id = ${articleId} AND label_id = ${label}
      `;
      const result = await this.app.mysql.query(hasLabel);
      if (!result[0]) {
        const sql = `
          INSERT INTO article_label (article_id, label_id) VALUES (${articleId}, ${label});
        `;
        await this.app.mysql.query(sql);
      }
    }
    this.ctx.body = {
      isSuccess: true,
    };
  }

  async getArticleList() {
    const { offset = 0, size = 8 } = this.ctx.query;
    const countsql = 'SELECT COUNT(id) count FROM article;';
    const sql = `      
      SELECT a.id id, a.title, a.introduce, a.article_content context, a.view_count, a.like_count, a.release_time releaseTime, a.updateAt, a.createAt,
      IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
      (SELECT JSON_ARRAYAGG(CONCAT('${this.app.config.myHost}/images/',file.filename)) FROM file WHERE a.id = file.article_id) images
      FROM article a
      LEFT JOIN article_label al ON a.id = al.article_id
      LEFT JOIN label l ON al.label_id = l.id
      GROUP BY a.id
      LIMIT ${offset}, ${size};
    `;
    const result = await this.app.mysql.query(sql);
    const [{ count }] = await this.app.mysql.query(countsql);
    this.ctx.body = {
      data: result,
      count,
    };
  }

  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = `      
      SELECT a.id id, a.title, a.introduce, a.article_content context, a.view_count viewCount, a.like_count likeCount, a.release_time releaseTime,
      IF(COUNT(l.id),JSON_ARRAYAGG(JSON_OBJECT('id', l.id, 'name', l.name)), NULL) labels,
      (SELECT JSON_ARRAYAGG(CONCAT('${this.app.config.myHost}/images/',file.filename)) FROM file WHERE a.id = file.article_id) images
      FROM article a
      LEFT JOIN article_label al ON a.id = al.article_id
      LEFT JOIN label l ON al.label_id = l.id
      WHERE a.id = ${id}
      GROUP BY a.id;
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result[0],
    };
  }

  async deleteContent() {
    const id = this.ctx.params.id;
    const result = await this.app.mysql.delete('article', { id });
    const delSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: delSuccess,
    };
  }

  async uploadPicture() {
    const file = this.ctx.request.files[0];
    const id = this.ctx.query.id ? this.ctx.query.id : null;
    const filename = Date.now() + '' + Number.parseInt(Math.random() * 10000) + path.extname(file.filename);
    const afile = fs.readFileSync(file.filepath); // files[0]表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
    fs.writeFileSync(path.join('uploads/picture/' + filename), afile); // 將文件放入指定位置
    const sql = `
      INSERT INTO file (filename, mimetype, article_id) VALUES ('${filename}', '${file.mimeType}', ${id})
    `;
    const result = await this.app.mysql.query(sql);
    console.log(result);
    this.ctx.body = {
      isSuccess: true,
    };
  }

  async comment() {
    const { offset = 0, size = 8 } = this.ctx.query;
    const countsql = 'SELECT COUNT(id) count FROM comment c WHERE c.comment_id IS NULL AND c.user_id NOT IN (SELECT u.id FROM user u WHERE u.block = 1);';
    const sql = `
      SELECT c.id, c.content, c.article_id articleId, c.user_id userId, c.comment_id commentId, c.createAt createTime, c.updateAt updateTime,
      JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarUrl', CONCAT('${this.app.config.myHost}', cu.avatar_url)) user,
      IF(COUNT(sc.id), 
      JSON_ARRAYAGG(JSON_OBJECT('id', sc.id, 'content', sc.content, 
      'articleId', sc.article_id, 'userId', sc.user_id, 'commentId', sc.comment_id, 'createTiem', sc.createAt, 'updateTime', sc.updateAt,
      'user', (SELECT JSON_OBJECT('id', scu.id, 'name', scu.name, 'avatarUrl', CONCAT('${this.app.config.myHost}', scu.avatar_url)) FROM user scu WHERE scu.id = sc.user_id)
      )), 
      NULL) childComments
      FROM comment c
      LEFT JOIN user cu ON c.user_id = cu.id
      LEFT JOIN comment sc ON sc.comment_id = c.id
      WHERE c.comment_id IS NULL AND c.user_id NOT IN (SELECT u.id FROM user u WHERE u.block = 1)
      GROUP BY c.id
      ORDER BY c.updateAt DESC
      LIMIT ${offset}, ${size};
    `;
    const result = await this.app.mysql.query(sql);
    const [{ count }] = await this.app.mysql.query(countsql);
    this.ctx.body = {
      data: result,
      count,
    };
  }

  async reply() {
    const { commentId } = this.ctx.params;
    const { articleId, content, id } = this.ctx.request.body;
    const sql = `
      INSERT INTO comment (content, article_id, user_id, comment_id) VALUES ('${content}', ${articleId}, ${id}, ${commentId});
    `;
    const result = await this.app.mysql.query(sql);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;
    const searchSql = `
      SELECT createAt createTime FROM comment WHERE id = ${insertId};
    `;
    const [{ createTime }] = await this.app.mysql.query(searchSql);
    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
      createTime,
    };
  }

  async getMemberList() {
    const { offset = 0, size = 8 } = this.ctx.query;
    const countsql = "SELECT COUNT(id) count FROM user u WHERE u.email != 'admin';";
    const sql = `
      SELECT id, name, email, CONCAT('${this.app.config.myHost}', u.avatar_url) avatarUrl, u.updateAt updateTime, u.createAt createTime, block
      FROM user u
      WHERE u.email != 'admin'
      LIMIT ${offset}, ${size};
    `;
    const result = await this.app.mysql.query(sql);
    const [{ count }] = await this.app.mysql.query(countsql);
    this.ctx.body = {
      data: result,
      count,
    };
  }

  async addBlock() {
    const { blockStatus, userId } = this.ctx.request.body;
    const sql = `
      UPDATE user SET block = ${blockStatus} WHERE id = ${userId}
    `;
    const result = await this.app.mysql.query(sql);
    const insertSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: insertSuccess,
    };
  }
}

module.exports = MainController;
