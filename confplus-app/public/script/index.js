//getting Data
const USERS_URL = "api/accounts";
const SCHEDULES_URL = "api/schedules";
const PRESENTERS_URL = "api/presenters";
const DATES_URL = "api/dates";
const LOCATIONS_URL = "api/locations";
// const PAPERS_URL = "api/informations";

// console.log("body");

//async methods
async function getUsers() {
    const response = await fetch(USERS_URL);
    const users = await response.json();
    return users;
}

async function getSchedules() {
    const response = await fetch(SCHEDULES_URL);
    const schedules = await response.json();
    return schedules;
}

async function addSchedule(schedule) {
    const response = await fetch(SCHEDULES_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule),
    });
    return await response.json();
}

async function getPresenters() {
    const response = await fetch(PRESENTERS_URL);
    const presenters = await response.json();
    return presenters;
}

async function getDates() {
    const response = await fetch(DATES_URL);
    const dates = await response.json();
    return dates;
}

async function getLocations() {
    const response = await fetch(LOCATIONS_URL);
    const locations = await response.json();
    return locations;
}

// async function getPapers() {
//     const response = await fetch(PAPERS_URL);
//     const papers = await response.json();
//     return papers;
// }

//login button
const loginBtn = document.querySelector("#loginButton");

document.addEventListener("DOMContentLoaded", async () => {
    // login validation and redirecting the user to the panel
    loginBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        loadPanel();
    });
});

async function displayUserInfo() {
    const id = localStorage.id;
    const users = await getUsers();
    const user = users.find((user) => user.id == id);
    const userName = document.querySelector(".userName");
    userName.innerHTML = `${user.first_name} ${user.last_name}`;
    return user;
}

//loading the panel
async function loadPanel() {
    //login information
    const email = document.querySelector("#loginEmail");
    const password = document.querySelector("#password");

    const users = await getUsers();
    const user = users.find(
        (user) => user.email === email.value && user.password === password.value
    );
    if (user) {
        if (user.role == "organizer") {
            localStorage.id = user.id;
            window.location.href = "/OrganizerPanel.html";
        } else if (user.role == "reviewer") {
            localStorage.id = user.id;
            window.location.href = "/ReviewerPanel.html";
        } else {
            localStorage.id = user.id;
            window.location.href = "/AuthorPanel.html";
        }
    } else {
        alert("Invalid email or password");
    }
}

