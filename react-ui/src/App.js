import { useLazyQuery, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './App.css';
import 'react-datepicker/dist/react-datepicker.css';

import { GET_DATA_FOR_DATE } from './queries';
import DataContainer from './components/DataContainer';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date('2021-01-02'));
  const [dataForDate, setDataForDate] = useState(null);
  const initialData = useQuery(GET_DATA_FOR_DATE, {
    variables: { onDate: moment.utc('2021-01-02').format() },
  });
  const [getData, result] = useLazyQuery(GET_DATA_FOR_DATE);

  const handleDateChange = (date) => {
    const utcStartOfDate = moment.utc(date).startOf('day').format();
    setSelectedDate(new Date(utcStartOfDate));
    getData({ variables: { onDate: utcStartOfDate } });
  };

  useEffect(() => {
    if (result.data) {
      setDataForDate(result.data);
      console.log(result.data)
    } else if (initialData.data) {
      setDataForDate(initialData.data);
    }
  }, [result, initialData]);

  return (
    <div className="App">
      <header>
        <h1>Vaccine data</h1>
      </header>
      <h2>
        {selectedDate.toJSON().slice(0, 10).split('-').reverse().join('/')}
      </h2>
      <DatePicker
        dateFormat="dd/MM/yyyy"
        selected={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
      {dataForDate && <DataContainer data={dataForDate} />}
      <div className="data-notes">
        <h4>Notes on the data:</h4>
        <p>All dates are UTC.</p>
        <p>Vaccines left is the number of vaccines in stock at the beginning of the day.</p>
        <p>The number of orders, vaccines and vaccinations displayed is for the selected date only, whereas the number of expired vaccines is the accumulated number from the start until the selected date.</p>
      </div>
    </div>
  );
}

export default App;
