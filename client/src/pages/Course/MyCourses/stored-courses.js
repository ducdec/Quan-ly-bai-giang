function StoredCourse() {
  return (
    <div>
      <form
        class="mt-4"
        name="container-form"
        method="POST"
        action="/courses/handle-form-actions"
      >
        <h3>Danh Sách</h3>
        <div class="row">
          <div class="mt-4 d-flex align-items-center .col-md-4">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="checkbox-all"
              />
              <label class="form-check-label select-all" for="checkbox-all">
                Chọn tất cả
              </label>
            </div>

            <select
              class="form-control form-control-sm checkbox-select-all"
              name="action"
              required
            >
              <option value="">-- Hành động --</option>
              <option value="delete">Xóa</option>
            </select>

            <button
              class="btn btn-primary btn-sm check-all-submit-btn"
              disabled
            >
              Thực hiện
            </button>
          </div>

          <a class="col-md-3 ml-md-auto" href="/me/trash/courses">
            Thùng Rác
          </a>
        </div>
        <table class="table mt-4">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Stt</th>
              <th scope="col">Tên</th>
              <th scope="col">Người Hướng Dẫn</th>
              <th scope="col" colspan="2">
                Thời gian tạo
              </th>
            </tr>
          </thead>
          {/* {{#each courses}} */}
          <tbody>
            <tr>
              <td>
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    name="courseId[]"
                    value="{{this._id}}"
                  />
                </div>
              </td>
              <th scope="row">1</th>
              <td>name</td>
              <td>1</td>
              <td></td>
              <td>
                <a href="/courses/{{this._id}}/edit" class="btn btn-link">
                  Sửa
                </a>
                <a
                  href=""
                  class="btn btn-link"
                  data-id="{{this._id}}"
                  data-toggle="modal"
                  data-target="#delete-course-model"
                >
                  Xóa
                </a>
              </td>
            </tr>
          </tbody>
          <tr>
            <td colspan="5" class="text-center">
              Bạn chưa đăng cm gì cả!!!!
              <a href="/courses/create">Đăng now</a>
            </td>
          </tr>
        </table>
      </form>

      {/* {{!-- confim --}}  */}

      <div id="delete-course-model" class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Xóa hả?</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Bạn chắc chắn muón xóa?</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                id="btn-delete-course"
                class="btn btn-danger"
              >
                Xóa bỏ
              </button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* {{!--Delete hidden form  --}} */}
      <form name="delete-course-form" method="POST"></form>
    </div>
  );
}

export default StoredCourse;
