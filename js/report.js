
var id = localStorage.getItem("id");


var requestCandidate = $.ajax({
    url: "http://localhost:3333/api/candidates/" + id,
    method: 'GET',
});

requestCandidate.done(function (data) {
    console.log(data);

    var divImage = $("<div>");
    divImage.attr("class", "col-12 col-md-4");

    var image = $("<img>");
    image.attr({
        "src": data.avatar ||  "http://style.anu.edu.au/_anu/4/images/placeholders/person.png",
        "alt": "Candidate"
    })

    var divInfo = $("<div>");
    divInfo.attr("class", "col-12 col-md-8");

    var rowInfo = $("<div>");
    divInfo.attr("class", "row");

    var hName = $("<h5>");
    var candidatesName = data.name;
    hName.attr("class", "col-12 col-md-6");
    hName.text("Name: " + candidatesName);


    var hEmail = $("<h5>");
    hEmail.attr("class", "col-12 col-md-6");
    hEmail.text("Email: " + data.email);

    var hDateOfBirth = $("<h5>");
    hDateOfBirth.attr("class", "col-12 col-md-6");
    hDateOfBirth.text("Date of birth: " + data.birthday);

    var hEducation = $("<h5>");
    hEducation.attr("class", "col-12 col-md-6");
    hEducation.text("Education: " + data.education);

    divImage.append(image);
    divInfo.append(rowInfo);
    rowInfo.append(hName);
    rowInfo.append(hEmail);
    rowInfo.append(hDateOfBirth);
    rowInfo.append(hEducation);

    $("h1").prepend(candidatesName + "'s")

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
        console.log(reportData);

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

        for (var i = 0; i < allCompaniesReports.length; i++) {
            var element = allCompaniesReports[i];
            console.log(element);

            $(table).append($("<tr>")
                .append($("<td>")
                    .text(element.companyName)
                )
                .append($("<td>")
                    .text(element.interviewDate)
                )
                .append($("<td>")
                    .text(element.status)
                )
                .append($("<td>")
                    .html("<a data-toggle='modal' href='#modal'><i class='fa fa-eye' aria-hidden='true'></i></a>")
                ))

            $(".candidatesReport").append(table);

        }

        $(document).on("click", "a", function () {
            $(".modal-title").text(element.candidateName);
            $("#company").text(element.companyName);
            $("#interviewDate").text(element.interviewDate);
            $("#phase").text(element.phase);
            $("#status").text(element.status);
            $("#note").text(element.note);

        })
    },
    error: function () {
        console.log("ne radi")
    },
});






































