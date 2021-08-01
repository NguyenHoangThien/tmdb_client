import { client } from 'helpers';

export const getLists = ({ page = 1, type }) => async dispatch => {
  try {
    const res = await client.request({
      path: '/movies',
      method: 'GET',
      params: { page, type }
    });
    return res.data.results;
  } catch (error) {
    return [];
  }
};