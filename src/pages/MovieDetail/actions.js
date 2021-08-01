import { client } from 'helpers';

export const getDetail = (id) => async dispatch => {
  try {
    const res = await client.request({
      path: `/movies/${id}`,
      method: 'GET'
    });
    return res.data.results;
  } catch (error) {
    return {};
  }
};