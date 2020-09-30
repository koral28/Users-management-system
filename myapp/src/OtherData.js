import React, { Component } from "react";
import "./OtherData.css";
import { UserConsumer } from "./UserContext";

class OtherData extends Component {
  render() {
    return (
      <UserConsumer>
        {(props) => {
          return (
            <div className="otherdata">
              <br />
              Street&ensp;&ensp;&ensp;&ensp;&ensp;
              <input type="text" defaultValue={props.street} />
              <br /> <br />
              City &ensp;&ensp;&ensp;&ensp;&ensp;
              <input type="text" defaultValue={props.city} />
              <br /> <br />
              Zip Code <input type="text" defaultValue={props.zipcode} />
            </div>
          );
        }}
      </UserConsumer>
    );
  }
}

export default OtherData;
