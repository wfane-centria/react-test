import React from 'react';
import axios from "axios";
import {Table} from "./Table";

export class MyCountryList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            countries: []
        }
    }

    async componentDidMount() {
        const response = await axios.get("https://restcountries.eu/rest/v2/all");
        console.log(response.data);
        this.setState({countries: response.data});
    }

    render() {
        let countries = this.state.countries;

        return (
           <div>
               <Table config={{
                   data: [...countries],
                   fields: [
                       {name: 'Name', path: 'name', sortable: true},
                       {name: 'Country Code', path: 'alpha2Code', sortable: true},
                       {name: 'Capital', path: 'capital', sortable: true},
                       {name: 'Flag', path: 'flag'},
                       {name: 'Population', path: 'population', sortable: true},
                       {name: 'Region', path: 'region', sortable: true},
                   ]
               }}/>

           </div>
        );
    }
}
