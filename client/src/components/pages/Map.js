import React, { Component } from 'react'
import {
  Button,
  Row,
} from 'reactstrap'
import mapboxgl from "mapbox-gl/dist/mapbox-gl"; // NEW
import api from "../../api";
import '../../index.scss';
import 'mapbox-gl/dist/mapbox-gl.css' // Import of Mapbox CSS


mapboxgl.accessToken = "pk.eyJ1IjoiZ3RjYXJtb25hIiwiYSI6ImNqdWwxYzZwOTAzeWE0NGxsbjJ0ZnJ0aDYifQ.GIzsIahO6WNQFMg486tFkA"


export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: "",
      lat: "",
      libraries: null
    }
    this.getCurrentCoordinates = this.getCurrentCoordinates.bind(this)
    this.initMap = this.initMap.bind(this)
    this.mapRef = React.createRef();
    this.map = null; 
    this.marker = null;
  }
    initMap(lng, lat) {
    this.map = new mapboxgl.Map({
      container: this.mapRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 13
    });

    this.map.addControl(new mapboxgl.NavigationControl());
    this.marker = new mapboxgl.Marker({ color: "#662d91" })
      .setLngLat([lng, lat])
      .addTo(this.map)
      for(let i = 0; i < this.state.libraries.length; i++){
        let popup = new mapboxgl.Popup()
        .setHTML(
          `<a href="https://ih-smart-shelf.herokuapp.com/libraries/${this.state.libraries[i]._id}"<b>${this.state.libraries[i].name}</b> <br>
          </a>
        `)
          let lng = this.state.libraries[i].coordinates[0]
          let lat = this.state.libraries[i].coordinates[1]
          // console.log("ARE THEY NUMBERS????", lat, lng)
            new mapboxgl.Marker({ color: '#ffcc05' })
            .setLngLat([lng, lat])
            .setPopup(popup)
            .addTo(this.map)
          }
        }
        
  getCurrentCoordinates = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log("The current coords are", position.coords)
        this.setState({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        })
        this.initMap(this.state.lng,this.state.lat)

      })
    }
  }
  handleInputChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  render() {
    return (
      <div className="Map">
        <div className="map-header">
          <h2>Find Libraries nearby</h2>
        </div>
        <div className="map-container">
        <div className="mapbox"ref={this.mapRef} style={{ height: 400 }} />
        </div>
        <h3>Click on the marker and visit them!</h3>

      </div>
      
    )
  }
  componentDidMount() {
      api.getLibraries()
        .then(libraries => {
          console.log("TCL: Map -> componentDidMount -> libraries.response", libraries.response)
      this.setState({
        libraries: libraries.response
      })
      this.getCurrentCoordinates()
    });
  }

}
