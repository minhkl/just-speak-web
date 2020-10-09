import axios from 'axios';

const DEFAULT_TIMEOUT_MS = '60000';

export const download = (url, options) => {
  axios(url, {
    ...options,
    responseType: 'blob',
  }).then((response) => {
    const objUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = objUrl;
    link.setAttribute('download', options.fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }).catch((error) => {
    // eslint-disable-next-line no-console
    console.error('download error: ', error);
    // ...
  });
};

export default async function request(url, options) {
  const optionsWithDefaultTimeout = {
    ...options,
    url,
    timeout: DEFAULT_TIMEOUT_MS,
    'Content-Type': 'application/json',
  };
  try {
    const response = await axios(optionsWithDefaultTimeout);
    return [null, response.data, response];
  } catch (error) {
    return [error.response.data, null, error.response];
  }
}
