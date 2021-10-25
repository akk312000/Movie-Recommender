$(document).ready(() => {
    'use strict';
    $("#loader").hide();
    $("#trending, #trm, #nav-search, #movie-search, #show-search, #pagination").click(() => {
        $("#loader").show();
    });
});