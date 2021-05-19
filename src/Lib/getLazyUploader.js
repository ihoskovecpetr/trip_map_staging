let promise = null;

const resetPendingPromise = () => {
  promise = null;
};

const getLazyUploader = (getResult, getPromise) => {
  return async () => {
    const result = getResult();

    if (result) {
      promise = null;
      console.log("Giving him saved result");

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
  resetPendingPromise,
};
