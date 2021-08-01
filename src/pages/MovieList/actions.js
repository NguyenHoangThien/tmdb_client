import { client } from 'helpers';

export const getLists = (page = 1) => async dispatch => {
  try {
    const res = await client.request({
      path: '/movies',
      method: 'GET',
      params: { page }
    });
    return res.data.results;
  } catch (error) {
    return [];
  }
};