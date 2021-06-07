import { Component } from 'react';
import './App.css';
import marked from 'marked'

import{sampleText} from './sampleText'

class App extends Component {
  state = {
    text : sampleText
  }

  //Lié à un component statefull, s'exécute au refresh de la page, quand le component se monte
  componentDidMount(){
    const text = localStorage.getItem('text');

    if(text){
      this.setState({text})
    }else{
      this.setState({text : sampleText});
    }
  }

  //s'exécute quand le component se met à jour
  componentDidUpdate(){
    const text = this.state.text;
    localStorage.setItem('text', text);
  }

  handleChange = (event) => {
    const textCopy = {... this.state.text}
    const text = event.target.value
    this.setState({ text })
  }

  renderText = (text) => {
    //sanitize fait partie de la bibliothèque marked, il supprime le rendu en balises des élements html dans le markdown editor
    const __html = marked(text, {sanitize:true});
    return {__html}
  }

  render(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <textarea className="form-control" rows="35" value={this.state.text} onChange={this.handleChange}></textarea>
          </div>
          <div className='col-sm-6'>
            <div dangerouslySetInnerHTML={this.renderText(this.state.text)}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
