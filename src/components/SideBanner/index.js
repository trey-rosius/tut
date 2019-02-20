import React, { Component } from "react";
import { withFirebase } from "../Firebase/context";
import Image from "react-bootstrap/Image";
class SideBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      sideBanner: {},
      sideBanner2: {}
    };
  }
  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase
      .getSideBanner2()
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data().banner);
          this.setState({
            loading: false,
            sideBanner2: doc.data(),
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

    this.unsubscribe = this.props.firebase
      .getSideBanner1()
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data().banner);
          this.setState({
            loading: false,
            sideBanner: doc.data(),
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
    const { sideBanner, sideBanner2 } = this.state;
    return (
      <div class="right-banners">
        <div className="right-banners__top">
          <Image src={sideBanner.banner} fluid />
        </div>
        <div className="right-banners__bottom">
          <Image src={sideBanner2.banner} fluid />
        </div>
      </div>
    );
  }
}
export default withFirebase(SideBanner);
