
var id = localStorage.getItem("id");

fetch("http://localhost:3333/api/candidates/" + id) 
.then(function(data) {
    return data.json();
})
.then(function(data){
    candidateReportData(data);
})
.catch(function(error) {
    console.warn("Please read the message", error);
});

function candidateReportData(data){
    console.log(data);    
}