import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Item from "../../components/Item";
// import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../../theme";
import { addToCart } from "../../state";
import { config } from "../../constants";

const ItemDetails = () => {
  const apiURL = config.url.API_URL;
  const imgURL = config.url.IMG_URL;
  const baseURL = config.url.baseURL;
  const dispatch = useDispatch();
  const { itemId } = useParams();
  const [value, setValue] = useState("description");
  const [count, setCount] = useState(1);
  const [item, setItem] = useState(null);
  const [items, setItems] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getItem() {
    try {
      const response = await fetch(`${apiURL}/api/items/${itemId}?populate=image`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const itemJson = await response.json();
      setItem(itemJson.data);
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      // Redirect to /notfound
      //do useNavigate instead???
      window.location.href = `${baseURL}/notfound`;
    }
  }

  //for 'related items' later....
  async function getItems() {
    const items = await fetch(
      `${apiURL}/api/items?populate=image`,
      {
        method: "GET",
      }
    );
    const itemsJson = await items.json();
    setItems(itemsJson.data);
  }

  useEffect(() => {
    getItem();
    getItems();
  }, [itemId]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box width="80%" m="80px auto">
      <Box display="flex" flexWrap="wrap" columnGap="40px">
        {/* IMAGES */}
        <Box flex="1 1 40%" mb="40px" maxWidth='500px'>
          <img
            alt={item?.name}
            width="100%"
            height="100%"
            src={`${imgURL}${item?.attributes?.image?.data?.attributes?.url}`}
            style={{ objectFit: "contain" }}
          />
        </Box>

        {/* ACTIONS */}
        <Box flex="1 1 50%" mb="40px">
          {/* <Box display="flex" justifyContent="space-between">
            <Box>Home/Item</Box>
            <Box>Prev Next</Box>
          </Box> */}

          <Box m="65px 0 25px 0">
            <Typography variant="h3">{item?.attributes?.name}</Typography>
            <Typography>${item?.attributes?.price}</Typography>
            <Typography sx={{ mt: "20px" }}>
              {item?.attributes?.shortDescription}
            </Typography>
          </Box>

          <Box display="flex" alignItems="center" minHeight="50px">
            <Box
              display="flex"
              alignItems="center"
              border={`1.5px solid ${shades.neutral[300]}`}
              mr="20px"
              p="2px 5px"
            >
              <IconButton onClick={() => setCount(Math.max(count - 1, 1))}>
                <RemoveIcon />
              </IconButton>
              <Typography sx={{ p: "0 5px" }}>{count}</Typography>
              <IconButton onClick={() => setCount(count + 1)}>
                <AddIcon />
              </IconButton>
            </Box>
            <Button
              sx={{
                backgroundColor: shades.neutral[700],
                color: "white",
                borderRadius: 0,
                minWidth: "150px",
                padding: "10px 40px",
                "&:hover": {
                  backgroundColor: shades.secondary[600],
                }
              }}
              onClick={() => dispatch(addToCart({ item: { ...item, count } }))}
            >
              ADD TO CART
            </Button>
          </Box>
          <Box>
            {/* <Box m="20px 0 5px 0" display="flex">
              <FavoriteBorderOutlinedIcon />
              <Typography sx={{ ml: "5px" }}>ADD TO WISHLIST</Typography>
            </Box> */}
            <Typography mt='15px' fontSize='small' color={shades.neutral[600]}>CATEGORY: {item?.attributes?.category
              .replace(/([A-Z])/g, " $1") //capture first Capital letter, then insert a space before it
              .replace(/^./, (str) => str.toUpperCase()) //make the first character Capital
            }</Typography>
          </Box>
        </Box>
      </Box>

      {/* INFORMATION */}
      <Box m="20px 0">
        <Tabs value={value} onChange={handleChange} textColor="secondary"
          indicatorColor="secondary">
          <Tab label="DESCRIPTION" value="description" sx={{ cursor: 'auto' }} />
          {/* <Tab label="REVIEWS" value="reviews" /> */}
        </Tabs>
      </Box>
      <Box display="flex" flexWrap="wrap" gap="15px">
        {value === "description" && (
          <div>{item?.attributes?.longDescription}</div>
        )}
        {value === "reviews" && <div>reviews</div>}
      </Box>

      {/* RELATED ITEMS */}
      <Box mt="50px" width="100%">
        <Typography variant="h3" fontWeight="bold">
          Related Products
        </Typography>
        <Box
          mt="20px"
          display="flex"
          flexWrap="wrap"
          gap='15px'
          justifyContent="flex-start"
        >
          {items
            .filter(thing => (thing?.attributes?.category === item?.attributes?.category) && (thing?.id !== item?.id))
            .slice(0, 3).map((item, i) => (
              <Item key={`${item.name}-${i}`} item={item} />
            ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ItemDetails;