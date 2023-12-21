function FormatTime(timestamp) {
  const formattedTimestamp = new Date(timestamp);

  // Lấy thông tin thời gian
  const year = formattedTimestamp.getFullYear();
  const month = String(formattedTimestamp.getMonth() + 1).padStart(2, '0');
  const day = String(formattedTimestamp.getDate()).padStart(2, '0');
  const hours = String(formattedTimestamp.getHours()).padStart(2, '0');
  const minutes = String(formattedTimestamp.getMinutes()).padStart(2, '0');

  // Tạo chuỗi định dạng
  return `${hours}:${minutes}  ${day}-${month}-${year}`;
}

export default FormatTime;
