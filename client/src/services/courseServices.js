import * as httpRequest2 from '~/utils/httpRequest2';

//API

export const getCourse = async () => {
  try {
    const res = await httpRequest2.get('courses/get');
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
