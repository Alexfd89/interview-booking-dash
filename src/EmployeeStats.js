import React, { Component } from 'react';
import moment from 'moment';
import _ from 'lodash';
import './EmployeeStats.css';

export default class EmployeeStats extends Component {
    state = {
        isLoading: true,
    }
    componentDidMount(){
        fetch('https://interview-booking-api.herokuapp.com/api/bookings')
        .then(response => response.json())
        .then(data => {
            let employees = {};
            data.forEach(element => {
                if(element.employee){
                    let checkIn = moment(element.checkInDate, 'DD-MM-YYYY');
                    let checkOut = moment(element.checkOutDate, 'DD-MM-YYYY');
                    let hours = checkOut.diff(checkIn, 'hours');
                    if(!employees[element.employee.id]){
                        employees[element.employee.id] = {
                            ...element.employee,
                            hours: 0
                        }
                    }
                    employees[element.employee.id].hours += hours;
                }
            });
            let employeesToArray = _.values(employees);
            employeesToArray.sort((a,b) => b.hours - a.hours);
            this.setState({
                isLoading: false,
                employees: [
                    {...employeesToArray[0]},
                    {...employeesToArray[1]},
                    {...employeesToArray[2]}
                ]
            })
        })
        .catch((e) => console.log(e));
    }
  render() {
    let isLoading = this.state.isLoading;
    
    return (
      <div className='stats'>
        <div className='stats-header'>Employee Stats</div>
            {
                isLoading ? (
                    <h2>Loading....</h2>                    
                ) : (
                    this.state.employees.map((employee, i) => {
                        return (
                            <div key={i} className='row stats-employee'>
                                <div className='col'><img src={employee.profileImageUrl} className='stats-img' alt='Employee' /></div>
                                <div className='col'>{`${employee.firstName} ${employee.lastName.substr(0,1)}.`}</div>
                                <div className='col stats-hours'>{`${employee.hours} hours`}</div>
                            </div>
                        )
                    })
                        
                )
            }
      </div>
    );
  }
}
