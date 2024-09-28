import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet'; 
import 'leaflet-routing-machine'; 

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, ExploreContainerComponent],
  encapsulation: ViewEncapsulation.None
}) 
export class Tab1Page implements OnInit {
  map: L.Map = {} as L.Map ;
  markers: L.Marker<any>[] = [];
  startIcon: L.Icon = {} as L.Icon;
  finishIcon: L.Icon= {} as L.Icon;
  monumentIcon: L.Icon= {} as L.Icon;
  eiffelIcon: L.Icon= {} as L.Icon;
  vincenneIcon: L.Icon= {} as L.Icon;

  constructor() {
    this.initializeIcons();
  }

  ngOnInit() {
    this.initMap();
  }
  initializeIcons() {
    this.monumentIcon = this.createIcon('assets/icon/sacre-coeur.png', new L.Point(30, 30));
    this.eiffelIcon = this.createIcon('assets/icon/eiffel-tower512.png', new L.Point(30, 30));
    this.vincenneIcon = this.createIcon('assets/icon/chateau.png', new L.Point(30, 30));
    this.startIcon = this.createIcon('assets/icon/start-line.png', new L.Point(35, 35));
    this.finishIcon = this.createIcon('assets/icon/finish.png', new L.Point(35, 35));
  }
  
  createIcon(url: string, size: L.Point): L.Icon {
    return L.icon({
      iconUrl: url,
      iconSize: size,
      iconAnchor: new L.Point(size.x / 2, size.y),
      popupAnchor: new L.Point(0, -size.y / 2)
    });
  }

  async initMap() {
    try {
      const coordinates = await Geolocation.getCurrentPosition();

      this.map = L.map('map', {
        center: [coordinates.coords.latitude, coordinates.coords.longitude],
        zoom: 13
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(this.map);

      this.addMarkers();

      this.map.on('zoomend moveend', () => {
        this.updateMarkerVisibility();
      });

      this.addRoutingControl(coordinates);
    } catch (error) {
      console.log('Error getting location:', error);
    }
  }

  addMarkers() {
    const locations = [
      { latLng: new L.LatLng(48.8588443, 2.2943506), title: 'Eiffel Tower', icon: this.eiffelIcon },
      { latLng: new L.LatLng(48.886704, 2.343104), title: 'Sacré-Cœur', icon: this.monumentIcon },
      { latLng: new L.LatLng(48.8412, 2.4391), title: 'Château de Vincennes', icon: this.vincenneIcon }
    ];

    locations.forEach(location => {
      const marker = L.marker(location.latLng, { icon: location.icon, title: location.title })
        .bindPopup(this.createPopupContent(location.title, location.latLng));
      marker.addTo(this.map);
      this.markers.push(marker);
    });
  }

  createPopupContent(title: string, latLng: L.LatLng): string {
    return `<b>${title}</b><br><a href="https://www.google.com/maps/dir/?api=1&destination=${latLng.lat},${latLng.lng}" target="_blank">Open in Google Maps</a>`;
  }

  addRoutingControl(coordinates: any) {
    (L as any).Routing.control({
      router: (L as any).Routing.osrmv1({
        serviceUrl: `https://router.project-osrm.org/route/v1/`
      }),
      waypoints: [
        L.latLng(coordinates.coords.latitude, coordinates.coords.longitude),
        L.latLng(48.8588443, 2.2943506)  // Coordinates of the Eiffel Tower
      ],
      showAlternatives: true,
      routeWhileDragging: true,
      lineOptions: {
        styles: [{ color: '#242c81', weight: 7 }]
      },
      altLineOptions: {
        styles: [{ color: '#ed6852', weight: 7 }]
      },
      fitSelectedRoutes: true,
      show: true,
      createMarker: (i: number, wp: { latLng: L.LatLng }, nWps: number) => {
        if (i === 0) {
          return L.marker(wp.latLng, { icon: this.startIcon }).bindPopup(this.createPopupContent('Start: Your location', wp.latLng));
        } else if (i === nWps - 1) {
          return L.marker(wp.latLng, { icon: this.finishIcon }).bindPopup(this.createPopupContent('Finish: Eiffel Tower', wp.latLng));
        }
        return null;  // No markers for intermediary points
      }
    }).addTo(this.map);
  }

  updateMarkerVisibility() {
    const bounds = this.map.getBounds();
    this.markers.forEach(marker => {
      marker.setOpacity(bounds.contains(marker.getLatLng()) ? 1 : 0);
    });
  }
}
 