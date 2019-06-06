import React from 'react';
import './ImageLinkForm.css';


const ImageLinkForm = ({onInputChange, onSubmitClick}) => {
	return (
		<div>
			<p className='f3'>
				{'This API will detect a face in your pictures. Give it a try!'}
			</p>
			<div className= 'center'>
				<div className='form center pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 center' type='text'
					onChange={onInputChange}
					/>
					<button className='w-30 grow f4 link ph3 pv2 dib white bg-black'
					onClick={onSubmitClick}> Detect </button>
				</div>
			</div>
		</div>
		
		);
}

export default ImageLinkForm; 