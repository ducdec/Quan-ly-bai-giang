// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import FileList from '~/components/FileList/FileList';
// import FileUpload from '~/components/FileUpload/FileUpload';

// function Profile() {
//   const [files, setFiles] = useState([]);

//   const fetchFiles = async () => {
//     try {
//       const response = await axios.get('/files');
//       setFiles(response.data);
//     } catch (error) {
//       console.error('Failed to fetch files:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFiles();
//   }, []);

//   const handleUpload = (uploadedFile) => {
//     setFiles([...files, uploadedFile]);
//   };

//   return (
//     <div>
//       <h1>Quản lý Tệp Tin Giảng Viên</h1>
//       <FileUpload onUpload={handleUpload} />
//       <FileList files={files} />
//     </div>
//   );
// }

// export default Profile;
