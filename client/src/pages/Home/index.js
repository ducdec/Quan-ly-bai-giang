import ShowCourse from '../Course/show';

function Home() {
  return (
    <div>
      Home page
      <ShowCourse />
    </div>
  );
}

export default Home;

// // Fetch data from the server
// fetch('/api/courses')
//   .then(response => response.json())
//   .then(data => {
//     // Handle the data (e.g., render it on the page)
//     renderCourses(data);
//   })
//   .catch(error => console.error('Error fetching data:', error));

// function renderCourses(courses) {
//   // You can render the courses on the page as needed
//   // For simplicity, let's assume there's an element with id "courseList" to display the courses
//   const courseListElement = document.getElementById('courseList');

//   // Clear existing content
//   courseListElement.innerHTML = '';

//   // Iterate over courses and append them to the list
//   courses.forEach(course => {
//     const courseItem = document.createElement('li');
//     courseItem.textContent = course.name; // Assuming each course has a "name" property
//     courseListElement.appendChild(courseItem);
//   });
// }

{
  /* <body>
  <h1>Course List</h1>
  <ul id="courseList"></ul>

  <!-- Include your client-side script here -->
  <script src="/path/to/your/clientScript.js"></script>
</body> */
}
