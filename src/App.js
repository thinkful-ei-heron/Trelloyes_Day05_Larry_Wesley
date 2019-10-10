//https://github.com/thinkful-ei-heron/Trelloyes_Day05_Larry_Wesley.git
import React, { Component } from 'react';
import List from './List'
import './App.css';
import Store from './STORE';

function omit(obj, keyToOmit){
  const newResults= {};
  Object.entries(obj).forEach(entryPair =>{
    if (entryPair[0] !== keyToOmit){
      newResults[entryPair[0]] = entryPair[1];
    }
  })
  return newResults;
}

function randomCard () {

  const id = Math.random().toString(36).substring(2, 4)
          + Math.random().toString(36).substring(2, 4);
      
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
 }

class App extends Component {
    state = {
      store: Store
    }

    handleRandomCard = (listId) => {
      console.log(this.state.store);
      const newCard = randomCard()
      const newList = this.state.store.lists.map((item) => {
        if(item.id === listId) {
          return {
            ...item,
            cardIds: [...item.cardIds, newCard.id]
          };
        }
        return item;
      }) 
      console.log(newCard);
      console.log(newList);      
      this.setState({
        store: {
                ...this.state.store,
                lists: newList,
                allCards: newCard}
    })
  }

  // Create a function to omit, iterates through the object and pulls the matched value.
  // Then returns a brand new version of the object without.
    handleDeleteCard = (id) => {
      const newLists = this.state.store.lists.map(list => {
        return {...list, cardIds: list.cardIds.filter(cardId => cardId !== id)}
      })
      const newCards = omit(this.state.store.allCards, id);
      this.setState({
        store: {...this.state.store, 
                lists: newLists, 
                allCards: newCards}
      })
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
              id={list.id}
              header={list.header}
              cards={list.cardIds.map(id => store.allCards[id])}
              handleAddCard={this.handleRandomCard}
              handleDelete={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;