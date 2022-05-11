class uploadController {
  async upload(ctx, next) {
    const file = ctx.request.files.file;
    ctx.body = { filename: file.newFilename };
    next();
  }
}

module.exports = new uploadController();
