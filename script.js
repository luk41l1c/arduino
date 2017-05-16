window.onload = function () {
    var dugmeNapred = document.querySelector("#napred");
    dugmeNapred.addEventListener("click", Napred);

    var dugmeLevo = document.querySelector("#levo");
    dugmeLevo.addEventListener("click", Levo);

    var dugmeDesno = document.querySelector("#desno");
    dugmeDesno.addEventListener("click", Desno);

    var dugmeNazad = document.querySelector("#nazad");
    dugmeNazad.addEventListener("click", Nazad);

    var dugmeReset = document.querySelector("#reset");
    dugmeReset.addEventListener("click", Reset);
}

function AjaxZahtev(options, callback) {
    //alert(options.metod+options.putanja+options.sadrzaj+callback)
    var req = new XMLHttpRequest();
    req.open(options.metod, options.putanja, true);
    req.addEventListener("load", function() {
        if (req.status < 400) {
            callback(req.responseText);
        }
        else {
            callback(new Error("Request failed: " + req.statusText));
        }
    });
    req.addEventListener("error", function() {
        callback(new Error("Network error"));
    });
    req.send(options.sadrzaj || null);
}

function odgovorRobota(odgovor) {
    //alert(odgovor);
}

function Napred() {
    document.querySelector("#status").innerHTML = "Status: napred";
    //var komanda = document.querySelector("#komanda").value;
    var options = {};
    //options.putanja = "hghjhgjh";
    options.metod = "post";
    sadrzaj = {
        zadata_komanda : "1"
    };
    options.sadrzaj = JSON.stringify(sadrzaj);
    AjaxZahtev(options, odgovorRobota);
}

function Levo() {
    document.querySelector("#status").innerHTML = "Status: levo";   
    //var komanda = document.querySelector("#komanda").value;
    var options = {};
    //options.putanja = "hghjhgjh";
    options.metod = "post";
    sadrzaj = {
        zadata_komanda : "2"
    };
    options.sadrzaj = JSON.stringify(sadrzaj);
    AjaxZahtev(options, odgovorRobota);
}

function Desno() {
    document.querySelector("#status").innerHTML = "Status: desno";
    //var komanda = document.querySelector("#komanda").value;
    var options = {};
    //options.putanja = "hghjhgjh";
    options.metod = "post";
    sadrzaj = {
        zadata_komanda : "3"
    };
    options.sadrzaj = JSON.stringify(sadrzaj);
    AjaxZahtev(options, odgovorRobota);
}

function Nazad() {
    document.querySelector("#status").innerHTML = "Status: nazad";
    //var komanda = document.querySelector("#komanda").value;
    var options = {};
    //options.putanja = "hghjhgjh";
    options.metod = "post";
    sadrzaj = {
        zadata_komanda : "4"
    };
    options.sadrzaj = JSON.stringify(sadrzaj);
    AjaxZahtev(options, odgovorRobota);
}

function Reset() {
    document.querySelector("#status").innerHTML = "Status: reset";
    //var komanda = document.querySelector("#komanda").value;
    var options = {};
    //options.putanja = "hghjhgjh";
    options.metod = "post";
    sadrzaj = {
        zadata_komanda : "0"
    };
    options.sadrzaj = JSON.stringify(sadrzaj);
    AjaxZahtev(options, odgovorRobota);
}