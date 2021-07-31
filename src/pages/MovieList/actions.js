import { client } from 'helpers';

export const getLists = () => async dispatch => {
  try {
    const res = await client.request({
      path: '/discover/movie',
      method: 'GET',
      params: {
        sort_by: 'popularity.desc',
        api_key: '8faa6723b1405c781d947e731b73629b',
        page: 1
      }
    });
    console.log('res.data.results', res.data.results);
    return res.data.results;
  } catch (error) {
    return [];
  }
};