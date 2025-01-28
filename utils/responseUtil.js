function createError(error, statusCode = 500) {
  return { status: "error", statusCode, error };
}

function createSuccess(data, statusCode = 200) {
  return { status: "success", statusCode, data };
}

function createResult(error, data, statusCode = 200) {
  return error
    ? createError(error, statusCode)
    : createSuccess(data, statusCode);
}

module.exports = {
  createError,
  createSuccess,
  createResult,
};
