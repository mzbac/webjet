import React, { Component, PropTypes } from 'react';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';
import styles from './MovieDetailsModal.css';

class MovieDetailsModal extends Component {
  constructor() {
    super();
    this.state = { modalOpen: false };
    this.handleOpen = (e) => this.setState({
      modalOpen: true,
    });
    this.handleClose = (e) => this.setState({
      modalOpen: false,
    });
  }

  render() {
    const { movie, postImage } = this.props;
    const { modalOpen } = this.state;
    const {
      Poster, // eslint-disable-line no-unused-vars
      cinema,
      Title,
      ...restProps
    } = movie;
    return (<Modal
      trigger={<Button className={styles.modalBtn} onClick={this.handleOpen} >
        See More
      </Button>}
      open={modalOpen}
      onClose={this.handleClose}
    >
      <Modal.Header>Movie Details</Modal.Header>
      <Modal.Content image >
        <Image size="medium" src={postImage} />
        <Modal.Description>
          <Header>{Title}</Header>
          <Header>{cinema.name}</Header>
          {
            Object.keys(restProps).map((key) => <p key={key} >{key} : {restProps[key]}</p>)
          }
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={this.handleClose} >
          <Icon name="remove" /> Close
        </Button>
      </Modal.Actions>
    </Modal>);
  }
}

MovieDetailsModal.propTypes = {
  movie: PropTypes.object,
  postImage: PropTypes.string,
};
export default MovieDetailsModal;
