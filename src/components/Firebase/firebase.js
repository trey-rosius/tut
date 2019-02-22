import app from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
const config = {
  apiKey: "AIzaSyCvVKLJeQ8fRR9J_lbkeYVw1hTSjIfjl5E",
  authDomain: "tuprofes.firebaseapp.com",
  databaseURL: "https://tuprofes.firebaseio.com",
  projectId: "tuprofes",
  storageBucket: "tuprofes.appspot.com",
  messagingSenderId: "1077137355187"
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.db = app.firestore();
    this.auth = app.auth();
    this.storage = app.storage().ref();
    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  signOutWithGoogle = () => this.auth.signOut();
  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);
  getTopBanner = () => this.db.collection("banner").doc("topBanner");
  getUserDetails = userId => this.db.collection("users").doc(userId);
  getSideBanner1 = () => this.db.collection("banner").doc("sideBanner1");
  getSideBanner2 = () => this.db.collection("banner").doc("sideBanner2");
  products = () => this.db.collection("services");
  uploadBannerToStorage = file => this.storage.child("banners").put(file);
  uploadSideBannerToStorage = file =>
    this.storage.child("sidebanner1").put(file);
  uploadSideBanner2ToStorage = file =>
    this.storage.child("sidebanner2").put(file);
  savebannerInfo = (uid, banner) =>
    this.db
      .collection("banner")
      .doc("topBanner")
      .set({
        uid,
        banner
      });
  saveSideBanner1 = (uid, banner) =>
    this.db
      .collection("banner")
      .doc("sideBanner1")
      .set({
        uid,
        banner
      });
  saveSideBanner2 = (uid, banner) =>
    this.db
      .collection("banner")
      .doc("sideBanner2")
      .set({
        uid,
        banner
      });
}
export default Firebase;
