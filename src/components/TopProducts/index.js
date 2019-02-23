import React, { Component } from "react";
import { withFirebase } from "../Firebase";
class TopProducts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: []
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.unsubscribe = this.props.firebase.products().onSnapshot(snapshot => {
      let products = [];

      snapshot.forEach(doc => products.push({ ...doc.data(), uid: doc.id }));

      this.setState({
        products,
        loading: false
      });
    });
  }
  render() {
    const { products, loading } = this.state;
    var productList = Products(products);

    return (
      <div className="container">
        <h2 className="title">Products</h2>

        {loading && <div>Loading ...</div>}

        <ul className="top-products">{productList}</ul>
      </div>
    );
  }
}

const Products = products =>
  products.map(user => (
    <li key={user.uid} className="top-products__list">
      <img src={user.mainPhotoUrl} alt="item-pic" className="main-img" />

      <span className="main-price">
        {"$" + window.nFormatter(user.price, 1)}
      </span>
      <span className="main-desc">{user.service}</span>
    </li>
  ));

export default withFirebase(TopProducts);
