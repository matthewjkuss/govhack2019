/// <reference types="@types/googlemaps" />
import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ViewChild } from '@angular/core';
declare let google: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: ['::ng-deep body { background: white; margin: 0px; }']
})
export class AppComponent implements OnInit {
  screen = 'home';
  sidebar = false;
  state = "home";
  // @ViewChild('gmap') gmapElement: any;
  title = 'govhack';
  @ViewChild('gmap', null) gmapElement: any;
  map: google.maps.Map;

  time = 0;
  hour = 0;
  minute = 0;
  second = 0;

  
  toggleSidebar() {
    this.sidebar = !this.sidebar;
  }
  // -34.9192275,138.6060772,21z
  uluru = {lat: -34.9192275, lng: 138.6060772};
  changeState(state) {
    this.state = state;
  }
  changeToDetails() {
    this.changeState('detail');
  }

  animate() {
    this.time = 1567921127434 - new Date().getTime();
    this.hour = Math.floor(this.time / (60 * 60 * 1000));
    this.minute = Math.floor((this.time % (60 * 60 * 1000)) / (60 * 1000));
    this.second = Math.floor(((this.time % (60 * 60 * 1000)) % (60 * 1000)) / 1000);
    requestAnimationFrame(this.animate.bind(this));
  }
  

  loadMaps() {
    var mapProp = {
      // -34.9268594,138.598205
      center: new google.maps.LatLng(-34.9268594, 138.598205),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    let contentString = '<div id="content">'+
            '<h1 id="firstHeading" class="firstHeading">North Bridge</h1>'+
            '<img [class.mat-elevation-z2]="true" style="width: 100px; height: auto; margin: 10px;" src="http://sahistoryhub.com.au/sites/default/files/styles/gallery_full_crop/public/GN01906.jpg"/>'+
            '<div><button mat-stroked-button ng-click="changeState(\'detail\')">View Details</button></div>'+
            '</div>';
    let infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    let marker = new google.maps.Marker({
      position: this.uluru, 
      map: this.map, 
      title: 'Flinders Monument',
      label: 'B',
      optimized: false
    });
    marker.addListener('click', this.changeToDetails.bind(this));
    // marker.addListener('click', function() {
    //   infowindow.open(this.map, marker);
    // });
    // this.map.setOptions({draggable: true});

  }
  Math = Math;

  ngOnInit() {
    this.animate.bind(this)();
    // this.loadMaps();
  }
}
