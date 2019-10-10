import React, { Component } from 'react';
import List from './List'
import './App.css';
import Store from './STORE';

class App extends Component {
    state = {
      store:Store
    }

    handleDelete(e,data){
      // const 
      // this.setState({
      //   //delete store.allCards(key) that matches click
      //   store: null
      // })
    }



  render() {
    const { store } = this.state
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {store.lists.map(list => (
            <List
              key={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleDelete={this.handleDelete}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;