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
    const urlParams = new URLSearchParams(window.location.search)
    const address = urlParams.get('address')
    this.setState({ contractAddress: address })
  }

  async loadWeb3() {
    if(typeof window.ethereum!=='undefined'){
      const web3 = new Web3(window.ethereum)
      this.setState({web3: web3})
      return web3
    } else {
      window.alert('Please install MetaMask')
      window.location.assign("https://metamask.io/")
    }
  }

  async loadBlockchainData() {
    const web3 = await this.loadWeb3()
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    if(this.state.contractAddress) {
      await this.loadAsset()
    }
    this.setState({ loading: false })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      contractAddress: null,
      contract: {},
      name: '',
      custodian: '',
      actions: [],
      loading: true
    }
  }

  async loadAsset() {
    const web3 = await this.loadWeb3()
    const contract = new web3.eth.Contract(Asset.abi, this.state.contractAddress)
    const name = await contract.methods.name().call()
    const status = await contract.methods.status().call()
    const custodian = await contract.methods.custodian().call()
    const actions = await contract.getPastEvents('Action', { fromBlock: 0, toBlock: 'latest' } )

    this.setState({
      contract,
      name,
      status,
      custodian,
      actions
    })
  }

  createAsset = async (name) => {
    this.setState({ loading: true })
    const web3 = await this.loadWeb3()
    const contract = new web3.eth.Contract(Asset.abi)
    contract.deploy({
      data: Asset.bytecode,
      arguments: [name]
    })
    .send({
      from: this.state.account
    }).once('receipt', async (receipt) => {
      this.setState({ contractAddress: receipt.contractAddress })
      await this.loadAsset()
      this.setState({ loading: false })
    })
  }

  sendAsset = async (to) => {
    this.setState({ loading: true })
    this.state.contract.methods.send(to).send({
      from: this.state.account
    }).once('receipt', async (receipt) => {
      await this.loadAsset()
      this.setState({ loading: false })
    })
  }

  receiveAsset = async () => {
    this.setState({ loading: true })
    this.state.contract.methods.receive().send({
      from: this.state.account
    }).once('receipt', async (receipt) => {
      await this.loadAsset()
      this.setState({ loading: false })
    })
  }

  renderContent() {
    if(this.state.loading) {
      return(
        <div id='loader' className='text-center'>
          <p className='text-center'>Loading...</p>
        </div>
      )
    }

    if(this.state.contractAddress) {
      return(
        <Main
          name={this.state.name}
          custodian={this.state.custodian}
          status={this.state.status}
          contractAddress={this.state.contractAddress}
          actions={this.state.actions}
          receiveAsset={this.receiveAsset}
          sendAsset={this.sendAsset}
        />
      )
    } else {
      return(
        <Form
          createAsset={this.createAsset}
        />
      ) 
    }
  }

  render() {
    return (
      <div className="text-monospace">
        <Navbar account={this.state.account} />
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