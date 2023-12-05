import request from '~/utils/axios';

export const storedCourse = async () => {
  try {
    const res = await request.get('courses/stored');
    return res.data;
  } catch (error) {
    console.error('Error fetching stored courses:', error);
    throw error;
  }
};
