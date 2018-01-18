var allReports = []
var filteredCandidates = [];
var candidateInfo = document.querySelector(".candidateInfo");

fetch("http://localhost:3333/api/candidates")
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        createCandidateCard(data);
        allReports = data;
    })
    .catch(function (error) {
        console.warn("Please read the message", error);
    });



document.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-id")) {

        var idValue = event.target.getAttribute("data-id");
        localStorage.setItem("id", idValue);
    }
});

// rendering elements

function createCandidateCard(data) {

    for (var i = 0; i < data.length; i++) {

        var avatar = data[i].avatar;
        var name = data[i].name;
        var id = data[i].id;
        var email = data[i].email;

        var candidateCard = document.createElement("div");
        candidateCard.setAttribute("class", "card col-12 col-md-4 card");

        var candidateImage = document.createElement("img");
        candidateImage.setAttribute("class", "card-img-top img-circle");
        candidateImage.setAttribute("src", avatar || "http://style.anu.edu.au/_anu/4/images/placeholders/person.png");
        candidateImage.setAttribute("alt", "Card image cap");
        candidateCard.appendChild(candidateImage);

        var candidateCardBody = document.createElement("div");
        candidateCardBody.setAttribute("class", "card-body");
        candidateCard.appendChild(candidateCardBody);

        var candidateName = document.createElement("h5");
        var candidateNameText = document.createTextNode(name);
        candidateName.appendChild(candidateNameText);
        candidateName.setAttribute("class", "card-title");
        candidateName.setAttribute("data-id", id);
        candidateName.setAttribute("class", "candidatesLink");

        var candidateNameLink = document.createElement("a");
        candidateNameLink.setAttribute("href", "report.html");
        candidateNameLink.appendChild(candidateName);
        candidateCardBody.appendChild(candidateNameLink);

        var candidateEmail = document.createElement("p");
        var candidateEmailText = document.createTextNode(email);
        candidateEmail.appendChild(candidateEmailText);
        candidateName.setAttribute("class", "card-text");
        candidateCardBody.appendChild(candidateEmail);

        var main = document.querySelector(".candidateInfo")

        main.appendChild(candidateCard);
    }
}

// search
var search = document.querySelector("#search");

search.addEventListener('keyup', function (e) {
    filteredCandidates = [];

    var searchedCandidate = e.target.value.toLowerCase();
    allReports.map(function (candidate) {

        if (candidate.name.toLowerCase().includes(searchedCandidate)) {

            candidateInfo.innerHTML = "";
            filteredCandidates.push(candidate);
            createCandidateCard(filteredCandidates);
        }
    })
    if (filteredCandidates.length === undefined) {
        createCandidateCard(allReports);
    }
})



