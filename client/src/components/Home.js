import React, { Component } from "react";
import { Button, Card, CardActions, CardContent, Chip, IconButton, Tooltip } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import languages from "./languages";

class Home extends Component {
  constructor(props) {
    super(props);
    console.log(props.loggedIn)
    // create a ref to store the textInput DOM element
    this.fileInput = React.createRef();
    //this.focusTextInput = this.focusTextInput.bind(this);
    this.state = {
      file: '',
      imagePreviewUrl: '',
      preview: false,
      chipData: [],
      loggedIn: props.loggedIn,
      output: 'Output will be shown here'
    };
  }

  handleChipDelete = key => () => {
    this.setState(state => {
      const chipData = [...state.chipData];
      const chipToDelete = chipData.indexOf(key);
      chipData.splice(chipToDelete, 1);
      return { chipData };
    });
    console.log(this.state.chipData);
  };

  handleClick = () => {
    this.fileInput.current.click();
    return;
  };

  _handleSubmit = (e) => {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  handleSelect = e => {
    if (e.target.value === 'none') return;

    for (let i = 0; i < this.state.chipData.length; i++) {
      if (this.state.chipData[i] === e.target.value) return;
    }

    this.state.chipData.push(e.target.value);
    this.setState(state => {
      const chipData = [...state.chipData];
      return { chipData };
    });
  }

  _handleImageChange = (e) => {
    e.preventDefault();
    const file_input = document.getElementById('file-input');
    if (!e.target.files[0]) return;

    const file = e.target.files[0];
    const reader = new FileReader();
    if ( !(file.type.indexOf('image') >= 0) ) {
      this.props.openToast({
        open: true,
        msg: 'Please upload an image file',
        variant: 'warning'
      });
      return;
    }

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        preview: true,
      });
      file_input.reset();
    }

    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state;

    return (
      <div className="centeredFlex main-app" id="centeredFlex" style={{ marginTop: 10, marginBottom: 10 }}>
        <div className="main-card-left content-card">
          <Card className="content-card-inner">
            {
              !this.state.preview ?
                <div className="centeredFlex" style={{ height: '-webkit-fill-available' }}>
                  <Button className="button white" color="primary" variant="raised" onClick={this.handleClick}>
                    Choose an image
                  </Button>
                </div>
                :
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div className="overlay-preview" style={{ alignSelf: 'flex-end' }}>
                    <Tooltip title="Cancel">
                      <IconButton onClick={() => this.setState({ preview: false })}>
                        <CloseIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <CardContent className="centered" style={{ paddingBottom: 0, paddingTop: 35 }}>
                    <img alt="img" src={imagePreviewUrl} height="240" width="320" />
                  </CardContent>
                  <CardActions className="centeredFlex" style={{ minHeight: 105, paddingLeft: 15, paddingRight: 15 }}>
                    <div className="inline-flex justify-start align-center">
                      <div className="language-chooser">
                        <div>
                          <div style={{ marginBottom: 5 }}>{this.state.chipData[0] ? 'Specify another' : 'Specify language'}</div>
                          <select className="custom-select" onChange={e => this.handleSelect(e)}>
                            <option value="none" label="Choose..."></option>
                            {
                              Object.keys(languages).map((key) => {
                                console.log(key, languages[key]);
                                return <option value={key} key={key} label={languages[key]}></option>;
                              })
                            }
                          </select>
                        </div>
                        <div className="flex start wrap" style={{ maxWidth: 200 }}>
                          {
                            this.state.chipData.map(key => {
                              return (
                                <Chip
                                  key={key}
                                  label={languages[key]}
                                  onDelete={this.handleChipDelete(key)}
                                  className="chip"
                                />
                              );
                            })
                          }
                        </div>
                      </div>
                      <div className="auto-left">
                        <Button className="button" variant="raised" color="primary">Go</Button>
                      </div>
                    </div>


                  </CardActions>

                </div>
            }
            <div style={{ display: 'none' }}>
            <form id="file-input">
              <input
                className="fileInput"
                type="file"
                ref={this.fileInput}
                onChange={(e) => this._handleImageChange(e)}
              />
            </form>
            </div>
          </Card>
        </div>
        <div className="spacing"></div>
        <div className="main-card-right content-card">
          <Card className="content-card-inner">
            <CardContent style={{ height: 295 }}>
              { this.state.output }
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}


export default Home;
