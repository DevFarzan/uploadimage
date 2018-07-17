import React, { Component } from 'react';
import axios from 'axios';


class ImageUpload extends Component{
	constructor(props){
    super(props)
    this.state = {
      image:''
    }
  }

  handleImage = (event) =>{
  	event.preventDefault();
  	this.setState({
  		image:event.target.files[0]
  	})
  	console.log(event.target.files[0]);
  	axios.post('https://api.cloudinary.com/v1_1/dxk0bmtei/image/upload',event.target.files[0])
  	.then(res =>{
  		console.log(res);
  	})
  }

  uploadingImage = () =>{
  	
  }


	render(){
		return(
			<div>
				
					<input type="file" style={{display:'none'}} onChange={this.handleImage} ref={fileInput => this.fileInput = fileInput} />
					<button onClick={() => this.fileInput.click()}>PickFile</button>
					<button onClick={this.uploadingImage}>Upload</button>
				
				
			</div>	
			)
	}
}

export default ImageUpload;