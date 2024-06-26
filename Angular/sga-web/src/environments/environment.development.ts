// environment.development.ts (desarrollo)
export const environment = {
    production: false,
    apiEndpoints: {
      userService: 'http://localhost:8080/api/v1/user/',
      wasteService: 'http://localhost:8181/api/v1/waste/',
      routesService: 'http://localhost:8282/api/v1/routes/',
      reportsService: 'http://localhost:8383/api/v1/reports/',
      authService: 'http://localhost:8484/api/v1/'
    }
  };
  