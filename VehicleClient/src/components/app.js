import React, { Component } from "react";
import ReactDom from "react-dom";
import Request from "superagent";
import _ from "lodash";

import SearchBar from "./search_bar";
import VehicleList from "./vehicle_list";
import VehicleDetail from "./vehicle_detail";
import AddVehicleDetails from "./add_vehicle_details";
import EditVehicleDetails from "./edit_vehicle_details";

class App extends Component {
  constructor() {
    super();
    this.state = {
      vehicles: [],
      selectedVehicle: null
    };

    this.getVehicleDetails();
  }

  getVehicleDetails() {
    Request.get("http://localhost:3000/api/vehicles/")
      .query({ format: "json" })
      .set("Accept", "application/json")
      .then(vehicles => {
        this.setState({
          vehicles: vehicles.body,
          selectedVehicle: vehicles.body[0]
        });
      });
  }

  render() {
    return (
      <div>
        {/*<SearchBar/>*/}
        <div className="row">
          <div className="col-sm-7">
            <VehicleDetail vehicle={this.state.selectedVehicle} />
            <h4>Add Vehicles</h4>
            <AddVehicleDetails
              getVehicleDetails={this.getVehicleDetails.bind(this)}
            />
            <br />
            <h4>Edit Vehicles</h4>
            <EditVehicleDetails />
          </div>
          <VehicleList
            onVehicleSelect={selectedVehicle =>
              this.setState({ selectedVehicle })}
            vehicles={this.state.vehicles}
          />
        </div>
      </div>
    );
  }
}

export default App;
