import React, {Component} from 'react';
import { connect } from 'react-redux';
import { getPoll } from './../actions/index';

class MainApp extends Component {

  render() {
    console.log('main render-->',this.props);
    return (
      <div className="MainApp">
        MainApp
      </div>
    )
  }

}
const mapStateToProps = (state) =>{
  console.log('MainApp-->',state);
  return{...state}
}
const mapDispatchToProps = {
  getPoll : getPoll
}
export default connect(mapStateToProps, mapDispatchToProps)(MainApp);