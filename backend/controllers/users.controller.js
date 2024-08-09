// get users 
function getUsers(req, res, db) {
    db.select('*').from('users')
        .then(users => {
            res.status(200).json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

// get users id
function getUsersId(req, res, db) {
    const { id } = req.params;
    db.select('*').from('users')
    .where({
        id: id
    })
    .then(user => {
        res.status(200).json(user);
    })
}

// update users
function updateUser(req, res, db) {
    const { id, name } = req.body;
    // const { id, name } = req.params;
    db('users')
       .where({ id })
       .update({ name })
       .then(user => {
          res.status(201).json(user);
       })
}

// delete users
function deleteUser(req, res, db) {
    // const { id } = req.body;
    const id = req.params.id;
    db('users')
        .where({ id })
        .del()
        .then(() => res.status(200).send('User deleted successfully')) 
        .catch(error => res.status(500).json({ error }));
}

// get users skill
 function getUserSkill(req, res, db) {
    const { id } = req.params;
    db.select("*").from('users').where({
        id: id
    })
    .then(user => {
        res.status(200).json(user)
    })
 }


module.exports = {
    getUsers,
    getUsersId,
    updateUser,
    deleteUser,
    getUserSkill, 
};

