const profileContainer = document.querySelector("#profile-container");
const profileImg = document.querySelector("#profile-image");
const profileContentContainer = document.querySelector(
  "#profile-content-container",
);
const profileHeader = document.querySelector("#profile-header");
const profileIntro = document.querySelector("#profile-intro");
const profileEditBtn = document.querySelector(".profile-edit-icon");
const addSectionBtn = document.querySelector("#add-section");
const loader = document.querySelector(".loader");

const uploadProfilePhoto = document.querySelector("#upload-profile-photo");

// profileEditBtn.addEventListener("click", () => {
//   const editPassionInput = document.createElement("input");
//   const editNameInput = document.createElement("input");
//   const updateBtn = document.createElement("button");
//   const closeUpdateBtn = document.createElement("button");
//   profileContentContainer.appendChild(editNameInput);
//   profileContentContainer.appendChild(editPassionInput);
//   profileContentContainer.appendChild(updateBtn);
//   profileContentContainer.appendChild(closeUpdateBtn);
//   updateBtn.textContent = "update";
//   closeUpdateBtn.textContent = "Close";
// });

fetch("https://fullstack-profile-store-2.onrender.com/profile")
  .then((res) => res.json())
  .then((profile) => {
    console.log(profile); // Log user data
    profileHeader.textContent = profile.name;
    profileIntro.textContent = profile.passion;
    profileImg.src = profile.image;

    profileEditBtn.addEventListener("click", () => {
      const editPassionInput = document.createElement("input");
      const editNameInput = document.createElement("input");
      const updateBtn = document.createElement("button");
      const closeUpdateBtn = document.createElement("button");
      profileContentContainer.appendChild(editNameInput);
      profileContentContainer.appendChild(editPassionInput);
      profileContentContainer.appendChild(updateBtn);
      profileContentContainer.appendChild(closeUpdateBtn);
      updateBtn.textContent = "update";
      closeUpdateBtn.textContent = "Close";

      updateBtn.addEventListener("click", () => {
        fetch(
          `https://fullstack-profile-store-2.onrender.com/profile/${profile.id}`,
          {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: editNameInput.value,
              passion: editPassionInput.value,
            }),
          },
        ).then((data) => {
          console.lo("Profile:", data);
          window.location.reload();
        });
      });
    });

    fetch(
      `https://fullstack-profile-store-2.onrender.com/profile/${profile.id}/skills`,
    )
      .then((res) => res.json())
      .then((skills) => {
        console.log(skills);
        const skillDiv = document.createElement("div");
        profileContainer.appendChild(skillDiv);
        skillDiv.textContent = "Skills";
        skillDiv.classList.add("skills-intro-style");

        skills.map((skill) => {
          console.log(skill);
          const skillContainer = document.createElement("div");
          profileContainer.appendChild(skillContainer);
          skillContainer.textContent = skill.skill;
          skillContainer.classList.add("skills-container");

          const editSkillBtn = document.createElement("button");
          skillContainer.appendChild(editSkillBtn);
          // editSkillBtn.textContent = "Edit";
          editSkillBtn.classList.add("edit-skills-btn-style");
          editSkillBtn.classList.add("edit-btns");

          const delSkillBtn = document.createElement("button");
          skillContainer.appendChild(delSkillBtn);
          delSkillBtn.textContent = "Delete";
          delSkillBtn.classList.add("edit-skills-btn-style");
          delSkillBtn.classList.add("del-btns");

          console.log("skill", skill, "profile", profile);
          delSkillBtn.addEventListener("click", () => {
            fetch(
              `https://fullstack-profile-store-2.onrender.com/profile/${profile.id}/skills/${skill.id}`,
              {
                method: "delete",
              },
            ).then(() => {
              window.location.reload();
            });
          });
        });
      });
  });

fetch("https://fullstack-profile-store-2.onrender.com/profile")
  .then((res) => res.json())
  .then((data) => {
    console.log("all profile:", data);
  });

// profileEditBtn.addEventListener("click", () => {
//   window.location = "/edit-profile";
// });

uploadProfilePhoto.addEventListener("click", () => {
  window.location = "/imageUpload";
});

addSectionBtn.addEventListener("click", () => {
  window.location = "/add-section";
});
