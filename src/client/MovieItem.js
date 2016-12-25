import React, { PropTypes } from 'react';
import { Item, Rating } from 'semantic-ui-react';
import _ from 'lodash';
import { movieItemMaxRating, movieItemDefaultRatingDivider } from './config';

const MovieItem = props => {
  const { movie } = props;
  const {
    Plot,
    Title,
    Poster,
    cinema,
    Price,
    Rating: rating,
  } = movie;
  return (
    <Item>
      <Item.Image size="small" src={Poster} />
      <Item.Content>
        <Item.Header>{Title}</Item.Header>
        <Item.Description>
          <h3>
            Cinema: {cinema.name}
          </h3>
          <h3>
            Price: ${Price}
          </h3>
          <p>{Plot}</p>
          <Rating
            icon="star"
            disabled
            defaultRating={_.toNumber(rating) / movieItemDefaultRatingDivider}
            maxRating={movieItemMaxRating}
          />
        </Item.Description>
      </Item.Content>
    </Item>
  );
};

MovieItem.propTypes = {
  movie: PropTypes.object,
};
export default MovieItem;
