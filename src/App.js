import React, { Component } from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.min.css"
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Default from './components/Default'
import Cart from './components/Cart'
import Details from './components/Details'

import { Switch,  Route } from "react-router-dom";
import  Modal  from './components/Modal'



export default class App extends Component {
  render() {
    return (
     <React.Fragment>
      <Navbar/>
      <Switch>
      <Route exact path='/' component={ProductList}></Route>
      <Route path='/detail' component={Details}></Route>
      <Route path='/cart' component={Cart}></Route>
      <Route  component={Default}></Route>
      
      </Switch>
      <Modal/>
      
     </React.Fragment>
    )
  }
}
