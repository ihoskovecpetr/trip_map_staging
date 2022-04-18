let promise = null;

const forceResetPendingPromise = () => {
  promise = null;
};

const getLazyUploader = (getResult, getPromise) => {
  return async () => {
    const result = getResult();

    if (result) {
      promise = null;

      return result;
    }

    if (promise) {
      console.log("Giving him pending promise");
      return promise;
    }

    promise = getPromise();
    console.log("Setting getPromise");
    return promise;
  };
};

module.exports = {
  getLazyUploader,
  forceResetPendingPromise,
};
