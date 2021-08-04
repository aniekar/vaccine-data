import { useLazyQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';


const GET_DATA_FOR_DATE = gql`
  query getDataForDate($onDate: String!) {
    orderCount(onDate: $onDate)
    vaccineCount(onDate: $onDate)
    vaccinesUsed(onDate: $onDate)
    vaccinesExpiredBeforeUsage(onDate: $onDate)
    vaccinesExpiringWithinTenDays(onDate: $onDate)
    vaccinesLeft(onDate: $onDate)
  }
`;

// const GET_MANUFACTURER_DATA = gql`
//  query getManufacturerData($onDate: String!, $manufacturer: String) {
//     vaccinesExpiredBeforeUsage(onDate: $onDate, manufacturer: $manufacturer)
//  }
// `;

const DataContainer = ({ date, data }) => {
  return (
    <div>
      <h2>{date}</h2>
      <p>Orders arrived today: {data.orderCount}</p>
      <p>Vaccines arrived today: {data.vaccineCount}</p>
      <p>Vaccines expired before usage: {data.vaccinesExpiredBeforeUsage}</p>
      <p>Vaccines expiring within 10 days: {data.vaccinesExpiringWithinTenDays}</p>
      <p>Vaccines left (at the beginning of the day): {data.vaccinesLeft}</p>
      <p>Vaccinations done today: {data.vaccinesUsed}</p>
    </div>
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
    }
  }, [result]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vaccine data</h1>
      </header>
      <DatePicker
        dateFormat="MM/dd/yyyy"
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
      {dataForDate && <DataContainer date={selectedDate.toISOString()} data={dataForDate} />}
    </div>
  );
}

export default App;
