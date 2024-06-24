export interface User {
    data:            Datum[];
    responseDetails: ResponseDetails;
}

export interface Datum {
    id:               string;
    name:             string;
    email:            string;
    city:             string;
    password:         string;
    clientId:         string;
    clientSecret:     string;
    createdDate:      Date;
    lastModifiedDate: Date;
    rol:              string;
    isEmailAvailable: Boolean;
}

export interface ResponseDetails {
    code:      string;
    message:   string;
    timestamp: Date;
}
