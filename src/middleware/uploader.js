
export default function uploaderMiddleware({getState}) {
  function uploader(...args) {
    return getState().getIn(['/engine', 'uploader'])(...args);
  }

  return (next) => (action) => {
    const { type } = action;
    switch (type) {
      case 'REPLACE_FILE':
        action.promise = uploader([action.file], true, action.onProgress).then(r => r[0]);
        break;
      case 'UPLOAD_FILE':
        action.promise = uploader([action.file], false, action.onProgress).then(r => r[0]);
        break;
      case 'UPLOAD_FILES':
        action.promise = uploader(action.files, false, action.onProgress);
        break;
      case 'SET_HOSTING_CONFIG':
        action.promise = loadUploader(action.config).then(({uploader}) => {
          return next({
            type: 'SET_UPLOADER',
            uploader
          });
        })
        break;
    }
    return next(action);
  }
}

export function loadUploader(config) {
  return System.import(config.module, __moduleName).then(module => {
    return {
      uploader: module.uploaderFactory(config),
      publisher: module.publisherFactory ? module.publisherFactory(config) : null,
    }
  });
}
