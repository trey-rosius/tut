import React, { Component } from "react";
import banner from "../../img/orig.webp";
import { withFirebase } from "../Firebase";
class TopBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      banner: {},
      key: ""
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .getTopBanner()
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data().banner);
          this.setState({
            loading: false,
            banner: doc.data(),
            key: doc.id
          });
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  }
  render() {
    return (
      <div className="banner">
        <img src={this.state.banner.banner} alt="banner" class="img-fluid" />
      </div>
    );
  }
}
export default withFirebase(TopBanner);
