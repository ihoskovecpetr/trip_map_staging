import pin2D from "assets/mapIcons/pin2D.svg";
import pin2Dblack from "assets/mapIcons/pin2Dblack.svg";
import beach_color from "assets/mapIcons/beach_color.svg";
import beer from "assets/mapIcons/beer.svg";
import beer_2 from "assets/mapIcons/beer_2.svg";
import cocktail from "assets/mapIcons/cocktail.svg";
import heart from "assets/mapIcons/heart.svg";
import hiking from "assets/mapIcons/hiking.svg";
import home_full from "assets/mapIcons/home_full.svg";
import like from "assets/mapIcons/like.svg";
import like_color from "assets/mapIcons/like_color.svg";
import man_hike from "assets/mapIcons/man_hike.svg";
import soft_drink from "assets/mapIcons/soft_drink.svg";
import surf_color from "assets/mapIcons/surf_color.svg";
import surf from "assets/mapIcons/surf.svg";
import wine from "assets/mapIcons/wine.svg";

import { ICON_NAMES } from "@constants";

export const getLoadedIconImages = () => {
  const image = new Image(100, 100);
  image.src = pin2D;
  const image2 = new Image(100, 100);
  image2.src = pin2Dblack;
  const image3 = new Image(100, 100);
  image3.src = beach_color;
  const image4 = new Image(100, 100);
  image4.src = beer;

  const image5 = new Image(100, 100);
  image5.src = beer_2;
  const image6 = new Image(100, 100);
  image6.src = cocktail;
  const image7 = new Image(100, 100);
  image7.src = heart;
  const image8 = new Image(100, 100);
  image8.src = hiking;
  const image9 = new Image(100, 100);
  image9.src = home_full;
  const image10 = new Image(100, 100);
  image10.src = like;
  const image11 = new Image(100, 100);
  image11.src = like_color;
  const image12 = new Image(100, 100);
  image12.src = man_hike;
  const image13 = new Image(100, 100);
  image13.src = soft_drink;
  const image14 = new Image(100, 100);
  image14.src = surf_color;
  const image15 = new Image(100, 100);
  image15.src = surf;
  const image16 = new Image(100, 100);
  image16.src = wine;

  return [
    [ICON_NAMES.pin, image, pin2D],
    [ICON_NAMES.pinBlack, image2, pin2Dblack],
    [ICON_NAMES.beach_color, image3, beach_color],
    [ICON_NAMES.beer, image4, beer],
    [ICON_NAMES.beer_2, image5, beer_2],
    [ICON_NAMES.cocktail, image6, cocktail],
    [ICON_NAMES.heart, image7, heart],
    [ICON_NAMES.hiking, image8, hiking],
    [ICON_NAMES.home_full, image9, home_full],
    [ICON_NAMES.like, image10, like],
    [ICON_NAMES.like_color, image11, like_color],
    [ICON_NAMES.man_hike, image12, man_hike],
    [ICON_NAMES.soft_drink, image13, soft_drink],
    [ICON_NAMES.surf_color, image14, surf_color],
    [ICON_NAMES.surf, image15, surf],
    [ICON_NAMES.wine, image16, wine],
  ];
};
