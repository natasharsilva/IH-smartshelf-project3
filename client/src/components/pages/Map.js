import React, { Component } from 'react'
import {
  Button,
  Col,
  Input,
  Label,
  Row
} from 'reactstrap'
import mapboxgl from "mapbox-gl/dist/mapbox-gl"; // NEW
import api from "../../api";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3RjYXJtb25hIiwiYSI6ImNqdWwxYzZwOTAzeWE0NGxsbjJ0ZnJ0aDYifQ.GIzsIahO6WNQFMg486tFkA"; // NEW


export default class Map extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lng: "",
      lat: "",

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
      zoom: 12
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.marker = new mapboxgl.Marker({ color: "purple" })
      .setLngLat([lng, lat])
      .addTo(this.map);
  }
  getCurrentCoordinates() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log("The current coords are", position.coords)
        this.setState({
          lng: position.coords.longitude,
          lat: position.coords.latitude,
        })
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
      <div className="LibraryLocations">
        <h1>Find libraries around you!</h1>
        <Button className="btn btn-info" onClick={this.getCurrentCoordinates}>
          Get Current Coordinates
        </Button>
        
        <Row className="my-4">
          <Col sm={3}>
            <Label for="exampleEmail">Coordinates</Label>
          </Col>
          <Col>
            <Input type="number" value={this.state.lng} onChange={this.handleInputChange} name="lng" placeholder="Longitude" />
          </Col>
          <Col>
            <Input type="number" value={this.state.lat} onChange={this.handleInputChange} name="lat" placeholder="Latitude" />
          </Col>
        </Row>
        <Button className="btn btn-info"  onClick={() => this.initMap(this.state.lng,this.state.lat)}>
          Find libraries!
        </Button>
        <div className="mapbox"ref={this.mapRef} style={{ height: 400 }} />

      </div>
      
    )
  }
}
