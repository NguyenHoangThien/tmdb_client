import { client } from 'helpers';

export const getDetail = (id) => async dispatch => {
  try {
    const res = await client.request({
      path: `/movie/${id}`,
      method: 'GET',
      host: 'https://api.themoviedb.org/3',
      params: {
        language: 'en-US',
        api_key: '8faa6723b1405c781d947e731b73629b',
      }
    });
    return res.data;
  } catch (error) {
    return [];
  }
};