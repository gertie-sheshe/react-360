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
          onEnter={}
          onExit={}
          onClick={() => this.clickHandler(room)}
        >
          <Text style={{ backgroundColor: "green" }}>{room}</Text>
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
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
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

AppRegistry.registerComponent('ConnectedButtons', () => ConnectedButtonInfoPanel);
AppRegistry.registerComponent('ConnectedInfoPanel', () => ConnectedInfoPanel);
