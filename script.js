const form = document.getElementById("jobForm");
const jobList = document.getElementById("jobList");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

let editCard = null;

/* Default jobs */
const defaultJobs = [
    {
        title: "Frontend Developer",
        company: "TechNova",
        location: "Bangalore",
        description: "React developer with 2+ years experience."
    },
    {
        title: "Backend Developer",
        company: "CodeCraft",
        location: "Hyderabad",
        description: "Node.js and MongoDB developer required."
    }
];

window.onload = function () {
    defaultJobs.forEach(job => {
        createJobCard(job.title, job.company, job.location, job.description);
    });
};

/* Form Submit */
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const title = document.getElementById("jobTitle").value;
    const company = document.getElementById("companyName").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    if (editCard) {
        editCard.querySelector("h3").textContent = title;
        editCard.querySelector(".company").textContent = company;
        editCard.querySelector(".location").textContent = location;
        editCard.querySelector(".description").textContent = description;
        editCard = null;
    } else {
        createJobCard(title, company, location, description);
    }

    form.reset();
});

/* Create Card */
function createJobCard(title, company, location, description) {
    emptyMessage.style.display = "none";

    const card = document.createElement("div");
    card.classList.add("job-card");

    card.innerHTML = `
        <h3>${title}</h3>
        <p class="company"><strong>Company:</strong> ${company}</p>
        <p class="location"><strong>Location:</strong> ${location}</p>
        <p class="description">${description}</p>
        <div class="card-buttons">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    card.querySelector(".delete-btn").addEventListener("click", function () {
        card.remove();
        if (document.querySelectorAll(".job-card").length === 0) {
            emptyMessage.style.display = "block";
        }
    });

    card.querySelector(".edit-btn").addEventListener("click", function () {
        document.getElementById("jobTitle").value = title;
        document.getElementById("companyName").value = company;
        document.getElementById("location").value = location;
        document.getElementById("description").value = description;
        editCard = card;
    });

    jobList.appendChild(card);
}

/* Live Search */
searchInput.addEventListener("keyup", function () {
    const value = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".job-card");

    cards.forEach(card => {
        card.style.display = card.textContent.toLowerCase().includes(value)
            ? "block"
            : "none";
    });
});