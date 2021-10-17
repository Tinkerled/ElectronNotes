import React, { Component } from "react";
import { Paper, TextField, TextareaAutosize } from "@material-ui/core"
import Button from '@material-ui/core/Button';
import AnimateHeight from 'react-animate-height';

class Note extends Component {

  state = {
    content: '',
    height: 0,
    disabled: true
  }

  componentDidUpdate(prevProps, prevState){
    if(this.state.content !== prevState.content)
      if (!this.state.content > 0)
        this.setState({ disabled: true });
      else 
        this.setState({ disabled: false });
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value })
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  showControls = () => {
    this.setState({  height: "auto" });
  }

  hideControls = () => {
    if (!this.state.content.length > 0)
      this.setState({ height: 0 });
  }

  saveNote = (e) => {
    e.preventDefault();
    window.appContext.saveNote(this.state.content);
  }

  cancelNote = () => {
    this.setState({ content: '', height: 0 });
  }

  render() {
    const notePad = { padding: 10 }

    const textFieldContainer = {
      position: "relative",
      width: "100%",
      maxWdith: "100%",
      minHeight: "40px"
    }

    const textField = {
      width: "100%",
      height: "auto",
      maxWdith: "100%",
      minHeight: "40px"
    }

    const controls = {
      width: "100%",
      paddingTop: 10,
      display: "flex",
      justifyContent: "space-between"
    }

    return (
      <div>
        <Paper
          style={notePad}
          elevation={2}
        >
          <div style={textFieldContainer} >
            <TextField
              style={textField}
              id="standard-multiline-static"
              value={this.state.content}
              multiline
              placeholder="Take a note..."
              rows={3}
              variant="standard"
              onChange={this.handleChange}
              onFocus={this.showControls}
              onBlur={this.hideControls}
            />
          </div>

          <AnimateHeight height={this.state.height}>
            <div style={controls}>
              <Button
                variant="contained"
                color="primary"
                disabled={this.state.disabled}
                onClick={this.saveNote}>
                Save
              </Button>

              <Button
                onClick={this.cancelNote}>
                Cancel
              </Button>
            </div>
          </AnimateHeight>
        </Paper>
      </div>
    )
  }
}

export default Note;