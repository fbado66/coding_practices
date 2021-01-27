import logo from './logo.svg';
import React from 'react'
import './App.css';

class  App extends React.Component {

  state = {
    firstColor: true
  }

  handleClick = () => {
    this.setState({
      firstColor: !this.state.firstColor
    })

  }

  render() {

    let btn_class = this.state.firstColor ? 'yellowColor' : 'redColor'


  return (
    <div className="App">
      <header className="App-header">

        
        

          <button className ={btn_class}
          onClick = {() => this.handleClick()}> Click </button>
       
      </header>
    </div>
  );
}
}

export default App;
