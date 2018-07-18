import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import image from "../icons/ggg.jpg";
import languages from "./languages";
import Chip from '@material-ui/core/Chip/Chip.js';


class Home extends React.Component {
  state = {
    file: '',
    imagePreviewUrl: '',
    preview: false,
    chipData: [],
  };

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

  _handleSubmit(e) {
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

  _handleImageChange(e) {
    e.preventDefault();
    if (!e.target.files[0]) return;
    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        preview: true,
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let { imagePreviewUrl } = this.state;

    if (!this.state.loggedIn) {
      return 'please login first';
    }

    return (
      <div className="centeredFlex main-app" id="centeredFlex" style={{ marginTop: 10, marginBottom: 10 }}>
        <div className="main-card-left content-card">
          <Card className="content-card-inner">
            <CardContent className="centered" style={{ paddingBottom: 0 }}>
              <img alt="Sign in with Google" src={imagePreviewUrl ? imagePreviewUrl : image} height="225" width="275" />
            </CardContent>
            <CardActions className="centeredFlex" style={{ minHeight: 75, paddingLeft: 15, paddingRight: 15 }}>
              {
                !this.state.loggedIn ? <p> Login </p>
                :
                !this.state.preview ?
                  <Button className="button white" color="primary" variant="raised" onClick={this.handleClick}>
                    Choose an image
                  </Button>
                  :
                  <div className="inline-flex">
                    <div>
                      <div className="flex flex-start column">
                        <div style={{marginBottom: 5}}>{this.state.chipData[0] ? 'Specify another' : 'Specify language'}</div>
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
                        {this.state.chipData.map(key => {
                          return (
                            <Chip
                              key={key}
                              label={languages[key]}
                              onDelete={this.handleChipDelete(key)}
                              className="chip"
                            />
                          );
                        })}
                      </div>
                    </div>

                    <Button className='button auto-left white' variant="raised" color="primary">Go</Button>
                  </div>
              }
              <div style={{ display: 'none' }}>
                <input className="fileInput"
                  type="file"
                  ref={this.fileInput}
                  onChange={(e) => this._handleImageChange(e)}
                />
              </div>
            </CardActions>
          </Card>
        </div>
        <div className="spacing"></div>
        <div className="main-card-right content-card">
          <Card className="content-card-inner">
            <CardContent>
              text
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">
                Share
              </Button>
              <Button size="small" color="primary">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </div>
      </div>
    );
  }
}


export default Home;
