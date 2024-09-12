const db = require("../config/db");

const postSkillsModel = (profileId, skill) => {
    return db("skills")
        .insert({ profile_id: profileId, skill: skill })
        .returning("*")
        .then((result) => {
            console.log(result);
        });
};

const getSkillsModel = (profileId) => {
    return db("skills").where({ profile_id: profileId }).select("*");
};

const deleteSkillsModel = (skillId, profileId) => {
    return db("skills")
        .where({ id: skillId, profile_id: profileId })
        .del()
        .returning("*");
};

module.exports = {
    postSkillsModel,
    getSkillsModel,
    deleteSkillsModel,
};
