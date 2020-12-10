import React, { useState  } from 'react';
import './App.css';
import dataList from './search-list-json';

function App(){
const [searchText, setSearchText] = useState("");
  const [data, setData] = useState(dataList);
 
  // exclude column list from filter
  const excludeColumns = [];
 
  // handle change event of search input
  const handleChange = value => {
    setSearchText(value);
    filterData(value);
  };
 
  // filter records by search text
  const filterData = (value) => {
    const lowercasedValue = value.toLowerCase().trim();
    if (lowercasedValue === "") setData(dataList);
    else {
      const filteredData = dataList.filter(item => {
        return Object.keys(item).some(key =>
          excludeColumns.includes(key) ? false : item[key].toString().toLowerCase().includes(lowercasedValue)
        );
      });
      setData(filteredData);
    }
  }

        return (
            <div className="App">
              Search: <input
                style={{ marginLeft: 5 }}
                type="text"
                placeholder="Type to search..."
                value={searchText}
                onChange={e => handleChange(e.target.value)}
              />
              <div className="box-container">
                {data.map((d, i) => {
                  return <table key={i} className="box" style={{ border: "1px solid black" }}>
                    <tr><td>{d._id}</td></tr>
                    <tr><td>{d.name}</td> </tr>
                    <tr><td>{d.gender}</td></tr>
                    
                  </table>
                })}
                <div className="clearboth"></div>
                {data.length === 0 && <span>No records found to display!</span>}
              </div>
            </div>
          );
        }
    
    
        export default App;