//panel handling
if (window.location.pathname === "/OrganizerPanel.html") {
    document.addEventListener("DOMContentLoaded", async () => {
        displayUserInfo();
        const user = await displayUserInfo();
        const userLogo = document.querySelector(".userPicContainer");

        if (user.gender == "female") {
            userLogo.innerHTML = `<img src="./images/organizerFemaleLogo.png" alt="" class="userLogo" />`;
        } else {
            userLogo.innerHTML = `<img src="./images/organizerMaleLogo.png" alt="" class="userLogo" />`;
        }
    });

    loadSchedules();

    const searchBar = document.querySelector("#search");
    searchBar.addEventListener("keyup", (e) => {
        const searchString = e.target.value.toLowerCase();
        const cards = document.querySelectorAll(".scheduleCardBackGround");
        cards.forEach((card) => {
            const title = card
                .querySelector(".scheduleTitle")
                .innerText.toLowerCase();
            if (title.includes(searchString)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });

    const sortButton = document.querySelector("#sort");
    //create an event to sort the cards based on the date, location, or title
    sortButton.addEventListener("change", async (e) => {
        const schedules = await getSchedules();
        const schedulesContainer = document.querySelector(".panelView");
        schedulesContainer.innerHTML = "";
        if (e.target.value == "date") {
            schedules.sort((a, b) => {
                return a.date - b.date;
            });
            displayCards(schedules);
        } else if (e.target.value == "location") {
            schedules.sort((a, b) => {
                return a.location - b.location;
            });
            displayCards(schedules);
        } else {
            schedules.sort((a, b) => {
                return a.title - b.title;
            });
            displayCards(schedules);
        }
    });
}

//adding a schedule to the panel page
async function loadSchedules() {
    const schedules = await getSchedules();
    const schedulesContainer = document.querySelector(".panelView");
    // schedulesContainer.innerHTML = "";
    schedules.forEach((schedule) => {
        schedulesContainer.innerHTML += scheduleTemplate(schedule);
    });
}

async function displayCards(schedules) {
    const schedulesContainer = document.querySelector(".panelView");

    schedules.forEach((schedule) => {
        schedulesContainer.innerHTML += scheduleTemplate(schedule);
    });
}

//schedule template
function scheduleTemplate(schedule) {
    let sessionHTML = "";
    let presenterHTML = "";
    let i = 0;

    schedule.sessions.forEach((session) => {
        presenterHTML = "";

        session.presenters.forEach((presenter) => {
            presenterHTML += `<div class="presenter">
            <p class="presenterName">${presenter.fname} ${presenter.lname}</p>
            <p class="presenterTitle">${presenter.special}</p>
          </div>`;
        });

        sessionHTML += `<div class="session">
        <h4 class="sessionNumber">Session :${(i += 1)}</h4>
        <div class="timeToContainer">
          <h4 class="toAndFromTime">Time:</h4>
          <p class="fromTimeTitle">from:</p>
          <p class="fromTime">${session.from}</p>
          <p class="toTimeTitle">to:</p>
          <p class="toTime">${session.to}</p>
        </div>
        <h4 class="presentersTitle">Presenters:</h4>
        <div class="presentersContainer">
          <!-- presenters go here -->
            ${presenterHTML}
        </div>
      </div>`;
    });

    return `
    <div class="scheduleCardBackGround">
    <div class="scheduleCard">
      <h2 class="scheduleTitle">${schedule.title}</h2>
      <p class="scheduleBrief">${schedule.brief}</p>
      <h3 class="locationAndTime">Location & Time:</h3>
      <div class="locationContainer">
        <img src="./images/location-pin.png" alt="" class="locationPin" />
        <p class="location">${schedule.location}</p>
      </div>
      <div class="dateContainer">
        <img src="./images/calendar.png" alt="" class="calendarPin" />
        <p class="date">${schedule.date}</p>
      </div>
      <h3 class="sessions">Sessions:</h3>
      <div class="sessionsContainer">
        <!-- sessions go here -->
        ${sessionHTML}
      </div>

      <div class="scheduleButtonContainer">
        <div id="editScheduleBackground" class="buttonBackground">
          <a href="" id="editSchedule">Edit</a>
        </div>

        <div id="deleteScheduleBackground" class="buttonBackground">
          <a href="" id="deleteSchedule">Delete</a>
        </div>
      </div>
    </div>
  </div>
    `;
}

//adding a schedule
if (window.location.pathname === "/addSchedulerForm.html") {
    document.addEventListener("DOMContentLoaded", async () => {
        displayUserInfo();

        const presenters = await getPresenters();
        const locations = await getLocations();
        const dates = await getDates();

        const presentersContainer = document.querySelector(".choosePresenter");
        const locationsContainer = document.querySelector("#selectLocation");
        const datesContainer = document.querySelector("#selectDate");

        presenters.forEach((presenter) => {
            const presenterName = `${presenter.fname} ${presenter.lname}`;
            presentersContainer.innerHTML += `<option value="${presenterName}">${presenterName}</option>`;
        });

        locations.forEach((location) => {
            locationsContainer.innerHTML += `<option value="${location.locationName}">${location.locationName}</option>`;
        });

        dates.forEach((date) => {
            datesContainer.innerHTML += `<option value="${date.date}">${date.date}</option>`;
        });

        const sessionNumberSelect = document.querySelector("#noOfSessions");
        sessionNumberSelect.addEventListener("change", (e) => {
            const selectedSessions = parseInt(e.target.value);
            const existingSessions =
                document.querySelectorAll(".editorSession").length;

            if (selectedSessions > existingSessions) {
                // Add more session elements
                for (let i = existingSessions + 1; i <= selectedSessions; i++) {
                    generateSessionHTML(i);
                }
            } else if (selectedSessions < existingSessions) {
                // Remove extra session elements
                const sessionsToRemove = existingSessions - selectedSessions;
                const sessionElements =
                    document.querySelectorAll(".editorSession");
                for (let i = existingSessions - 1; i >= selectedSessions; i--) {
                    sessionElements[i].remove();
                }
            }
        });

        // const presentersNumberSelect = document.querySelector("#noOfPresenters");
        // presentersNumberSelect.addEventListener("change", (e) => {
        //     const selectedPresenters = parseInt(e.target.value);
        //     const existingPresenters = document.querySelectorAll('.editorPresenter').length;

        //     if (selectedPresenters > existingPresenters) {
        //         // Add more presenter elements
        //         for (let i = existingPresenters + 1; i <= selectedPresenters; i++) {
        //             generatePresenterHTML(i);
        //         }
        //     }

        //     else if (selectedPresenters < existingPresenters) {
        //         // Remove extra presenter elements
        //         const presentersToRemove = existingPresenters - selectedPresenters;
        //         const presenterElements = document.querySelectorAll('.editorPresenter');
        //         for (let i = existingPresenters - 1; i >= selectedPresenters; i--) {
        //             presenterElements[i].remove();
        //         }
        //     }

        // });

        const editorSessionsContainer = document.querySelector(
            ".editorSessionsContainer"
        );
        // Add event listener to a parent element that exists on the page at the time of the initial page load
        editorSessionsContainer.addEventListener("change", (e) => {
            // Check if the target of the event is the #noOfPresenters select element
            if (e.target && e.target.id === "noOfPresenters") {
                const selectedPresenters = parseInt(e.target.value);
                const existingPresenters = e.target
                    .closest(".editorSession")
                    .querySelectorAll(".editorPresenter").length;

                if (selectedPresenters > existingPresenters) {
                    // Add more presenter elements
                    for (
                        let i = existingPresenters + 1;
                        i <= selectedPresenters;
                        i++
                    ) {
                        generatePresenterHTML(i);
                    }
                } else if (selectedPresenters < existingPresenters) {
                    // Remove extra presenter elements
                    const presentersToRemove =
                        existingPresenters - selectedPresenters;
                    const presenterElements = e.target
                        .closest(".editorSession")
                        .querySelectorAll(".editorPresenter");
                    for (
                        let i = existingPresenters - 1;
                        i >= selectedPresenters;
                        i--
                    ) {
                        presenterElements[i].remove();
                    }
                }
            }
        });

        const submitBtn = document.querySelector("#submitSchedule");
    });
}

async function generateSessionHTML(index) {
    const sessionHTML = document.querySelector(".editorSessionsContainer");
    const presentersHTML = `
    <div class="editorPresenter">
        <h3>Presenter: <span class="thePresenterNumber">1</span></h3>
      
        <div class="editorInputContainer">
            <label for="choosePresenter">Choose a presenter:</label>
            <select name="choosePresenter" id="choosePresenter" class="choosePresenter">
            <!-- presenters list -->

            </select>
        </div>
    </div>`;

    sessionHTML.innerHTML += `
        <div class="editorSession">
        <h3 class="theSessionTitle">Session: <span class="theSessionNumber">${index}</span></h3>

        <div class="fromAndToContainers">
          <div class="editorInputContainer">
            <label for="scheduleFromTime">From:</label>
            <input type="time" id="scheduleFromTime" />
          </div>

          <div class="editorInputContainer">
            <label for="scheduleToTime">To:</label>
            <input type="time" id="scheduleToTime" />
          </div>  
        </div>

        
        <div class="presenterTitleContainer">
          <h3 class="presentersHeader">Presenters:</h3>
          <div class="editorInputContainer">
            <label for="noOfPresenters"
              >Select the number of presenters:</label
            >
            <select name="noOfPresenters" id="noOfPresenters">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
        </div>

        <div class="editorPresentersContainer">
          <!-- presenters go here -->
          ${presentersHTML}
        </div>

      </div>
        
        `;
}

async function generatePresenterHTML(index) {
    const presentersHTML = document.querySelector(".editorPresentersContainer");

    presentersHTML.innerHTML += `
    
    <div class="editorPresenter">
        <h3>Presenter: <span class="thePresenterNumber">${index}</span></h3>
      
        <div class="editorInputContainer">
            <label for="choosePresenter_${index}">Choose a presenter:</label>
            <select name="choosePresenter" id="choosePresenter_${index}" class="choosePresenter">
            <!-- presenters list -->
  
            </select>
        </div>
    </div>
    
    
    `;
}

if (window.location.pathname === "/ReviewerPanel.html") {
    document.addEventListener("DOMContentLoaded", async () => {
        displayUserInfo();
        const user = await displayUserInfo();
        const userLogo = document.querySelector(".userPicContainer");

        if (user.gender == "female") {
            userLogo.innerHTML = `<img src="./images/reviewerFemaleLogo.png" alt="" class="userLogo" />`;
        } else {
            userLogo.innerHTML = `<img src="./images/reviewerMaleLogo.png" alt="" class="userLogo" />`;
        }
    });
}

function paperTemplete(paper) {
    let paperAuthors = "";
    let i = 0;
    paper.authors.forEach((author) => {
        paperAuthors += `
        <div class="author">
          <p class ="authorNumber"> Author ${i + 1}</p>
          <p class ="paperAuthourName"> ${author.firstName} ${
            author.lastName
        }</p>
          <p class="paperAuthorEmail">  ${author.email}  </p>
          <p class ="paperAffilition">  ${author.affiliation}</p>
        </div>
        `;
        i++;
    });

    return `
    <div class="scheduleCardBackGround">
    <div class="scheduleCard">
      <h2 class="paperTitle">${paper.title}</h2>
      <h3 class="paperAbstractTitle">Abstract:</h3>
      <p class="paperAbstract">${paper.abstract} </p>
      <h3 class="paperAuthours">Authors:</h3>
        ${paperAuthors}
      </div>
    </div>
    
    `;
}

async function displayPapers() {
    const papers = await getPapers();
    const papersContainer = document.querySelector(".panelView");

    papers.forEach((paper) => {
        papersContainer.innerHTML += paperTemplete(paper);
    });
}


if (window.location.pathname === "/AuthorPanel.html") {
    document.addEventListener("DOMContentLoaded", async () => {
        displayUserInfo();
        const user = await displayUserInfo();
        const userLogo = document.querySelector(".userPicContainer");

        if (user.gender == "female") {
            userLogo.innerHTML = `<img src="./images/authorFemaleLogo.png" alt="" class="userLogo" />`;
        } else {
            userLogo.innerHTML = `<img src="./images/authorMaleLogo.png" alt="" class="userLogo" />`;
        }

        const papers = await getPapers();
        console.log(papers);

    });
}

if (window.location.pathname === "/index.html") {
    document.addEventListener("DOMContentLoaded", async () => {
        
    });
}



