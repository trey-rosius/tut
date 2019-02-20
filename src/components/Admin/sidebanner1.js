import React, { Component } from "react";

import { Link, BrowserRouter as Router } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import * as ROUTES from "../../Constants/routes";
import firebase from "firebase";
import Dropzone from "react-dropzone";
import { Line, Circle } from "rc-progress";
import { withFirebase } from "../Firebase/context";
import Image from "react-bootstrap/Image";
class SideBanner1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      progressVissible: false,
      sideBannerProgress: 0,
      banner: {},
      uid: null
    };
  }

  onSide1Drop(files) {
    console.log(files[0].size / 1000 + "Kb");

    this.handleBannerUploads(files[0], this.state.uid);
    // console.log("userId available at", this.state.uid);
  }
  handleBannerUploads = file => {
    var uploadTask = this.props.firebase.uploadSideBannerToStorage(file);
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
          console.log("uid available at", this.props.userId);

          this.setState({
            progressVissible: false
          });
          //save to firestore
          this.handleBannerSave(this.props.userId, downloadURL);
        });
      }
    );
  };
  handleBannerSave(uid, downloadUrl) {
    this.props.firebase
      .saveSideBanner1(uid, downloadUrl)
      .then(result => {
        console.log("Document successfully written!");
      })
      .catch(function(error) {
        console.error("Error writing document: ", error);
      });
  }
  render() {
    const { uid } = this.props;
    const {
      isAuthenticated,

      bannerProgress,
      progressVissible
    } = this.state;
    return (
      <div class="side1-banner-upload">
        <div class="side-banner-upload1">
          <div class="upload">
            <Dropzone
              onDrop={this.onSide1Drop.bind(this)}
              accept="image/*"
              multiple={false}
            >
              {({ getRootProps, getInputProps }) => {
                return (
                  <div class="upload-space" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {
                      <span class="upload-text">
                        Click or Drop the top Side Banner Picture Here
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
        </div>
      </div>
    );
  }
}
export default withFirebase(SideBanner1);
