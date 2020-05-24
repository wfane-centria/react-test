import React from 'react';
import * as  CountryTable  from './Table';
import {bindActionCreators, createStore} from 'redux';
import  * as countryAction from './actions/countryAction';
import {connect} from 'react-redux';
import axios from "axios";
import countryReducer from './reducers/countryReducer';
import './style.css';
import * as  TableTest  from './TableTest';

export class CountryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: []
        }
    }

    
    async componentDidMount() {
        //console.log(this.props);
        //this.props.actions.countryAction.getCountryList();
        //return this.props.mapDispatchToProps;
        const response = await axios.get("https://restcountries.eu/rest/v2/all");
        console.log(response.data);
        this.setState({ countries: response.data });
      
    }
        /*return (dispatch, state) => {
            if(this.state.countries) {
                return;
            }
            return this.props.mapDispatchToProps;
        }*/
    //}
    render() {
        let countries = this.state.countries;
        
        let items = countries.map((country, index) => {
           return <tr key={index}><td className="td">{country.name}</td> <td className="td">{country.alpha2Code}</td>
              <td className="td">{country.capital}</td><td><img className="photo" src={country.flag} ></img></td><td className="td">{country.population}</td></tr>
        });
        return(
         // <div> {items}</div> 
         <TableTest  countries={countries} />      
        ) 
    }

}

////const store = createStore(countryReducer);
//console.log(store.getState());

const mapStateToProps = (state) => {
    return {
      countries: state.countries
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      actions: {
        countryAction: bindActionCreators(countryAction, dispatch)
      }
    };
  };
  
  //export default connect(mapStateToProps,mapDispatchToProps)(CountryList);
  export default connect(null, null)(CountryList);
  //export default CountryList;