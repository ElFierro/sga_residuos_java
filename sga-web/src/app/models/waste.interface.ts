export interface Waste {
    id: string;
    typeWaste: string;
    classification: string;
    weight: number;
    dateAdmission?: string;
    route: string;
  }
  
  export interface ResponseDetails {
    code: string;
    message: string;
    timestamp: string;
  }
  
  export interface ApiResponse {
    data: Waste[];
    responseDetails: ResponseDetails;
  }