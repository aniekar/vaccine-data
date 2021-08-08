const DataContainer = ({ data }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th scope="col">Manufacturer</th>
          <th scope="col">Vaccines left</th>
          <th scope="col">Orders</th>
          <th scope="col">Vaccines</th>
          <th scope="col">Vaccinations</th>
          <th scope="col">Vaccines expired</th>
          <th scope="col">Vaccines expiring within 10 days</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">All</th>
          <td>{data.allVaccinesLeft}</td>
          <td>{data.allOrderCount}</td>
          <td>{data.allVaccineCount}</td>
          <td>{data.allVaccinesUsed}</td>
          <td>{data.allVaccinesExpired}</td>
          <td>{data.allVaccinesExpiringWithinTenDays}</td>
        </tr>
        <tr>
          <th scope="row">Antiqua</th>
          <td>{data.antiquaVaccinesLeft}</td>
          <td>{data.antiquaOrderCount}</td>
          <td>{data.antiquaVaccineCount}</td>
          <td>{data.antiquaVaccinesUsed}</td>
          <td>{data.antiquaExpired}</td>
          <td>{data.antiquaExpiringWithinTenDays}</td>
        </tr>
        <tr>
          <th scope="row">SolarBuddhica</th>
          <td>{data.sbVaccinesLeft}</td>
          <td>{data.sbOrderCount}</td>
          <td>{data.sbVaccineCount}</td>
          <td>{data.sbVaccinesUsed}</td>
          <td>{data.sbExpired}</td>
          <td>{data.sbExpiringWithinTenDays}</td>
        </tr>
        <tr>
          <th scope="row">Zerpfy</th>
          <td>{data.zerpfyVaccinesLeft}</td>
          <td>{data.zerpfyOrderCount}</td>
          <td>{data.zerpfyVaccineCount}</td>
          <td>{data.zerpfyVaccinesUsed}</td>
          <td>{data.zerpfyExpired}</td>
          <td>{data.zerpfyExpiringWithinTenDays}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default DataContainer;
