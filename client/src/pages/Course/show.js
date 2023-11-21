import { useEffect, useState } from 'react';
import CourseItem from '~/components/CourseItem';
import * as CourseServices from '~/services/courseServices';

function ShowCourse() {
  const [courseResult, setCourseResult] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const result = await CourseServices.getCourse();
        if (result) {
          setCourseResult(result);
        } else {
          console.error('API returned an empty result.');
        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      }
    };

    fetchApi();
  }, []); // [] useEffect chỉ chạy một lần

  return (
    <div>
      {courseResult.map((result) => (
        <CourseItem key={result.id} data={result} />
      ))}
    </div>
  );
}

export default ShowCourse;
