// app.get("/users", (req, res) => {
//     db.select('*').from('users')
//         .then(users => {
//             res.json(users);
//         })
//         .catch(error => {
//             console.error(error);
//             res.status(500).json({ error: 'Internal Server Error' });
//         });
// });


const handleUsers = (req, res) => {
    db.select('*').from('users')
        .then(users => {
            res.json(users);
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
}

module.export = {
    handleUsers
}