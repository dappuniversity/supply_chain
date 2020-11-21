import Asset from '../artifacts/Asset.json'
import React, { Component } from 'react';
import Navbar from './Navbar'
import Form from './Form'
import Main from './Main'
import Web3 from 'web3'
import './App.css';

class App extends Component {

  async componentWillMount() {
    await this.detectAsset()
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async detectAsset() {
    //Get url
  }

  //declare web3
  async loadWeb3() {
    //if metamask is detected, return web3 and set web3 state

    //else redirect to download MetaMask
  }

  async loadBlockchainData() {
    //Load web3

    //Get Accounts

    //Set Account

    //if contract is depoloyed, load asset

    //set loading state to false
  }

  constructor(props) {
    super(props)
    this.state = {
      //create states
    }
  }

  async loadAsset() {
    //assign web3

    //assign contract

    //get the name of the asset

    //get the status of the asset

    //get current custodian

    //get data from events

    //set above info into state
  }

  createAsset = async (name) => {
    //set loading state to true

    //assign web3

    //assign contract

    //deploy contract, once done update data

    //set loading state to false
  }

  sendAsset = async (to) => {
    //set loading state to true

    //send assest, once done update data

    //set loading state to false
  }

  receiveAsset = async () => {
    //set loading state to true

    //receive assest, once done update data

    //set loading state to false
  }

  //Loading UI...
  renderContent() {
    if({/* state loading is true */}) {
      return(
        <div id='loader' className='text-center'>
          <p className='text-center'>Edit Me</p> {/* Loading */}
        </div>
      )
    }

    if({/* state contain contract address */}) {
      return(
        <Main
          //parse states to the Main component
        />
      )
    } else {
      return(
        <Form
          //parse create asset state to Form component
        />
      ) 
    }
  }

  render() {
    return (
      <div>
        <Navbar /> {/* parse account state to Navbar */}
        <div className='container-fluid mt-5'>
          <div className='row'>
            <main role='main' className="col-lg-12 ml-auto mr-auto">
              {this.renderContent()}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;