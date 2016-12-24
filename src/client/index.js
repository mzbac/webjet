import React, { Component, PropTypes } from 'react';
import 'whatwg-fetch';
import styles from './index.css';
import { Container, Input, Button,Item } from 'semantic-ui-react'

const description = [
  'Cute dogs come in a variety of shapes and sizes. Some cute dogs are cute for their adorable faces, others for their',
  'tiny stature, and even others for their massive size.',
].join(' ')

class App extends Component {
  constructor() {
    super();
    // fetch('/movies')
    //   .then((response) => {
    //     if (response.status >= 200 && response.status < 300) {
    //       return response;
    //     }
    //     const error = new Error(response.statusText);
    //     error.response = response;
    //     throw error;
    //   })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log('request failed', error);
    //   });
  }

  render() {
    const {} = this.props;
    return (
      <div className={styles.container} >
        <Button primary className={styles.getMoviesBtn} >Get Cheapest Movies</Button>
        <Input placeholder="Search..." className={styles.searchInput} />
        <Item.Group>
          <Item>
            <Item.Image size='small' src='http://semantic-ui.com/images/wireframe/image.png' />

            <Item.Content>
              <Item.Header as='a'>Cute Dog</Item.Header>
              <Item.Description>
                <p>{description}</p>
                <p>
                  Many people also have their own barometers for what makes a cute dog.
                </p>
              </Item.Description>
            </Item.Content>
          </Item>

          <Item>
            <Item.Image size='small' src='http://semantic-ui.com/images/wireframe/image.png' />

            <Item.Content>
              <Item.Header as='a'>Cute Dog</Item.Header>
              <Item.Description content={description} />
            </Item.Content>
          </Item>

          <Item>
            <Item.Image size='small' src='http://semantic-ui.com/images/wireframe/image.png' />
            <Item.Content header='Cute Dog' description={description} />
          </Item>
          <Item>
            <Item.Image size='small' src='http://semantic-ui.com/images/wireframe/image.png' />
            <Item.Content header='Cute Dog' description={description} />
          </Item>
          <Item>
            <Item.Image size='small' src='http://semantic-ui.com/images/wireframe/image.png' />
            <Item.Content header='Cute Dog' description={description} />
          </Item>
          <Item>
            <Item.Image size='small' src='http://semantic-ui.com/images/wireframe/image.png' />
            <Item.Content header='Cute Dog' description={description} />
          </Item>
          <Item>
            <Item.Image size='small' src='http://semantic-ui.com/images/wireframe/image.png' />
            <Item.Content header='Cute Dog' description={description} />
          </Item>
          <Item>
            <Item.Image size='small' src='http://semantic-ui.com/images/wireframe/image.png' />
            <Item.Content header='Cute Dog' description={description} />
          </Item>
        </Item.Group>
      </div>
    );
  }
}
App.propTypes = {};
export default App;
