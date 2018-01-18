
var id = localStorage.getItem("id");


var requestCandidate = $.ajax({
    url: "http://localhost:3333/api/candidates/" + id,
    method: 'GET',
});

requestCandidate.done(function (data) {

    var divImage = $("<div>");
    divImage.attr("class", "col-12 col-md-4");

    var image = $("<img>");
    image.attr({
        "src": data.avatar || "http://style.anu.edu.au/_anu/4/images/placeholders/person.png",
        "alt": "Candidate",
        "class": "divImage"
    })

    var divInfo = $("<div>");
    divInfo.attr("class", "col-12 col-md-6 all");

    var rowInfo = $("<div>");
    divInfo.attr("class", "row");

    var hName = $("<h5>");
    var candidatesName = data.name;
    
    hName.text("Name: " + candidatesName);


    var hEmail = $("<h5>");
    
    hEmail.text("Email: " + data.email);

    var hDateOfBirth = $("<h5>");
    var birthday = new Date(data.birthday).toDateString();
    hDateOfBirth.text("Date of birth: " + birthday);

    var hEducation = $("<h5>");
    hEducation.text("Education: " + data.education);

    divImage.append(image);
    divInfo.append(rowInfo);
    rowInfo.append(hName);
    rowInfo.append(hEmail);
    rowInfo.append(hDateOfBirth);
    rowInfo.append(hEducation);

    $(".candidatesName").prepend(candidatesName + "'s");
    $('.candidatesInfo').append(divImage);
    $('.candidatesInfo').append(divInfo);

})


$.ajax("http://localhost:3333/api/reports/", {
    type: 'GET',
    dataType: 'json',
    success: function (data) {

        var counter = 0;
        var reportData = {};
        var allCompaniesReports = [];
        for (var i = 0; i < data.length; i++) {
            var element = data[i];

            if (element.candidateId == id) {
                reportData = element;
                allCompaniesReports.push(reportData);
            } else {
                counter++;
            }

            if (counter === data.length) {
                var noReport = "<h2 >This candidate has no reports.<h2>"
                $(".candidatesReport").append(noReport);

            }
        }


        var table = $("<table class='table text-center'>")
            .append($("<thead>")
                .append($("<tr>")
                    .append($("<th scope='col'>")
                        .text("Company")
                    )
                    .append($("<th scope='col'>")
                        .text("Interview Date")
                    )
                    .append($("<th scope='col' colspan= 2>")
                        .text("Status")
                    )
                    .append($("<th scope='col'>")
                    )))



        // correct data for modal 
        $(document).on("click", "a", function (e) {
            var dateToOpenModal = e.target.getAttribute("data-date");
            var idToOpenModal = e.target.getAttribute("data-id");
            
            var correctCandidateData = {};

            data.map(function (candidate) {
                var correctDate = new Date(candidate.interviewDate).toLocaleString();
               
                if (  candidate.candidateId == idToOpenModal && correctDate == dateToOpenModal  ) {
                  
                    correctCandidateData = candidate;
                }
            })

            $(".modal-title").text(correctCandidateData.candidateName);
            $("#company").text(correctCandidateData.companyName);
            $("#interviewDate").text(correctCandidateData.interviewDate);
            $("#phase").text(correctCandidateData.phase);
            $("#status").text(correctCandidateData.status);
            $("#note").text(correctCandidateData.note);

        })


        // table for reports
        for (var i = 0; i < allCompaniesReports.length; i++) {
            var element = allCompaniesReports[i];
            var interviewDate = new Date(element.interviewDate).toLocaleString()

            $(table).append($("<tr>")
                .append($("<td>")
                    .text(element.companyName)
                )
                .append($("<td>")
                    .text(interviewDate)
                )
                .append($("<td>")
                    .text(element.status)
                )
                .append($("<td>")
                    .append($("<a>")
                        .attr({
                            "type": "button",
                            "data-toggle": "modal",
                            "data-target": "#modal",
                            "data-date": interviewDate,
                            "data-id": element.candidateId,
                            "href": '#modal'
                        }).append($("<i>")
                            .attr({
                                "class": "fa fa-eye",
                                "data-date": interviewDate,
                                "data-id": element.candidateId,

                            })))
                ))

            $(".candidatesReport").append(table);

        }
    },
    error: function () {
        console.log("ne radi")
    },
});





































