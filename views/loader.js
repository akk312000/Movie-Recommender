"use strict";
$(document).ready(() => {
    $("#loader").hide();
    $("#trending, #trm, #nav-search, #movie-search, #show-search, #pagination").click(() => {
        $("#loader").show();
    });
});