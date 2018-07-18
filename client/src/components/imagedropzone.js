import React, { Component } from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import sha1 from 'sha1';
import superagent from 'superagent'


class ImageUploadDropzone extends Component{
		uploadFile = (files) =>{
			console.log('uploadFile:')
			const image = files[0]

			const cloudName = '******'
			const url = 'https://api.cloudinary.com/v1_1/'+cloudName+'/image/upload'

			const timestamp = Date.now()/1000
			const uploadPreset = '******'

			const paramsStr = 'timestamp='+timestamp+'&upload_preset='+uploadPreset+'*****************'

			const signature = sha1(paramsStr)
			const params = {
				'api_key':'****************************',
				'timestamp':timestamp,
				'upload_preset':uploadPreset,
				'signature':signature
			}

			let uploadRequest = superagent.post(url)
			uploadRequest.attach('file', image)

			Object.keys(params).forEach((key) =>{
				uploadRequest.field(key, params[key])
			})

			uploadRequest.end((err, resp) =>{
				if(err){
					alert(err)
					return
				}
				console.log('Upload Complete: '+JSON.stringify(resp.body))
			})

		}

		render(){
			return(
				<div>
					<h4>Image dropzone</h4>
					<Dropzone onDrop={this.uploadFile.bind(this)}/>
				</div>
				)
		}

}
export default ImageUploadDropzone;
