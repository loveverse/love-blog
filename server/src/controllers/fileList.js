const response = require("../utils/resData");
const { convertorFileSize } = require("../utils/common");
const seq = require("../mysql/sequelize");
const FileListModel = require("../models/file_list");
const MFileList = FileListModel(seq);
class FileList {
  async findFileLsit(ctx, next) {
    try {
      if (ctx.state.user) {
        let data = await MFileList.findAll({
          where: { user_id: ctx.state.user.id },
          order: [["id", "DESC"]],
        });
        let list = data.map((k) => {
          k.dataValues.fileSize = convertorFileSize(parseFloat(k.fileSize));
          delete k.dataValues.userId;
          return k;
        });
        ctx.body = response.SUCCESS("common", list);
      } else {
        let data = await MFileList.findAll({
          where: { user_id: null },
          order: [["id", "DESC"]],
        });
        let list = data.map((k) => {
          k.dataValues.fileSize = convertorFileSize(parseFloat(k.fileSize));
          delete k.dataValues.userId;
          return k;
        });
        ctx.body = response.SUCCESS("common", list);
      }
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
  async saveFileInfo(ctx, next) {
    try {
      const info = ctx.request.body;
      const params = {
        file_name: info.name,
        file_size: info.size,
        file_type: info.type,
        file_url: info.url,
      };
      if (ctx.state.user) {
        params.user_id = ctx.state.user.id;
      }
      const data = await MFileList.create(params);
      ctx.body = response.SUCCESS("common", data);
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }

  async delFile(ctx, next) {
    try {
      const { id } = ctx.request.body;
      // 只有上传用户自己或者管理员才能删除
      if (ctx.state.user) {
        const data = await MFileList.destroy({ where: { id } });
        ctx.body = response.SUCCESS("common", data);
      } else {
        ctx.body = response.ERROR("powerLacking");
      }
    } catch (error) {
      console.log(error);
      ctx.body = response.SERVER_ERROR();
    }
  }
}
module.exports = new FileList();
