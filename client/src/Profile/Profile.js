import React, { Component } from "react";
import { ListGroup, ListGroupItem, Glyphicon } from "react-bootstrap";
import "./Profile.css";
import axios from "axios";
import { API_URL } from "../constants";
import logo from "../images/user-solid.png";

class Profile extends Component {
  checkGrav(str) {
    let containsGrav = /grav/.test(str);
    console.log(containsGrav);
    return containsGrav;
  }

  componentWillMount() {
    this.setState({ profile: {} });

    const { userProfile, getProfile } = this.props.auth;
    // Imported from line 6
    const defaultPicture = logo;

    if (!userProfile) {
      getProfile((err, profile) => {
        console.log(profile);
        if(this.checkGrav(profile.picture === true)) {
          console.log("There's a grav, so use our stock photo instead")
          profile.picture = defaultPicture;
          this.setState({ profile });
        } 
        else if (this.checkGrav(profile.picture) === false) {
          console.log("No grav... ");
          this.setState({ profile });
        } else {
          console.log("if and else if, didn't happen....");
          this.setState({ profile });
        }
      })
    } 
    else {
      this.setState({ profile: userProfile })
    }
  }

  render() {
    const { profile } = this.state;
    return (
      <body>
        <div className="profile">
          <img src={profile.picture} alt="please" className="img-responsive" />

          <div className="details">
            <ListGroup>
              {/* <div className="userdatalist"> */}
              <div className="username">
                <i className="far fa-user-circle"> {profile.name}</i>
              </div>
              {/* changed profile.nickname to profile.name */}
              <div className="userdatalist">
                <div className="userbalance">
                  <i className="far fa-clock">
                    {" "}
                    Balance {profile.balanceHours}
                  </i>
                </div>

                <div className="userqualifier">
                  {/* <a class="btn-floating pulse"><i class="material-icons">menu</i></a> */}
                  Qualifier {profile.qualifierHours}
                </div>
              </div>
              {/* </div> */}
            </ListGroup>
          </div>
        </div>
      </body>
    );
  }
}

export default Profile;

