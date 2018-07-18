import React, { Component } from 'react';
import axios from 'axios';


class ImageUpload extends Component{
	constructor(props){
		super(props);

		this.state ={
			selectedFile:''
		}
	}

	fileSelectedHandler = (event) =>{
		this.setState({
			selectedFile:event.target.files[0]
		})
		console.log(this.state.selectedFile.name)
		axios.post('https://api.cloudinary.com/v1_1/dxk0bmtei/image/upload/',event.target.files[0])
		.then(res => {
			console.log(res);
		})
	}
	fileUploadHandler = () =>{
		console.log(this.state.selectedFile.name);
		var fd = new FormData();
		fd.append('image',this.state.selectedFile,this.state.selectedFile.name)
		axios.post('https://api.cloudinary.com/v1_1/dxk0bmtei/image/upload/',this.state.selectedFile)
		.then(res => {
			console.log(res);
		})
	}

  /*handleImage = (event) =>{
  	event.preventDefault();
  	this.setState({
  		image:event.target.files[0]
  	})
  	console.log(event.target.files[0]);
  	axios.post('http://res.cloudinary.com/dxk0bmtei/image/upload/')
  	.then(res =>{
  		console.log(res);
  		
  	})
  }

  uploadingImage = () =>{
  	
  }*/


	render(){
		return(
			<div>
				
				<input type="file" onChange={this.fileSelectedHandler} ref={fileInput => this.fileInput = fileInput} />
				<button onClick={() => this.fileInput.click()}>PickFile</button>
				<button onClick={this.fileUploadHandler}>Upload</button>
				
			</div>	
			)
	}
}

export default ImageUpload;