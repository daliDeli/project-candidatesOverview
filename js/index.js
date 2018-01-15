
fetch("http://localhost:3333/api/candidates")
    .then(function (data) {
        return data.json();
    })
    .then(function (data) {
        candidatesData(data);
    })
    .catch(function (error) {
        console.warn("Please read the message", error);
    });


document.addEventListener("click", function (event) {
    if (event.target.hasAttribute("data-id")) {

        var idValue = event.target.getAttribute("data-id");
        console.log(idValue);
        localStorage.setItem("id", idValue);
    }

});


var candidatesInfo = [];

// search.addEventListener("keyup", function (event) {
//     var search = document.querySelector("#search");
//     var searchedValue = search.value;
//     console.log(searchedValue);
    
//     for (var i = 0; i < candidatesInfo.length; i++) {
//         var elementName = candidatesInfo[i].name;

//         if(candidate.name.include(searchedValue)){

//             var candidateCard = document.createElement("div");
//             candidateCard.setAttribute("class", "card col-12 col-md-4");
//             candidateCard.setAttribute("style", "width: 18rem");

//             var candidateImage = document.createElement("img");
//             candidateImage.setAttribute("class", "card-img-top");
//             candidateImage.setAttribute("src", elementAvatar);
//             candidateImage.setAttribute("alt", "Card iage cap");
//             candidateImage.setAttribute("style", "width: 12rem");
//             candidateImage.setAttribute("style", "height: 12rem");
//             candidateCard.appendChild(candidateImage);
//         }
        
//     }
// })

function createCandidateCard(){

    console.log(candidateName);
    var candidateCard = document.createElement("div");
    candidateCard.setAttribute("class", "card col-12 col-md-4");
    candidateCard.setAttribute("style", "width: 18rem");

    var candidateImage = document.createElement("img");
    candidateImage.setAttribute("class", "card-img-top");
    candidateImage.setAttribute("src", elementAvatar);
    candidateImage.setAttribute("alt", "Card iage cap");
    candidateImage.setAttribute("style", "width: 12rem");
    candidateImage.setAttribute("style", "height: 12rem");
    candidateCard.appendChild(candidateImage);


    var candidateCardBody = document.createElement("div");
    candidateCardBody.setAttribute("class", "card-body");
    candidateCard.appendChild(candidateCardBody);

    var candidateName = document.createElement("h5");
    var candidateNameText = document.createTextNode(elementName);
    candidateName.appendChild(candidateNameText);
    candidateName.setAttribute("class", "card-title");
    candidateName.setAttribute("data-id", elementId);
    candidateName.setAttribute("class", "candidatesLink");

    var candidateNameLink = document.createElement("a");
    candidateNameLink.setAttribute("href", "report.html");
    candidateNameLink.appendChild(candidateName);
    candidateCardBody.appendChild(candidateNameLink);

    var candidateEmail = document.createElement("p");
    var candidateEmailText = document.createTextNode(elementEmail);
    candidateEmail.appendChild(candidateEmailText);
    candidateName.setAttribute("class", "card-text");
    candidateCardBody.appendChild(candidateEmail);

    var main = document.querySelector(".candidateInfo")

    main.appendChild(candidateCard);
}

function candidatesData(data) {

    for (var i = 0; i < data.length; i++) {
        candidatesInfo[i] = data[i];

        var elementAvatar = data[i].avatar || "http://style.anu.edu.au/_anu/4/images/placeholders/person.png";
        var elementName = data[i].name;
        var elementEmail = data[i].email;
        var elementId = data[i].id;

        createCandidateCard();
        
    }
}



