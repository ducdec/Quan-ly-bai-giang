// src/components/FileList.js
import React from 'react';

function FileList({ files }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Tệp Tin</th>
          <th>Ngày Tải Lên</th>
          <th>Thao Tác</th>
        </tr>
      </thead>
      <tbody>
        {files.map((file) => (
          <tr key={file.id}>
            <td>{file.filename}</td>
            <td>{file.uploadDate}</td>
            <td>
              <a href={`/download/${file.filename}`}>Tải Xuống</a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FileList;
