import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Item from "../../components/Item";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useDispatch, useSelector } from "react-redux";
import { setItems } from "../../state";
import { config } from "../../constants";

const ShoppingList = () => {
  const apiURL = config.url.API_URL;
  const dispatch = useDispatch();
  const [value, setValue] = useState("all");
  const items = useSelector((state) => state.cart.items);
  const isNonMobile = useMediaQuery("(min-width:645px)");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItems() {
    const items = await fetch(
      `${apiURL}/api/items?populate=image`,
      { method: "GET" }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const categories = ["bracelets", "earrings", "necklaces", "rings"]
  //create object that filters out the items by their category type, e.g. itemsByCategory.bracelets = [{item1}, {item2}]
  const itemsByCategory = {};
  categories.forEach((category) => {
    itemsByCategory[category] = items.filter(
      (item) => item?.attributes?.category === category
    );
  });

  return (
    <Box width="80%" margin="80px auto" id='store'>
      <Typography variant="h3" textAlign="center">
        Featured <b>Products</b>
      </Typography>
      <Tabs
        textColor="secondary"
        indicatorColor="secondary"
        value={value}
        onChange={handleChange} // clicking a new tab changes the VALUE
        centered
        TabIndicatorProps={{ sx: { display: isNonMobile ? "block" : "none" } }}
        sx={{
          m: "25px",
          "& .MuiTabs-flexContainer": {
            flexWrap: "wrap",
          },
        }}
      >
        <Tab label="ALL" value="all" />
        {categories.map((category) => (
          <Tab label={category} value={category} />
        ))}
      </Tabs>

      {/* SHOP ITEMS */}
      <Box
        margin="0 auto"
        display="grid"
        gridTemplateColumns="repeat(auto-fill, 300px)"
        justifyContent="space-around" //space-between does left-align on 1-column screen
        rowGap="20px"
        columnGap="1.33%"
      >
        {/* Display only items that match the selected category */}
        {value === "all" &&
          items.map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}
        {categories.includes(value) &&
          itemsByCategory[value].map((item) => (
            <Item item={item} key={`${item.name}-${item.id}`} />
          ))}

      </Box>
    </Box>
  );
};

export default ShoppingList;