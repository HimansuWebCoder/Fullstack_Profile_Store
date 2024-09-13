const db = require("../config/db");

// async way
// const postSkillsModel = async (profileId, skill) => {
//     try {
//         const result = await db("skills")
//             .insert({ profile_id: profileId, skill: skill })
//             .returning("*");
//         console.log("postSkillsModel result:", result);
//     } catch (err) {
//         console.error("Error in postSkillsModel:", err);
//         throw err;
//     }
// };

// sync way
// POST Skills_Model
const postSkillsModel = (profileId, skill) => {
    return db("skills")
        .insert({ profile_id: profileId, skill: skill })
        .returning("*")
        .then((result) => {
            console.log("postSkillsModel result:", result);
            return result;
        })
        .catch((err) => {
            console.error("Error in postSkillsModel:", err.message || err);
            throw err;
        });
};

// GET Skills_Model
const getSkillsModel = (profileId) => {
    return db("skills").where({ profile_id: profileId }).select("*");
};

// DELETE Skills_Model
const deleteSkillsModel = (skillId, profileId) => {
    return db("skills")
        .where({ id: skillId, profile_id: profileId })
        .del()
        .returning("*");
};

module.exports = {
    getSkillsModel,
    deleteSkillsModel,
    postSkillsModel,
};
