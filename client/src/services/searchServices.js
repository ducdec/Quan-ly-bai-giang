import * as httpRequest from '~/utils/httpRequest';

//API
export const search = async (q, type = 'less') => {
  try {
    const res = await httpRequest.get(`users/search`, {
      params: {
        q,
        type,
      },
    });
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

export const Data = async () => {
  try {
    const res = await httpRequest.get('');
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
