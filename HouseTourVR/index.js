import React from "react";
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  VrButton,
} from "react-360";

import { connect, changeRoom } from './store';

class Button extends React.Component {
  state = {
    hover: false
  }

  clickHandler(roomSelection) {
    changeRoom(roomSelection);
  }

  render() {
    return (
      <VrButton
          style={this.state.hover ? styles.hover : styles.button}
          onEnter={() => this.setState({hover: true})}
          onExit={() => this.setState({hover: false})}
          onClick={() => this.clickHandler(this.props.room)}
        >
          <Text style={{textAlign: 'center'}}>{this.props.room}</Text>
        </VrButton>
    )
  }
}

class ButtonInfoPanel extends React.Component {

  createRoomButtons(adjacentRooms) {
    let rooms = adjacentRooms;
    let buttons = [];


    rooms.map(room =>
      buttons.push(
        <Button key = {`${room} - button`} room = {room} />
      )
    );

    return buttons;
  }

  render() {
    return (
      <View>
        <View style={styles.buttonPanel}>
          <Text style={styles.header}>Room Selection</Text>
          {this.createRoomButtons(this.props.adjacentRooms)}
        </View>
      </View>
    );
  }
}


class InfoPanel extends React.Component {
  render() {
    return (
      <View>
        <View style={styles.infoPanel}>
          <Text style={styles.header}>Room Info</Text>
          <Text style={{fontSize: 20, textAlign: 'center', fontWeight: 'bold'}}>{this.props.info}</Text>
        </View>
      </View>
    );
  }
}

const ConnectedButtonInfoPanel = connect(ButtonInfoPanel);
const ConnectedInfoPanel = connect(InfoPanel);

const styles = StyleSheet.create({
  infoPanel: {
    // Fill the entire surface
    width: 400,
    height: 400,
    opacity: 0.8,
    backgroundColor: "rgb(255, 200, 50)",
    borderColor: "rgb(255, 255, 255)",
    borderWidth: 5,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  buttonPanel: {
    width:  400,
    height: 400,
    opacity: 0.8,
    backgroundColor: 'rgb(255, 200, 50)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  button: {
    width: 200,
    backgroundColor: 'rgb(0, 0, 0)',
    borderColor: 'rgb(255, 255, 255)',
    borderWidth: 5

  },
  hover: {
    width: 200,
    backgroundColor: 'rgb(0, 45, 72)',
    borderColor: 'rgb(255, 255, 255)',
    borderRadius: 5
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  greetingBox: {
    padding: 20,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2
  },
  greeting: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('ConnectedButtonInfoPanel', () => ConnectedButtonInfoPanel);
AppRegistry.registerComponent('ConnectedInfoPanel', () => ConnectedInfoPanel);
