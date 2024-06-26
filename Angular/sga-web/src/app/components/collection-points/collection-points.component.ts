import { Component, NgModule, OnInit } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import Swal from 'sweetalert2';
import { RouteService } from '../../services/route.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ReportService } from '../../services/report.service';
import { ReportPoint } from '../../models/report-point.interface';

interface Marker {
  position: google.maps.LatLngLiteral;
  draggable: boolean;
  address: string;
  icon: string; // Nueva propiedad para el icono
}

@Component({
  selector: 'app-collection-points',
  standalone: true,
  imports: [GoogleMapsModule, FormsModule, NgFor, NgIf],
  templateUrl: './collection-points.component.html',
  styleUrls: ['./collection-points.component.css'],
})
export class CollectionPointsComponent implements OnInit {
  // Servicios de Google Maps para geocodificación y direcciones
  geocoder = new google.maps.Geocoder();
  directionsService = new google.maps.DirectionsService();
  mostrarHorariosInfo = false;
  mostrarResiduosInfo= false;
  mostrarProcesoInfo= false;
  selectedRoute: any; // Variable para almacenar la ruta seleccionada
  routes: any[] = []; // Variable para almacenar la lista de rutas
  // Iconos predeterminados para los marcadores
  defaultIcon = 'assets/images/maps/points-collection.png';
  firstMarkerIcon = 'assets/images/maps/first-marker.png'; // Icono para la primera marca
  lastMarkerIcon = 'assets/images/maps/last-marker.png'; // Icono para la última marca

  // Inicialización de los marcadores con posiciones, direcciones e iconos
  markers: Marker[] = [];

  display: any;
  zoom = 14; // Nivel de zoom del mapa
  center: google.maps.LatLngLiteral = {
    lat: 4.707303,
    lng: -74.109462,
  };

  location: string ="";
  details: string ="";
  status: string ="";

