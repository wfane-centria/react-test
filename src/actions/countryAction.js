
import axios from "axios";
import { bindActionCreators } from "redux";

export function getCountryList() {
    return((dispatch)=>{
        return axios.get("https://restcountries.eu/rest/v2/all").then((response)=>{
            return  response;
        })
    } )
}
