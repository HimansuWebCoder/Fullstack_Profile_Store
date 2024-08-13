const upload = require('../config/multerConfig');
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
// const updateProfile = (req, res, db) => {
//     const { id, name, passion, image } = req.body;
//     db('profile')
//        .where({ id })
//        .update({ name, passion, image })
//        .then(user => {
//         res.json(user);
//        })
// }

// const updateProfile = (req, res, db) => {
//     const { id, name, passion, image } = req.body;
//     db('profile')
//        .where({ id })
//        .update({ name, passion, image: `/uploads/${req.file.filename}` })
//        .then(user => {
//         res.json(user);
//        })
// }

function postProfile (req, res, db) {
    // const { image } = req.body;
    db('profile')
    .returning('*')
    .insert({ image:`/uploads/${req.file.filename}` })
    .then(response => {
        res.status(201).json(response)
    })
}




module.exports = {
    getProfile,
    // updateProfile,
    postProfile,
}