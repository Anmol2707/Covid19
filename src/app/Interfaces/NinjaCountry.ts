import { countryInfo } from './CountryInfo';

export class NinjaCountry {
    country: string;
    countryInfo: countryInfo;
    cases: string;
    todayCases: string;
    deaths: string;
    todayDeaths: string;
    recovered: string;
    active: string;
    critical: string;
    casesPerOneMillion: number;
    deathPerOneMillion: number;

    constructor(Response: any) {
        this.country = Response.country;
        this.countryInfo = Response.countryInfo;
        this.cases = Response.cases;
        this.todayCases = Response.todayCases;
        this.deaths = Response.deaths;
        this.todayDeaths = Response.todayDeaths;
        this.recovered = Response.recovered;
        this.active = Response.active;
        this.critical = Response.critical;
        this.casesPerOneMillion = Response.casesPerOneMillion;
        this.deathPerOneMillion = Response.deathPerOneMillion;
    }
}
