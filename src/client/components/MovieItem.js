import React, { Component, PropTypes } from 'react';
import { Item, Rating } from 'semantic-ui-react';
import _ from 'lodash';
import {
  movieItemMaxRating,
  movieItemDefaultRatingDivider,
  defaultPosterUrl,
} from '../config';
import MovieDetailsModal from './MovieDetailsModal';

class MovieItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      postImage: defaultPosterUrl,
    };
  }

  componentDidMount() {
    const { movie: { Poster } } = this.props;
    this.checkPosterURL(Poster);
  }

  componentWillReceiveProps(nextProps) {
    const { movie: { Poster: newPoster } } = nextProps;
    const { movie: { Poster: currPoster } } = this.props;
    if (newPoster === currPoster) return;
    this.checkPosterURL(newPoster);
  }

  checkPosterURL(url) {
    const img = new Image();
    img.onload = () => {
      this.setState({ postImage: url });
    };
    img.src = url;
  }

  render() {
    const { movie } = this.props;
    const { postImage } = this.state;
    const {
      Plot,
      Title,
      cinema,
      Price,
      Rating: rating,
    } = movie;
    return (
      <Item>
        <Item.Image size="small" src={postImage} />
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
            <MovieDetailsModal
              movie={movie}
              postImage={postImage}
            />
          </Item.Description>
        </Item.Content>
      </Item>
    );
  }
}

MovieItem.propTypes = {
  movie: PropTypes.object,
};
export default MovieItem;
