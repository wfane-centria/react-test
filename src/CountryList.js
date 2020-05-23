import React from 'react';
import * as  CountryTable  from './CountryTable';
import {bindActionCreators, createStore} from 'redux';
import  * as countryAction from './actions/countryAction';
import {connect} from 'react-redux';
import axios from "axios";
import countryReducer from './reducers/countryReducer';

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
       /*store.dispatch({
           type: 'COUNTRY_LIST',
           data: bindActionCreators.data
       });*/
       //console.log(data);
    }
        /*return (dispatch, state) => {
            if(this.state.countries) {
                return;
            }
            return this.props.mapDispatchToProps;
        }*/
    //}
    render() {
        //console.log(this.state.countries);
        return(
            
        <CountryTable countries={this.state.countries} />
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
  
  export default connect(mapStateToProps,mapDispatchToProps)(CountryList);
  //export default CountryList;