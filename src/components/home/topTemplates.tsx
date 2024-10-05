const TopTemplates: React.FC = () => {
  return (
    <div>
      <p className="fs-2 text-center mb-5">Top templates</p>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">template id</th>
            <th scope="col">name</th>
            <th scope="col">filled forms</th>
            <th scope="col">last updated</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>25</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>35</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>65</td>
            <td>@fat</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TopTemplates;
