export const getBasePath = () => {
    const isDev = import.meta.env.MODE === 'development';
    return isDev ? '' : '/softdev';
  };