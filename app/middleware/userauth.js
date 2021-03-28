'use strict';
const fs = require('fs');
const path = require('path');

module.exports = app => {

  const verifyLogin = async (ctx, next) => {
    // 拿到用戶的email
    const { email, name, image, token } = ctx.request.body;
    console.log(token);
    console.log(app.jwt.verify(token, app.config.jwt.secret));

    if (!email) {
      ctx.body = { data: 'is not login' };
      return;
    }
    // 判斷有沒有被註冊
    const sql = `
      SELECT * FROM user WHERE email = '${email}';
    `;
    const result = await app.mysql.query(sql);
    const user = result[0];
    ctx.user = {
      id: user && user.id,
      email,
      name,
      image,
    };
    if (!user) { // 如果沒註冊

      const sql = `
        INSERT INTO user (email, name, avatar_url) VALUES ('${email}', '${name}', '${image}');
      `;
      const newResult = await app.mysql.query(sql);
      ctx.user.id = newResult.insertId;
      if (!image) return;

      // 將圖片進行轉存
      const imgResult = await ctx.curl(image);
      fs.writeFileSync(path.join('uploads/avatar/' + newResult.insertId), imgResult.data);
      const avatarUrl = `http://localhost:7001/user/avatar/${newResult.insertId}`;
      const uploadSql = `
        UPDATE user SET avatar_url = '${avatarUrl}' WHERE id = ${newResult.insertId};
      `;
      await app.mysql.query(uploadSql);
    }
    await next();
  };

  const verifyAuth = async (ctx, next) => {
    console.log('驗證授權');
    const authorization = ctx.headers.authorization;
    if (!authorization) {
      ctx.body = { data: 'is not login' };
      return;
    }
    const token = authorization.replace('Bearer ', '');
    // console.log(token)
    try {
      const result = app.jwt.verify(token, app.config.jwt.secret);
      ctx.token = result;
    } catch (error) {
      ctx.body = { data: 'is not login' };
      return;
    }
    await next();
  };

  const verifyPermission = async (ctx, next) => {
    // 透過params請求來決定查詢表的參數
    const { id } = ctx.token;
    const [ resourceKey ] = Object.keys(ctx.params);
    const tableName = resourceKey.replace('Id', '');
    const resourceId = ctx.params[resourceKey];

    const sql = `
      SELECT user_id userId FROM ${tableName} WHERE id = ${resourceId}; 
    `;
    // 查詢是否具備權限
    const userId = await app.mysql.query(sql);
    const isPermission = userId === id;
    if (isPermission) {
      ctx.body = { data: 'is not login' };
      return;
    }

    await next();
  };

  const verifyBlock = async (ctx, next) => {
    const { id } = ctx.token;
    // 驗證黑名單
    const sql = `
      SELECT block FROM user WHERE user.id = ${id};
    `;
    const [{ block }] = await app.mysql.query(sql);
    if (block) {
      ctx.body = { data: '無此權限' };
      return;
    }
    await next();
  };

  const verifyReply = async (ctx, next) => {
    const { id } = ctx.token;
    const sql = `
      SELECT TIMESTAMPDIFF(SECOND, c.updateAt, CURRENT_TIMESTAMP) timediff
      FROM comment c WHERE c.user_id = ${id}
      ORDER BY c.updateAt 
      DESC LIMIT 1;
    `;
    const result = await app.mysql.query(sql);
    const { timediff } = { ...result[0] };
    console.log(timediff);
    if (timediff < 60) {
      ctx.body = { data: '請稍等一分鐘後嘗試' };
      return;
    }
    await next();
  };

  const avatarHandler = async (ctx, next) => {
    const file = ctx.request.files[0];
    console.log(file);
    await next();
  };

  return {
    verifyLogin,
    verifyAuth,
    verifyPermission,
    avatarHandler,
    verifyReply,
    verifyBlock,
  };
};
