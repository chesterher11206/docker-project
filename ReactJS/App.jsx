import React from 'react';

class App extends React.Component {
   constructor(props) {
      console.log('Component constructor!');
      super(props);

      this.state = {
         data: 0,
         clickEvent: "",
         eventType: ""
      };
      this.setNewNumber = this.setNewNumber.bind(this);
      this.onClick = this.onClick.bind(this);
   };

   setNewNumber() {
      console.log('Update data!');
      this.setState({data: this.state.data + 1});
   };

   onClick(event) {
      // return false; // make event invalid
      // event.preventDefault(); // keep the event
      console.log("Click!");
      console.log(event); // => nullified object.
      console.log(event.type); // => "click"
      const eventType = event.type; // => "click"
 
      setTimeout(function() {
        console.log(event);
        console.log(event.type); // => null
        console.log(eventType); // => "click"
      }, 0);

      console.log(event);

      // Won't work. this.state.clickEvent will only contain null values.
      this.setState({clickEvent: event});
      // You can still export event properties.
      this.setState({eventType: event.type});
    };

   componentWillMount() {
      console.log('App WILL MOUNT!');
   };
   componentDidMount() {
      console.log('App DID MOUNT!');
   };
   componentWillReceiveProps(newProps) {    
      console.log('App WILL RECIEVE PROPS!');
   };
   shouldComponentUpdate(newProps, newState) {
      console.log('App shouldComponentUpdate!');
      return true;
   };
   componentWillUpdate(nextProps, nextState) {
      console.log('App WILL UPDATE!');
      console.log(this.state);
   };
   componentDidUpdate(prevProps, prevState) {
      console.log('App DID UPDATE!');
      console.log(this.state);
   };
   componentWillUnmount() {
      console.log('App WILL UNMOUNT!');
   };

   render() {
      console.log('App render!');
      console.log(this.state);
      return (
         <div>
            <button onClick = {this.setNewNumber}>INCREMENT</button>
            <Content myNumber = {this.state.data}></Content>
            <button onClick = {this.onClick}>Click</button>
         </div>
      );
   };
}
class Content extends React.Component {
   componentWillMount() {
      console.log('Content WILL MOUNT!');
   };
   componentDidMount() {
      console.log('Content DID MOUNT!');
   };
   componentWillReceiveProps(newProps) {    
      console.log('Content WILL RECIEVE PROPS!');
   };
   shouldComponentUpdate(newProps, newState) {
      console.log('Content shouldComponentUpdate!');
      return true;
   };
   componentWillUpdate(nextProps, nextState) {
      console.log('Content WILL UPDATE!');
   };
   componentDidUpdate(prevProps, prevState) {
      console.log('Content DID UPDATE!');
   };
   componentWillUnmount() {
      console.log('Content WILL UNMOUNT!');
   };
   render() {
      console.log('Content render!');
      return (
         <div>
            <h3>{this.props.myNumber}</h3>
         </div>
      );
   };
}
export default App;