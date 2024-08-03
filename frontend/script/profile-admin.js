const profileContainer = document.querySelector("#profile-container");
    	const profileImg = document.querySelector("#profile-image");
    	const profileContentContainer = document.querySelector("#profile-content-container");
    	const profileHeader = document.querySelector("#profile-header");
    	const profileIntro = document.querySelector("#profile-intro");
    	const profileEditBtn = document.querySelector("#profile-edit-icon");
    	const addSectionBtn = document.querySelector("#add-section");
    	const loader = document.querySelector(".loader");

    	// By Default name, passion is there you can edit this according to your name and passin


         function showProfile() {
              // console.log("Loading...");
         	profileContainer.style.display = "none";
         	loader.style.display = "block";

              let isLoaded = false;

                fetch("https://fullstack-profile-store-2.onrender.com/profile")
                  .then(res => res.json())
                  .then(users => {
                    if (users.length) {
                      users.forEach(user => {
                        profileHeader.textContent = user.name;
                        profileIntro.textContent = user.passion;
                        profileImg.src = user.image;
                        isLoaded = true; // Data loaded successfully
                      });
                    }
                  })
                  .finally(() => {
                    if (isLoaded) {
                    	profileContainer.style.display = "block";
                    	loader.style.display = "none"
                    }
                  });
            }


         showProfile()

    	fetch("https://fullstack-profile-store-2.onrender.com/users")
    	.then(res => res.json())
    	.then((users, i) => {
            // All skills container box    		
    		        const skillDiv = document.createElement("div");
    		        profileContainer.appendChild(skillDiv);
    		        skillDiv.textContent = "Skills";
    		        skillDiv.classList.add("skills-intro-style")

    		  users.forEach((user, i) => {
    		 	// One skill container box
    		 	      const skillContainer = document.createElement("div");
    		 	      profileContainer.appendChild(skillContainer);
    		 	      skillContainer.textContent = users[i].name;
    		 	      skillContainer.classList.add("skills-container");
                
    		 	const editSkillBtn = document.createElement("button");
                skillContainer.appendChild(editSkillBtn);
                editSkillBtn.textContent = "Edit"
                editSkillBtn.classList.add("edit-skills-btn-style")
                editSkillBtn.setAttribute("class", "edit-btns")

                editSkillBtn.addEventListener("click", () => {
                	 
                window.location = "edit-skills-section";
              })
    	})
    })

        profileEditBtn.addEventListener("click", () => {
        	window.location = "edit-profile";
        })

        addSectionBtn.addEventListener("click", () => {
        	window.location = "add-section";
        })
