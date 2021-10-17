import React, { Component } from "react";
import { Paper, TextField, Tooltip } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import AnimateHeight from 'react-animate-height';

class Note extends Component {

  state = {
    content: '',
    height: 0,
    disabled: true,
    TooltipMessage: "You cannot save an empty note"
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.content !== prevState.content)
      if (!this.state.content > 0)
        this.setState({ disabled: true });
      else
        this.setState({ disabled: false });
  }

  handleChange = (e) => {
    this.setState({ content: e.target.value })
    e.target.style.height = 'inherit';
    e.target.style.height = `${e.target.scrollHeight}px`;

    if (!e.target.value > 0)
      this.setState({ TooltipMessage: "You cannot save an empty note" })
    else
      this.setState({ TooltipMessage: "" })
  }

  showControls = () => {
    this.setState({ height: "auto" });
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
    // ✔ this works

    // this.setState({ content: '' });
    // this.hideControls()
    // ❌ this fails to hide the controls because emptying the content is not yet done at hideControls()
  }

  render() {
    const notePad = { padding: 10 }

    const controls = {
      display: "flex",
      width: "100%",
      paddingTop: 10,
      justifyContent: "space-between"
    }

    return (
      <div>
        <Paper
          style={notePad}
          elevation={2}
        >
          <TextField 
            style={{width: "100%"}}
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

          <AnimateHeight height={this.state.height}>
            {/* style controls must be applied to a child container because style flex cannot be applied to AnimateHeight */}
            <div style={controls}>

              <Tooltip title={this.state.TooltipMessage}>
                {/* A span is required because a disabled button doesnt send events */}
                <span>
                  <Button
                    variant="contained"
                    color="primary"
                    // save button is disabled is note content length not longer than zero
                    disabled={this.state.disabled}
                    onClick={this.saveNote}>
                    Save
                  </Button>
                </span>
              </Tooltip>

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