  // Opciones del mapa
  mapOptions: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    center: { lat: 4.707303, lng: -74.109462 },
    maxZoom: 15,
    minZoom: 8,
  };

  // Lista de coordenadas
  coordinates: google.maps.LatLngLiteral[] = this.markers.map(
    (marker) => marker.position
  );

  paths: google.maps.LatLngLiteral[] = this.markers.map(
    (marker) => marker.position
  );

  window: any;

  // Inicialización del componente
  ngOnInit() {
    this.getAllRoutes();
  }
  constructor(private routeService: RouteService, private reportService: ReportService) {}
  
  getAllRoutes() {
    this.routeService.getAllRoutes().subscribe((routes) => {
      if (routes.length > 0) {
        this.routes = routes;
        this.selectedRoute = routes[0]; // Seleccionar la primera ruta por defecto
        this.updateMarkers(); // Actualizar los marcadores al cargar las rutas
      }
    });
  }

  onRouteChange() {
    this.updateMarkers(); // Actualizar los marcadores al cambiar la ruta seleccionada
    // Actualizar la selección de ruta después de actualizar los marcadores
    
    this.selectedRoute = this.routes.find(route => route.id === this.selectedRoute.id);
  }
  

  updateMarkers() {
    if (this.selectedRoute && this.selectedRoute.coordinates) {
      const selectedRoute = this.selectedRoute;
      console.log(selectedRoute)
      this.markers = selectedRoute.coordinates.map((coordinate: { latitude: any; longitude: any; address: any; }) => {
        return {
          position: {
            lat: coordinate.latitude,
            lng: coordinate.longitude
          },
          draggable: true,
          address: coordinate.address,
          icon: this.defaultIcon,
        };
      });
  
      this.updateMarkersIcons();
      this.updateCoordinates();
      this.updatePaths();
    }
  }
  

  // Método para actualizar la posición de un marcador
  updateMarkerPosition(marker: Marker, event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      marker.position = event.latLng.toJSON();
      // Geocodificación inversa para actualizar la dirección del marcador
      this.geocoder.geocode({ location: event.latLng }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          marker.address = results[0].formatted_address;
        }
        this.updateMarkersIcons();
        this.updateCoordinates();
        this.updatePaths();
      });
    }
  }

  // Método para actualizar las coordenadas de los marcadores
  updateCoordinates() {
    this.coordinates = this.markers.map((marker) => marker.position);
  }

  // Método para actualizar las rutas basadas en las posiciones de los marcadores
  updatePaths() {
    this.paths = this.markers.map((marker) => marker.position);
  }

  // Método para actualizar los iconos de los marcadores
  updateMarkersIcons() {
    if (this.markers.length > 0) {
      this.markers[0].icon = this.firstMarkerIcon;
      this.markers[0].draggable = false;
    }
    if (this.markers.length > 1) {
      this.markers[this.markers.length - 1].icon = this.lastMarkerIcon;
      this.markers[this.markers.length - 1].draggable = false;
    }
    this.markers.slice(1, -1).forEach((marker) => {
      marker.icon = this.defaultIcon;
      marker.draggable = false;
    });
  }

  polylineOptions: google.maps.PolylineOptions = {
    strokeColor: '#059669',
    strokeOpacity: 1.0,
    strokeWeight: 2,
  };

  // Método para geocodificar una dirección ingresada y agregar un marcador
  geocodeAddress(address: string) {
    this.geocoder.geocode({ address: address }, (results, status) => {
      if (status === 'OK' && results && results.length > 0) {
        const newMarker: Marker = {
          position: results[0].geometry.location.toJSON(),
          draggable: true,
          address: results[0].formatted_address,
          icon: this.defaultIcon,
        };
  
        const selectedRouteId = this.selectedRoute.id;
        this.markers.push(newMarker);
        this.updateMarkersIcons();
        this.updateCoordinates();
        this.updatePaths();
        
        // Actualiza la ruta seleccionada en el backend
        this.routeService.addCoordinateToRoute(this.selectedRoute.id, {
          latitude: newMarker.position.lat,
          longitude: newMarker.position.lng,
          address: newMarker.address,
          id: '',
          icon: ''
        }).subscribe((updatedRoute) => {
          // Actualiza la ruta seleccionada con la nueva dirección
          this.selectedRoute = updatedRoute;
  
          // Actualiza la lista de rutas para reflejar los cambios
          const index = this.routes.findIndex(route => route.id === updatedRoute.id);
          this.routes[index] = updatedRoute;
  
          // Restaura la ruta seleccionada original
          this.selectedRoute = this.routes.find(route => route.id === selectedRouteId);
          
          Swal.fire('Agregado', 'La dirección ha sido agregada.', 'success');
        });
      } else {
        // Muestra un mensaje de error si no se puede encontrar la dirección
        Swal.fire({
          icon: 'error',
          text: 'No se pudo encontrar la dirección ingresada',
        });
      }
    });
  }

  
  openCreateRouteModal() {
    Swal.fire({
      title: 'Crear Nueva Ruta',
      input: 'text',
      inputLabel: 'Nombre de la Ruta',
      inputPlaceholder: 'Ingrese el nombre de la nueva ruta',
      showCancelButton: true,
      confirmButtonText: 'Crear',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        const newRouteName = result.value;
        this.createRoute(newRouteName);
      }
    });
  }

  // Método para crear una nueva ruta
  createRoute(routeName: string) {
    this.routeService.createRoute({
      name: routeName,
      coordinates: []
    }).subscribe(
      (newRoute) => {
        this.routes.push(newRoute);
        Swal.fire('Ruta creada', 'La nueva ruta ha sido creada exitosamente', 'success');
      },
      (error) => {
        Swal.fire('Error', 'Hubo un error al crear la ruta', 'error');
      }
    );
  }

  removeMarker(index: number) {
    const coordinateId = this.selectedRoute.coordinates[index].id;
    const selectedRouteId = this.selectedRoute.id;
    this.routeService.removeCoordinateFromRoute(this.selectedRoute.id, coordinateId).subscribe((updatedRoute) => {
      // Actualiza la ruta seleccionada con la nueva lista de coordenadas
      this.selectedRoute = updatedRoute;
  
      // Actualiza la lista de rutas para reflejar los cambios
      const routeIndex = this.routes.findIndex(route => route.id === updatedRoute.id);
      this.routes[routeIndex] = updatedRoute;
  
      // Elimina la coordenada del marcador
      this.markers.splice(index, 1);
      this.updateMarkersIcons();
      this.updateCoordinates();
      this.updatePaths();
  
      // Restaura la ruta seleccionada original
      this.selectedRoute = this.routes.find(route => route.id === selectedRouteId);
      Swal.fire('Eliminado', 'La coordenada ha sido eliminada.', 'success');
    });
  }
  
  deleteRoute() {
    if (!this.selectedRoute) {
      Swal.fire('Error', 'Por favor seleccione una ruta para eliminar', 'error');
      return;
    }
  
    Swal.fire({
      title: '¿Está seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.routeService.deleteRoute(this.selectedRoute.id).subscribe(
          () => {
            const index = this.routes.findIndex(route => route.id === this.selectedRoute.id);
            if (index !== -1) {
              this.routes.splice(index, 1);
              this.selectedRoute = null;
              Swal.fire('Eliminado', 'La ruta ha sido eliminada correctamente', 'success');
              // Actualizar la lista de rutas después de eliminar una ruta
              this.getAllRoutes();
            }
          },
          (error) => {
            Swal.fire('Error', 'Hubo un error al eliminar la ruta', 'error');
          }
        );
      }
    });
  }

  openCreateReport(marker: Marker) {
    Swal.fire({
      title: 'Crear reporte',
      html:
        `<p class="swal2-input">${marker.address}</p>
         <textarea id="swal-input2" class="swal2-textarea" placeholder="Detalles" [(ngModel)]="details" style="width: 80%;"></textarea>
        `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const details = (document.getElementById('swal-input2') as HTMLTextAreaElement).value;
        return {
          location: marker.address,
          details: details,
          status: this.status
        };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const details = (document.getElementById('swal-input2') as HTMLTextAreaElement).value;
        const report: ReportPoint = {
          location: marker.address,
          details: details,
          status: "Pendiente"
        };
        this.reportService.createCollectionPoint(report).subscribe(
          (report) => {
            console.log('Punto de recolección creado:', report);
            // Aquí puedes mostrar un mensaje de éxito o realizar otras acciones
          },
          (error: any) => {
            console.error('Error al crear el punto de recolección:', error);
            // Aquí puedes mostrar un mensaje de error o realizar otras acciones
          }
        );
      }
    });
  }
  
}
