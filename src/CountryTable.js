import BootstrapTable from 'react-bootstrap-table-next';
import React from 'react';

export class CountryTable extends React.Component {
    render() {
        let countries = this.props;
        let listItems = countries.map((item, index) => {
            return <li key={index}>{item.name}</li>;
        });
        return (
          <ul >
            {listItems}
          </ul>
        );
      }
}
/*const Table = (props) => {
   //console.log(props.countries);
   const countries = 
        (props.countries).map((country, index) => {
           return <li key={index}>{country.name}</li> 
           // <tr><td>{country.name}</td> <td>{country.alpha2Code}</td>
           // <td>{country.capital}</td><td>{country.flag}</td><td>{country.population}</td></tr>
            
        });
    
   
    return (<div>{countries}</div>);
}*/
/*
export const countries = (props) => {
    return props.countries;
};
const columns = [{
  dataField: 'name',
  text: 'Country Name'
}, {
  dataField: 'alpha2Code',
  text: 'Country Code'
}, {
  dataField: 'capital',
  text: 'Capital'
},{
    dataField: 'flag',
    text: 'Flag'
  }, {
    dataField: 'population',
    text: 'Population'
  }];

export default () =>
  <BootstrapTable keyField='name' data={ countries } columns={ columns } />*/
  export default CountryTable;