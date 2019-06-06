
const handleSignin = (db, bcrypt) => (req, res) => {
	const {password, email} = req.body;
	if (!password || !email){
		return res.status(400).json('Incorrect submission');
	}
	db.select('email', 'hash').from('login').where('email', '=', email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
		if (isValid){
			return db.select('*').from('users').where('email', '=', email)
			.then(user =>{	
				res.json(user[0])
			})
		}	else{
			res.status(400).json('Wrong email or password')
		}
	})
	.catch(err => res.status(400).json('Wrong email or password'))
}

module.exports = {
	handleSignin: handleSignin
};