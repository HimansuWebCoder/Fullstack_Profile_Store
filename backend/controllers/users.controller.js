// // get users 
// function getUsers(req, res, db) {
//     db.select('*').from('users')
//         .then(users => {
//             res.status(200).json(users);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// }

// // get users id
// function getUsersId(req, res, db) {
//     const { id } = req.params;
//     db.select('*').from('users')
//     .where({
//         id: id
//     })
//     .then(user => {
//         res.status(200).json(user);
//     })
// }

// // update users
// function updateUsers(req, res, db) {
//     const { id, name } = req.body;
//     db('users')
//        .where({ id })
//        .update({ name })
//        .then(user => {
//           res.status(201).json(user);
//        })
// }

// // delete users
// function deleteUsers(req, res, db) {
//     const { id } = req.body;
//     db('users')
//         .where({ id })
//         .del()
//         .then(() => res.status(200).send('User deleted successfully'))
//         .catch(error => res.status(500).json({ error }));
// }

// // get users skill
//  function getUserSkill(req, res, db) {
//     const { id } = req.params;
//     db.select("*").from('users').where({
//         id: id
//     })
//     .then(user => {
//         res.status(200).json(user)
//     })
//  }

// module.exports = {
//     getUsers,
//     getUsersId,
//     updateUsers,
//     deleteUsers,
//     getUserSkill, 
// };

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
function getUserById(req, res, db) {
    const { id } = req.params;
    db.select('*').from('users')
        .where({ id })
        .then(user => {
            if (user.length) {
                res.status(200).json(user[0]);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

// update users
function updateUser(req, res, db) {
    const { id } = req.params;
    const { name } = req.body;

    db('users')
        .where({ id })
        .update({ name })
        .then(updatedRows => {
            if (updatedRows) {
                res.status(200).json({ message: 'User updated successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

// delete users
function deleteUser(req, res, db) {
    const { id } = req.params;

    db('users')
        .where({ id })
        .del()
        .then(deletedRows => {
            if (deletedRows) {
                res.status(200).json({ message: 'User deleted successfully' });
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

// get user's skill
function getUserSkill(req, res, db) {
    const { id } = req.params;

    db.select('*').from('skills').where({ user_id: id })
        .then(skills => {
            if (skills.length) {
                res.status(200).json(skills);
            } else {
                res.status(404).json({ error: 'Skills not found for user' });
            }
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

module.exports = {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserSkill,
};
