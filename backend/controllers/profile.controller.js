// get user profile
const getProfile = (req, res, db) => {
    db.select('*').from('profile')
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

// update user profile
const updateProfile = (req, res, db) => {
    const { id, name, passion, image } = req.body;
    db('profile')
       .where({ id })
       .update({ name, passion, image })
       .then(user => {
        res.json(user);
       })
}



module.exports = {
    getProfile,
    updateProfile,
}