// get users 
const getUsers = (req, res, db) => {
    db.select('*').from('users')
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

// get users id
const getUsersId = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('users')
    .where({
        id: id
    })
    .then(user => {
        console.log(user);
        res.json(user);
    })
}

// update users
const updateUsers = (req, res, db) => {
    const { id, name } = req.body;
    db('users')
       .where({ id })
       .update({ name })
       .then(user => {
          res.json(user);
       })
}

// delete users
const deleteUsers = (req, res, db) => {
    const { id } = req.body;
    db('users')
        .where({ id })
        .del()
        .then(() => res.status(200).send('User deleted successfully'))
        .catch(error => res.status(500).json({ error }));
}

// get users skill
 const getUserSkill = (req, res, db) => {
    const { id } = req.params;
    db.select("*").from('users').where({
        id: id
    })
    .then(user => {
        console.log(user);
        res.json(user)
    })
 }

module.exports = {
    getUsers: getUsers,
    getUsersId: getUsersId,
    updateUsers: updateUsers,
    deleteUsers: deleteUsers,
    getUserSkill: getUserSkill 
}