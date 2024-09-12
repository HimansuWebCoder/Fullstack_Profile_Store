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
// By Default name, passion/profession is there you can edit this according to your name and passion/profession

function showProfile() {
  // console.log("Loading...");
  // profileContainer.style.display = "none";
  // loader.style.display = "block";

  let isLoaded = false;

  fetch("https://fullstack-profile-store-2.onrender.com/profile")
    .then((res) => res.json())
    .then((users) => {
      console.log(users);
      console.log(users);
      console.log(users.image);
      profileHeader.textContent = users.name;
      profileIntro.textContent = users.passion;
      profileImg.src = users.image;

      fetch(
        `https://fullstack-profile-store-2.onrender.com/profile/${users.id}/skills`,
      )
        .then((res) => res.json())
        .then((skills) => {
          skills.map((skill) => {
            // console.log(skill);
             const skillDiv = document.createElement("div");
            profileContainer.appendChild(skillDiv);
            skillDiv.textContent = "Skills";
            skillDiv.classList.add("skills-intro-style");

              // One skill container box
              const skillContainer = document.createElement("div");
              profileContainer.appendChild(skillContainer);
              skillContainer.textContent = skill.skill;
              skillContainer.classList.add("skills-container");

              const editSkillBtn = document.createElement("button");
              skillContainer.appendChild(editSkillBtn);
              editSkillBtn.textContent = "Edit";
              editSkillBtn.classList.add("edit-skills-btn-style");
              editSkillBtn.setAttribute("class", "edit-btns");

              const delSkillBtn = document.createElement("button");
              skillContainer.appendChild(delSkillBtn);
              delSkillBtn.textContent = "Delete";
              delSkillBtn.classList.add("edit-skills-btn-style");
              delSkillBtn.setAttribute("class", "del-btns");
        });
    });
  // .finally(() => {
  //   if (isLoaded) {
  //     profileContainer.style.display = "block";
  //     loader.style.display = "none";
  //   }
  // });

  //   fetch("https://fullstack-profile-store-2.onrender.com/view")
  //     .then((res) => res.json())
  //     .then((users) => {
  //       console.log(users[users.length - 1].image);
  //       // profileImg.src = users[users.length-1].image;
  //       // profileImg.src = '/' + users[users.length-1].image;
  //       profileImg.src = users[users.length - 1].image;
  //     })
  //     .finally(() => {
  //       if (isLoaded) {
  //         profileContainer.style.display = "block";
  //         loader.style.display = "none";
  //       }
  //     });
}

showProfile();

// fetch("https://fullstack-profile-store-2.onrender.com/users")
//   .then((res) => res.json())
//   .then((users, i) => {
//     // All skills container box
//     const skillDiv = document.createElement("div");
//     profileContainer.appendChild(skillDiv);
//     skillDiv.textContent = "Skills";
//     skillDiv.classList.add("skills-intro-style");

//     users.forEach((user, i) => {
//       // One skill container box
//       const skillContainer = document.createElement("div");
//       profileContainer.appendChild(skillContainer);
//       skillContainer.textContent = users[i].name;
//       skillContainer.classList.add("skills-container");

//       const editSkillBtn = document.createElement("button");
//       skillContainer.appendChild(editSkillBtn);
//       editSkillBtn.textContent = "Edit";
//       editSkillBtn.classList.add("edit-skills-btn-style");
//       editSkillBtn.setAttribute("class", "edit-btns");

//       const delSkillBtn = document.createElement("button");
//       skillContainer.appendChild(delSkillBtn);
//       delSkillBtn.textContent = "Delete";
//       delSkillBtn.classList.add("edit-skills-btn-style");
//       delSkillBtn.setAttribute("class", "del-btns");

//       editSkillBtn.addEventListener("click", () => {
//         window.location.href = `skill_edit/${user.id}/edit`;
//       });

//       delSkillBtn.addEventListener("click", () => {
//         window.location.href = `skill_delete/${user.id}/delete`;
//       });
//     });
//   });

profileEditBtn.addEventListener("click", () => {
  window.location = "/edit-profile";
});

uploadProfilePhoto.addEventListener("click", () => {
  window.location = "/imageUpload";
});

addSectionBtn.addEventListener("click", () => {
  window.location = "/add-section";
});
