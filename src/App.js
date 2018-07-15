import React, { Component } from 'react';
import './App.css';
import Totals from './Totals';
import EmployeeStats from './EmployeeStats';
import { Container } from 'reactstrap';

class App extends Component {
  render() {
    return (
      <Container className='app'>
          <Totals />
          <EmployeeStats />
      </Container>
    );
  }
}

export default App;
