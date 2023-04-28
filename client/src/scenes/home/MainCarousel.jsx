import { Box, Typography, IconButton, useMediaQuery } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { shades } from "../../theme";

// imports all images from assets folder ... from https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
const importAll = (r) =>
  r.keys().reduce((accumulator, item) => {
    accumulator[item.replace("./", "")] = r(item);
    return accumulator;
  }, {});

export const heroTextureImports = importAll(
  require.context("../../assets/heros", false, /\.(png|jpe?g|svg)$/)
);

const handleScrollToStore = () => {
  const storeElement = document.getElementById("store");
  if (storeElement) {
    const offset = storeElement.offsetTop - 80;
    window.scrollTo({
      top: offset,
      behavior: "smooth"
    });
  }
};

const MainCarousel = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const isMediumPlus = useMediaQuery("(min-width:768px)");

  return (
    <Carousel
      autoPlay={true}
      infiniteLoop={true}
      showThumbs={false}
      showIndicators={false}
      showStatus={false}
      renderArrowPrev={(onClickHandler) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            left: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
            '&:hover': {
              backgroundColor: 'rgb(0,0,0,0.5)'
            }
          }}
        >
          <NavigateBeforeIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
      renderArrowNext={(onClickHandler) => (
        <IconButton
          onClick={onClickHandler}
          sx={{
            position: "absolute",
            top: "50%",
            right: "0",
            color: "white",
            padding: "5px",
            zIndex: "10",
            '&:hover': {
              backgroundColor: 'rgb(0,0,0,0.5)'
            }
          }}
        >
          <NavigateNextIcon sx={{ fontSize: 40 }} />
        </IconButton>
      )}
    >
      {Object.values(heroTextureImports).map((texture, index) => (
        <>
          <Box key={`carousel-image-${index}`}
            sx={{
              height: "600px",
              position: 'relative'
            }}>

            {/* anchor hero #1, 4, 5 to bottom for medium+ scrns -- all others can focus on center */}
            {index === 1 || index === 4 || index === 5 ? (
              <img
                src={texture}
                alt={`carousel-${index}`}
                style={{
                  objectFit: "cover",
                  backgroundAttachment: "fixed",
                  width: "100%",
                  // to anchor to bottom:
                  height: isMediumPlus ? '' : '100%',
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                }}
              />
            ) : (
              // for all others, focus on center:
              <img
                src={texture}
                alt={`carousel-${index}`}
                style={{
                  objectFit: "cover",
                  backgroundAttachment: "fixed",
                  width: "100%",
                  height: "600px",
                }}
              />
            )}

            <Box
              onClick={handleScrollToStore}
              color="white"
              padding="20px"
              borderRadius="1px"
              textAlign="left"
              position="absolute"
              top="46%"
              left={isNonMobile ? "10%" : "0"}
              right={isNonMobile ? undefined : "0"}
              margin={isNonMobile ? undefined : "0 auto"}
              maxWidth={isNonMobile ? undefined : "240px"}
              sx={{
                cursor: 'pointer',
                backgroundColor: "rgb(0, 0, 0, 0.7)",
                transition: '0.3s',
                '&:hover': { backgroundColor: 'rgb(0, 0, 0, 0.8)', }
              }}
            >
              <Box>
                <Typography color={shades.secondary[200]}>NEW ITEMS</Typography>
                <Typography variant="h1">Jewelry Sale</Typography>
                <Typography
                  fontWeight="bold"
                  color={shades.secondary[300]}
                  sx={{ textDecoration: "" }}
                >
                  Discover More Below
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      ))}

    </Carousel>
  );
};

export default MainCarousel;