const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'a76cf8a174ee4ca5b00ec21ef6caf225'
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json('unable to work with API'))
}

const handleImage = (req, res,db)=>{
	const {id} = req.body;
	db('users').where('id','=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err => res.status('400').json('Cannot retrieve entries'))
}

module.exports ={
	handleImage: handleImage,
	handleApiCall: handleApiCall
};