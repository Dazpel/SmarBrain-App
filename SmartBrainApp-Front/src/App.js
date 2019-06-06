import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const particlesOptions = {
   particles: { 
           number: {
               value: 80,
              density: {
                enable: true,
                value_area:700
              }
            }
          }
        }

const initialState = {
  input:'',
      imageUrl:'',
      box:{},
      route: 'Signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends Component {
  constructor(){
    super();
    this.state=initialState
  }

    loadUser = (data) => {
      this.setState({user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
        }
      })
    }

  // componentDidMount(){
  //   fetch('http://localhost:3001')
  //   .then(response=> response.json())
  //   .then(console.log)
  // }

  locateFacePosition = (data) => {
    console.log(data);
    const faceRegion = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width= Number(image.width);
    const height= Number(image.height);
      return {
        leftCol: faceRegion.left_col * width,
        topRow: faceRegion.top_row * height,
        rightCol: width - (faceRegion.right_col * width),
        bottomRow: height - (faceRegion.bottom_row * height)
      }
  } 

  displayFacePosition= (box) => {
    this.setState({box: box});
  }

  onInputChange=(event)=>{
    this.setState({input: event.target.value});
  }

  onSubmitClick=()=>{
    this.setState({imageUrl: this.state.input});
       fetch('http://localhost:3001/imageUrl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
           fetch('http://localhost:3001/image',{
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
         this.displayFacePosition(this.locateFacePosition(response))
      })
      .catch(err => console.log(err));
  }
  //   this.setState({imageUrl: this.state.input});
  //     fetch('http://localhost:3001/imageUrl',{
  //           method: 'post',
  //           headers: {'Content-Type':'application/json'},
  //           body: JSON.stringify({
  //           input: this.state.input
  //         })
  //     })
  //   .then(response => response.json())
  //   .then(response => {
  //     console.log(response);
  //     if (response){
  //       fetch('http://localhost:3001/image',{
  //         method: 'put',
  //         headers: {'Content-Type':'application/json'},
  //         body: JSON.stringify({
  //         id: this.state.user.id
  //       })
  //     })
  //       .then(response => response.json())
  //       .then(count=>{
  //         this.setState(Object.assign(this.state.user,{entries: count}))
  //       })
  //       .catch(console.log)
  //   } 
  //     this.displayFacePosition(this.locateFacePosition(response))
  //   })
  //   .catch(err => console.log(err))
  // }

  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState(initialState);
    } else if (route === 'home') {
     this.setState({isSignedIn: true}); 
    }

  this.setState({route: route});
  }

  render() {
    const {isSignedIn, box, route, imageUrl} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
          params = {particlesOptions} 
        />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} />
        { 
          route === 'home'
            ? <div>
                <Logo />
                <Rank 
                name = {this.state.user.name} 
                entries={this.state.user.entries} 
                />
                <ImageLinkForm 
                onInputChange={this.onInputChange} 
                onSubmitClick={this.onSubmitClick}
                />
                <FaceRecognition
                box={box}
                imageUrl={imageUrl} 
                /> 
              </div>
            : (
                route === 'Signin'
                ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
        }   
      </div>
    );
  }
}

export default App;
