import { Component } from 'react';
import './App.css';
import marked from 'marked'

import{sampleText} from './sampleText'

class App extends Component {
  state = {
    text : sampleText
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
