const LatestTemplates: React.FC = () => {
  const cards = Array(7).fill(null);
  const placeholderImage = "https://via.placeholder.com/150x225?text=No+Image";
  const dummyImage =
    "https://img.freepik.com/free-photo/teamwork-makes-dream-work-motivation-quote-message-box_53876-121429.jpg?t=st=1727979349~exp=1727982949~hmac=a8c15ceafc082e9be6a8587d406e5ff48581125cb28d606ae5078d52dcabae97&w=996";

  return (
    <section>
      <p className="fs-2 text-center mb-5">Latest templates</p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 ">
        {cards.map((_, index) => (
          <div className="col" key={index}>
            <div className="card shadow-sm">
              <img
                src={dummyImage ? dummyImage : placeholderImage}
                className="card-img-top img-fluid object-cover"
                alt="Placeholder"></img>

              <div className="card-body">
                <p className="card-text">Quiz Template {index + 1}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="btn-group">
                    <button type="button" className="btn btn-sm btn-primary">
                      View
                    </button>
                  </div>
                  <small className="text-body-secondary">9 aug</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LatestTemplates;
