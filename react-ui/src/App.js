import { useLazyQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';

import { GET_DATA_FOR_DATE } from './queries';

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

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dataForDate, setDataForDate] = useState(null);
  const [getData, result] = useLazyQuery(GET_DATA_FOR_DATE);

  const handleDateChange = (date) => {
    const utcStartOfDate = moment(date).utc().startOf('day').format();
    setSelectedDate(new Date(utcStartOfDate));
    getData({ variables: { onDate: utcStartOfDate } });
  };

  console.log(selectedDate);

  useEffect(() => {
    if (result.data) {
      setDataForDate(result.data);
      console.log(result.data);
    }
  }, [result]);

  return (
    <div className="App">
      <header>
        <h1>Vaccine data</h1>
      </header>
      <h2>{selectedDate.toJSON().slice(0,10).split('-').reverse().join('/')}</h2>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
      {dataForDate && <DataContainer data={dataForDate} />}
    </div>
  );
}

export default App;
