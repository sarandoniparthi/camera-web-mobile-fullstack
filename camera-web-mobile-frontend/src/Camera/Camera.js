import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import * as jsPDF from 'jspdf';
import axios from 'axios';


class Camera extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.hideimage= true;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: ''
    }
  }

  componentDidMount() {
    let idealFacingMode = FACING_MODES.ENVIRONMENT;
    let idealResolution = { width: 400, height: 400 };
    let camera=this.cameraPhoto = new CameraPhoto(this.videoRef.current);
    camera.startCamera(idealFacingMode, idealResolution)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        alert(error);
        this.hideimage=true;
        console.error('Camera not started!', error);
      });
  }

  Upload() {
    
    if(this.state.dataUri){this.hideimage=false;}
    let doc = new jsPDF(); //pdf converstion
    doc.setFontSize(40);
    doc.text(35, 25, 'Camera-Web-Mobile');
    doc.addImage(this.state.dataUri,'JPEG', 15, 40, 180, 160);
    let pdf = doc.output('datauristring');   
    const data = new FormData(); 
    data.append('file', pdf);
    axios.post("http://localhost:4040/api/files/send", data, {      
    })//replace with your service
      .then(res => { 
        alert('Upload success');
      })
      .catch(err => { 
        this.hideimage=true;
        alert('upload fail');        
      })
  }

  takePhoto() {
    const config = {
      sizeFactor: 1
    };
     this.hideimage=false;
    let dataUri = this.cameraPhoto.getDataUri(config);
    this.setState({ dataUri });
  }

  render() {
    let imageupload;
     if (!this.hideimage) {
      imageupload =
        <>
         <div className="col-md-3">
          <button type="button" className="btn btn-primary btn-md" onClick={() => {
            this.Upload();
          }}> Upload  </button>
          <div>
            <img alt="imgCamera"
              src={this.state.dataUri} className="img-thumbnail" />
          </div>
        </div> 
        </>
    }
    else {
      imageupload=<></>;
    }
    return (
      <>
        <div className="col-md-2">
        </div>
        <div className="col-md-3">
          <button type="button" className="btn btn-primary btn-md" onClick={() => {
            this.takePhoto();
          }}> Take photo </button>
          <video className="img-thumbnail"
            ref={this.videoRef}
            autoPlay="true"
          />
        </div>
        <div className="col-md-2">
        </div>

       {imageupload}
        <div className="col-md-2">
        </div>
      </>
    );
  }
}

export default Camera;