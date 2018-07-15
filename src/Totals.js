import React, { Component } from 'react';
import './Total.css';

export default class Totals extends Component {
    state = {
        availableRooms: 0,
        reservedRooms: 0,
        checkedIn: 0
    }
    componentDidMount(){
        fetch('https://interview-booking-api.herokuapp.com/api/booking-snapshot')
        .then(response => response.json())
        .then(data => this.setState({ 
            availableRooms: data.availableRooms,
            reservedRooms: data.reservedRooms,
            checkedIn: data.checkedIn
         }))
         .catch((e) => console.log(e));
    }

    render() {
        const {availableRooms, reservedRooms, checkedIn} = this.state;
        return (
            <div className='row total'>
                <div className='col-md-4 col-sm-12 d-flex flex-column'>
                    <span className='total-header'>{availableRooms}</span>
                    <span className='total-sub-header'>Rooms avalibale</span>
                </div>   
                <div className='col-md-4 col-sm-12 d-flex flex-column'>
                    <span className='total-header'>{reservedRooms}</span>
                    <span className='total-sub-header'>Reserved rooms</span>
                </div>
                <div className='col-md-4 col-sm-12 d-flex flex-column '>
                    <span className='total-header'>{checkedIn}</span>
                    <span className='total-sub-header'>Checked in</span>
                </div>
            </div>
        );
    }
}


