
export class CountrySummary {
    Country: string;
    Slug: string;
    NewConfirmed: number;
    TotalConfirmed: number;
    NewDeaths: number;
    TotalDeaths: number;
    NewRecovered: number;
    TotalRecovered: number;

    constructor(Response: any) {
        this.Country = Response.Country;
        this.Slug = Response.Province;
        this.NewConfirmed = Response.NewConfirmed;
        this.TotalConfirmed = Response.TotalConfirmed;
        this.NewDeaths = Response.NewDeaths;
        this.TotalDeaths = Response.TotalDeaths;
        this.NewRecovered = Response.NewRecovered;
        this.TotalRecovered = Response.TotalRecovered;
    }
}
