import React, { Component } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import * as ROUTES from "../../Constants/routes";
import firebase from "firebase";
import Dropzone from "react-dropzone";
import { Line, Circle } from "rc-progress";
import { withFirebase } from "../Firebase/context";
import Image from "react-bootstrap/Image";
import SideBanner1 from "./sidebanner1";
import SideBanner2 from "./sidebanner2";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      progressVissible: false,
      bannerProgress: 0,
      isAuthenticated: false,
      banner: {},
      sideBanner: {},
      sideBanner2: {},
      uid: null,
      authUser: null
    };

    // This binding is necessary to make `this` work in the callback
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleBannerSave = this.handleBannerSave.bind(this);
    this.handleBannerUploads = this.handleBannerUploads.bind(this);
    //this.uploadTask = this.uploadTask.bind(this);
  }
  /*
  componentWillUnmount() {
    this.listener();
  }
  */
  componentDidMount() {
    /*
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
        
    });
    */
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
  onBannerDrop(files) {
    console.log(files[0].size / 1000 + "Kb");

    this.handleBannerUploads(files[0], this.state.uid);
    // console.log("userId available at", this.state.uid);
  }

  onSide2Drop(files) {
    console.log(files[0].size / 1000 + "Kb");

    this.handleBannerUploads(files[0], this.state.uid);
    // console.log("userId available at", this.state.uid);
  }

  handleBannerUploads = file => {
    var uploadTask = this.props.firebase.uploadBannerToStorage(file);
    this.setState({
      progressVissible: true
    });
    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(
      firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      snapshot => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        this.setState({
          bannerProgress: progress
        });
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log("Upload is paused");
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log("Upload is running");
            break;
          default:
            console.log("Upload is in default mode");
            break;
        }
      },
      function(error) {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            console.log("unauthorized access");
            break;

          case "storage/canceled":
            console.log("upload cancelled");
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log("File available at", downloadURL);
          console.log("uid available at", this.state.uid);

          this.setState({
            progressVissible: false
          });
          //save to firestore
          this.handleBannerSave(this.state.uid, downloadURL);
        });
      }
    );
  };
  handleBannerSave(uid, downloadUrl) {
    this.props.firebase
      .savebannerInfo(uid, downloadUrl)
      .then(result => {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }

  checkIfUserIsAdmin(userId) {
    this.props.firebase
      .getUserDetails(userId)
      .get()
      .then(doc => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          console.log("Document userId:", doc.data().admin);
          if (doc.data().email === "dentalvox@gmail.com") {
            this.setState({
              loading: false,
              sideBanner: doc.data(),
              key: doc.id,
              authUser: true
            });
          } else {
            this.setState({
              loading: false,
              sideBanner: doc.data(),
              key: doc.id,
              authUser: false
            });
          }
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  }
  handleLogin = event => {
    this.props.firebase
      .signInWithGoogle()
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        this.checkIfUserIsAdmin(user.uid);

        this.setState({ error: null, isAuthenticated: true, uid: user.uid });
        // this.props.history.push(ROUTES.HOME);
        console.log(this.state.uid);
        console.log(user.email);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };
  handleLogout = event => {
    this.props.firebase
      .signOutWithGoogle()
      .then(socialAuthUser => {
        this.setState({ error: null, isAuthenticated: false, authUser: null });
        // this.props.history.push(ROUTES.HOME);
        console.log("logged in");
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };
  render() {
    const {
      uid,
      banner,
      sideBanner,
      sideBanner2,
      bannerProgress,
      progressVissible,
      authUser
    } = this.state;
    return (
      <Router>
        <div>
          <Navbar
            className="admin-bar"
            collapseOnSelect
            expand="lg"
            variant="dark"
          >
            <Navbar.Brand href="#home">
              <Link to={ROUTES.ADMIN}>
                <span className="admin-title">Tuprofession Dashboard</span>
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="mr-auto">
                <Nav.Link href="#login" onClick={this.handleLogin}>
                  Google Login
                </Nav.Link>
                <Nav.Link href="#logout" onClick={this.handleLogout}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          {authUser ? (
            <div class="container">
              <div class="uploaded-banner">
                <Image src={banner.banner} fluid />
              </div>
              <div className="container-main">
                <div className="container-main__side">
                  <div class="uploaded-side-banner">
                    <Image src={sideBanner.banner} fluid />
                  </div>
                  <div class="uploaded-side-banner">
                    <Image src={sideBanner2.banner} fluid />
                  </div>
                </div>

                <div class="body-images">
                  <div class="upload">
                    <Dropzone
                      onDrop={this.onBannerDrop.bind(this)}
                      accept="image/*"
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => {
                        return (
                          <div class="upload-space" {...getRootProps()}>
                            <input {...getInputProps()} />
                            {
                              <span class="upload-text">
                                Click or Drop the top Banner Picture Here
                              </span>
                            }
                          </div>
                        );
                      }}
                    </Dropzone>
                  </div>
                  <div class="banner-progress">
                    {progressVissible ? (
                      <Line
                        percent={bannerProgress}
                        strokeWidth="2"
                        strokeColor="#d53023de"
                      />
                    ) : (
                      <div />
                    )}
                  </div>
                  <SideBanner1 userId={uid} />
                  <SideBanner2 userId={uid} />
                </div>
              </div>
            </div>
          ) : (
            <div className="jumbo">
              <Alert variant="danger">
                <Alert.Heading>Hey, nice to see you</Alert.Heading>
                <p>
                  Aww yeah, you successfully read this important alert message.
                  This example text is going to run a bit longer so that you can
                  see how spacing within an alert works with this kind of
                  content.
                </p>
                <hr />
                <p className="mb-0">
                  Whenever you need to, be sure to use margin utilities to keep
                  things nice and tidy.
                </p>
              </Alert>
              ;
            </div>
          )}
        </div>
      </Router>
    );
  }
}
export default withFirebase(Admin);
