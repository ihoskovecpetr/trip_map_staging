let promise = null;

const resetPendingPromise = () => {
  promise = null;
};

const getLazyDownloader = (getResult, getPromise) => {
  return async () => {
    const result = getResult();

    if (result) {
      promise = null;
      return result;
    }

    if (promise) {
      return promise;
    }

    promise = getPromise();
    return promise;
  };
};

module.exports = {
  getLazyDownloader,
  resetPendingPromise,
};
