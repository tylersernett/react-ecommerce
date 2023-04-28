import { useState } from "react";
import { useDispatch } from "react-redux";
import { IconButton, Box, Typography, useTheme, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { shades } from "../theme";
import { addToCart } from "../state";
import { useNavigate } from "react-router-dom";
import { config } from "../constants";

const Item = ({ item, width }) => {
  const apiURL = config.url.API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const {
    palette: { neutral },
  } = useTheme();

  //strapi destructuring:
  const { category, price, name, image } = item.attributes;
  const { data: { attributes: { formats: { medium: { url } } } } } = image;

  return (
    <Box width={width}>
      <Box
        position="relative"
        onMouseOver={() => setIsHovered(true)}
        onMouseOut={() => setIsHovered(false)}
        style={{
          width: 300,
          height: 300,
          overflow: "hidden",
        }}
      >
        <img
          alt={item.name}
          width="300px"
          height="300px"
          src={`${apiURL}${url}`}
          onClick={() => navigate(`/item/${item.id}`)}
          style={{
            cursor: "pointer",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.4s ease-in-out",
          }}
        />

        {/* –  + buttons */}
        <Box
          display={isHovered ? "block" : "none"} //show -/+ and add to cart when hovered
          position="absolute"
          bottom="10%"
          left="0"
          width="100%"
          padding="0 5%"
        >
          <Box display="flex" justifyContent="space-between">
            <Box
              display="flex"
              alignItems="center"
              backgroundColor={shades.neutral[100]}
              borderRadius="3px"
            >
              <IconButton color='primary' onClick={() => setCount((currentCount) => Math.max(currentCount - 1, 1))}>
                <RemoveIcon sx={{ color: shades.neutral[600] }} />
              </IconButton>
              <Typography color={shades.primary[300]}>{count}</Typography>
              <IconButton color='primary' onClick={() => setCount((currentCount) => currentCount + 1)}>
                <AddIcon sx={{ color: shades.neutral[600] }} />
              </IconButton>
            </Box>
            <Button
              onClick={() => {
                dispatch(addToCart({ item: { ...item, count } }));
              }}
              sx={{ backgroundColor: shades.primary[400], color: "white", "&:hover": { backgroundColor: shades.secondary[600], } }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Box>

      <Box mt="3px">
        <Typography variant="subtitle2" color={neutral.dark}>
          {category
            .replace(/([A-Z])/g, " $1") //capture first Capital letter, then insert a space before it
            .replace(/^./, (str) => str.toUpperCase()) //make the first character Capital
          }
        </Typography>
        <Typography fontWeight="bold">{name}</Typography>
        <Typography >${price}</Typography>
      </Box>
    </Box>
  );
};
export default Item