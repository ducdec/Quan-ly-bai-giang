function CourseItem({ data }) {
  return (
    <div class="mt-4">
      <div class="row">
        <div class="col-lg-3">
          <button>Hoc ngay</button>
          <ul>
            <li>{data.anpha}</li>
            {/* <li>{{data.beta}}</li> */}
          </ul>
        </div>

        <div class="col-lg-9">
          <h2>{data.name}</h2>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/{{data.videoID}}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
          <p>{data.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseItem;
