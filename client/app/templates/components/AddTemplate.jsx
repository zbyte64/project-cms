import React from 'react';
import _ from 'lodash';
import Codemirror from 'react-codemirror';

import 'codemirror/mode/jinja2/jinja2';


export default class AddTemplate extends React.Component {
  constructor(props) {
    super(props) //{addTemplate}
    this.state = {};
  }

  receiveSubmit = (event) => {
    event.preventDefault();
    this.props.addTemplate(this.state.path, this.state);
  }

  updateContent = (code) => {
    this.setState({content: code});
  }

  render() {
    let template = this.state;

    return <div className="container-fluid">
      <div className="row">
        <div className="col-sm-12">
          <h1>Add Template</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <form onSubmit={this.receiveSubmit}>
            <div className="form-group">
              <label className="control-label">Path</label>
              <span className="help-block">Must start with a / ; may contain alphanumerics, dashes, slashes and periods only</span>
              <input name="path" className="form-control" value={template.path} required="required" onChange={this.updateValue}
                pattern="^\/[a-z0-9-\/\.]+$" placeholder="/path.html"/>
            </div>
            <div className="form-group">
              <label className="control-label">Template</label>
              <span className="help-block">Write the HTML layout using <a href="https://paularmstrong.github.io/swig/">swig</a></span>
              <Codemirror value={template.content} onChange={this.updateContent} options={{
                  mode: 'jinja2',
                  lineNumbers: true
              }} />
            </div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  }
}
