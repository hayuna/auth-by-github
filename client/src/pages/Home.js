import React from "react";
import CardList from "../components/cards/CardList";

const Home = () => (
  <div className="page" style={{ textAlign: "center" }}>
    <p style={{ fontSize: 28 }}>Popular Strategies</p>
    <CardList />
    <div style={{ marginBottom: 20 }}></div>
  </div>
);

export default Home;
