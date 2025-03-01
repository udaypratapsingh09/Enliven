class AppError extends Error {
  constructor(message, status) {
    console.log("AppError");
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = AppError;
