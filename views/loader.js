$(document).ready(function(){
    $("#loader").hide();
    $("#trending, #trm, #nav-search, #movie-search, #show-search, #pagination").click(function(){
        $("#loader").show();
    });
});