'use strict';
const fs = require('fs');
const path = require('path');

// const fs = require('fs');
const Controller = require('egg').Controller;

class UserController extends Controller {
  async login() {
    const { id, email, name, image } = this.ctx.user;
    const token = this.app.jwt.sign({ id, email }, this.app.config.jwt.secret);
    this.ctx.body = {
      id,
      email,
      name,
      image,
      token,
    };
  }

  async info() {
    const { id: userId } = this.ctx.token;
    const sql = `
      SELECT u.id, u.email, u.name, CONCAT('${this.app.config.myHost}', u.avatar_url) avatarUrl, u.block,
      IF(COUNT(a.id), JSON_ARRAYAGG(a.id), NULL) favorite
      FROM user u
      LEFT JOIN favorite f ON u.id = f.user_id
      LEFT JOIN article a ON f.article_id = a.id
      WHERE u.id = ${userId}
      GROUP BY u.id;
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = result[0];
  }

  async getAvatarInfo() {
    const userId = this.ctx.params.id;
    this.ctx.response.set('content-type', 'image/jpeg');
    this.ctx.body = fs.createReadStream('uploads/avatar/' + userId);
  }

  async modify() {
    const { id } = this.ctx.token;
    const { name } = this.ctx.request.body;
    if (name.length > 10) {
      this.ctx.body = {
        data: 'name is too long',
      };
      return;
    }
    const sql = `
      UPDATE user SET name = '${name}' WHERE id = ${id};
    `;
    const result = await this.app.mysql.query(sql);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async upload() {
    const file = this.ctx.request.files[0];

    let userId;
    if (!this.ctx.token) {
      userId = this.ctx.query.userId;
    } else {
      userId = this.ctx.token.id;
    }
    const afile = fs.readFileSync(file.filepath); // files[0]表示获取第一个文件，若前端上传多个文件则可以遍历这个数组对象
    fs.writeFileSync(path.join('uploads/avatar/' + userId), afile); // 將文件放入指定位置
    const avatarUrl = `/user/avatar/${userId}`;
    const sql = `
      UPDATE user SET avatar_url = '${avatarUrl}' WHERE id = ${userId};
    `;
    const result = await this.app.mysql.query(sql);
    console.log(result);
    this.ctx.body = {
      isSuccess: true,
    };
  }

  async favoriteList() {
    const { id } = this.ctx.token;
    let { offset = 0, size = 2 } = this.ctx.query;
    if (size > 8) size = 8;
    const sql = `
      SELECT a.id id, a.title, a.introduce, left(a.article_content, 200) context, a.view_count, a.like_count, a.release_time releaseTime, a.updateAt, a.createAt,
      (SELECT JSON_ARRAYAGG(CONCAT('${this.app.config.myHost}/images/',file.filename)) FROM file WHERE a.id = file.article_id) images
      FROM favorite f
      LEFT JOIN article a ON f.article_id = a.id
      WHERE f.user_id = ${id}
      ORDER BY f.article_id DESC
      LIMIT ${offset}, ${size};
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }

  async favorite() {
    const { articleId } = this.ctx.request.body;
    const { id } = this.ctx.token;
    const sql = `
      INSERT INTO favorite (user_id, article_id) VALUES (${id}, ${articleId});
    `;
    const result = await this.app.mysql.query(sql);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async cancelFavorite() {
    const { articleId } = this.ctx.request.body;
    const { id } = this.ctx.token;
    const sql = `
      DELETE FROM favorite WHERE user_id = ${id} AND article_id = ${articleId};
    `;
    const result = await this.app.mysql.query(sql);
    const insertSuccess = result.affectedRows === 1;
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  async comment() {
    const { id } = this.ctx.token;
    const { articleId, content } = this.ctx.request.body;

    if (content.length > 250) {
      this.ctx.body = {
        data: '文章過長',
      };
      return;
    }
    const sql = `
      INSERT INTO comment (content, article_id, user_id ) VALUES ('${content}', ${articleId}, ${id});
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

  async reply() {
    // const { commentId } = this.ctx.params;
    const { id } = this.ctx.token;
    const { articleId, content } = this.ctx.request.body;
    const sql = `
      INSERT INTO comment (content, article_id, user_id) VALUES ('${content}', ${articleId}, ${id});
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

  async modifyComment() {
    const { commentId } = this.ctx.params;
    const { content } = this.ctx.request.body;
    const sql = `
      UPDATE comment SET content = '${content}' WHERE id = ${commentId};
    `;
    const result = await this.app.mysql.query(sql);
    const insertSuccess = result.affectedRows === 1;
    const searchSql = `
      SELECT updateAt updateTime FROM comment WHERE id = ${commentId};
    `;
    const [{ updateTime }] = await this.app.mysql.query(searchSql);
    this.ctx.body = {
      isSuccess: insertSuccess,
      updateTime,
    };
  }

  async deleteComment() {
    const { commentId } = this.ctx.params;
    const sql = `
      DELETE FROM comment WHERE id = ${commentId};
    `;
    const result = await this.app.mysql.query(sql);
    const insertSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: insertSuccess,
    };
  }

  async notice() {
    const { id } = this.ctx.token;
    let { offset = 0, size = 2 } = this.ctx.query;
    if (size > 8) size = 8;
    const sql = `
      SELECT c.id, c.content, c.article_id articleId, c.user_id userId, c.comment_id commentId, c.createAt createTime, c.updateAt updateTime,
      c1.id mainId, c1.content mainContent
      FROM comment c
      LEFT JOIN comment ci ON ci.id = c.id AND ci.user_id = ${id} AND c.comment_id IS NULL
      LEFT JOIN comment c1 ON c.comment_id = c1.id
      WHERE c.comment_id IS NOT NULL
      ORDER BY c.updateAt
      LIMIT ${offset}, ${size};
    `;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = {
      data: result,
    };
  }
}

module.exports = UserController;
