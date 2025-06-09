// utils/GlobalLoader.js
let loaderRef = null;

export const setLoaderRef = ref => {
  loaderRef = ref;
};

export const showLoader = () => {
  loaderRef?.show?.();
};

export const hideLoader = () => {
  loaderRef?.hide?.();
};
