//Hayward gitlab

// modules
import React, { Component } from 'react';
import { Button, Text, View} from 'react-native';
// stylesheets
import photoStyles from '../styles.js';

/* utility components
*  - container for screen
*  - text content with custom style
*  - generic button builder
*  - ...
*/

// container for screen content and components
class Container extends Component {
	render() {
		return (
			<View style={photoStyles.container}>
				{this.props.children}
			</View>
		);
	}
}

// generic text content with custom style
class ContentText extends Component {
	render() {
		return (
			<Text style={this.props.textStyle}>
				{this.props.children}
			</Text>
		);
	}
}

// generic button component - use with screens &c.
class NavButton extends Component {
	render() {
		return (
      <Button
		  	color={this.props.color}
        title={this.props.screenName}
				onPress={this.props.onPress}
      />
		);
	}
}

/* content components
*  - header
*  - main
*  - ...
*/

// header content and structure
class Header extends Component {
	render() {
		return (
			<View style={this.props.headingStyle}>
				<ContentText textStyle={photoStyles.headingText}>
					{this.props.title}
				</ContentText>
        {this.props.children}
			</View>
		);
	}
}

// main content and structure - e.g. text, image &c.
class MainContent extends Component {
	render() {
		return (
			<View style={this.props.mainStyle}>
				<ContentText textStyle={photoStyles.contentText}>
					{this.props.content}		
				</ContentText>
          {this.props.children}
			</View>
		);
	}
}

// named exports
export { Container, ContentText, NavButton, Header, MainContent };
