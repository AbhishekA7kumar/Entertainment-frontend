import React from "react";

import "../../App.css";
import Card from "./Card";

import { v4 as uuidv4 } from "uuid";

const List = ({ cards }) => {

  const filteredCards = cards.filter((item) => item.poster_path);


  return (
    <>
      {
        filteredCards.map((card) => (
          <Card key={uuidv4()} {...card}
          />
        ))
      }
    </>
  );
};

export default List;
