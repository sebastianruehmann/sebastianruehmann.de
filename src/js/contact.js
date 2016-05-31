function validate(el, length, email) {
    var okay = false;
    if(!email) {
        if (el.value.length >= length) {
            okay = true;
        }
    } else {
        if(validateEmail(el.value)) {
            okay = true;
        }
    }
    (okay)? el.className = "success": el.className = "error";

    return okay;
}

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

var inp = document.getElementById("form").childNodes;

inp[1].onblur = function() {validate(this,4);};
inp[3].onblur = function() {validate(this,5,true);};
inp[4].onblur = function() {validate(this,15);};

document.getElementById("form").addEventListener("submit", function() {
    if(validate(inp[1], 4) && validate(inp[3],5,true) && validate(inp[4],15)) {
        var xmlhttp = new XMLHttpRequest();

        var url = "send.php";
        var params = "name="+ inp[1].value +"&email="+ inp[3].value +"&message="+ encodeURIComponent(inp[4].value);
        xmlhttp.open("POST", url, true);

        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xmlhttp.setRequestHeader("Content-length", params.length);
        xmlhttp.setRequestHeader("Connection", "close");

        xmlhttp.onreadystatechange = function (aEvt) {
            if (xmlhttp.readyState == 4) {
                if(xmlhttp.status == 200) {
                    if (xmlhttp.responseText == "success") {
                        updateNotice("Message sent!");
                    } else if(/h4ck0rz/.test(xmlhttp.responseText)) {
                        updateNotice("Nice try, but I would like to get a useful message!");
                    } else {
                        updateNotice("Problem occured while processing your message!");
                    }
                } else {
                    updateNotice("Problem occured while sending message: "+ xmlhttp.status +"!");
                }
            }
        };

        xmlhttp.send(params);

        function updateNotice(msg) {
            var a = setInterval(function() {
                if(document.getElementById("sending_loader")) {
                    clearInterval(a);
                    document.getElementById("sending_loader").remove();
                    document.getElementById("sending").innerHTML = msg;
                }
            }, 10);
        }

        document.getElementById("form").className = "sent";

        setTimeout(function() {
            document.getElementById("form_wrapper").innerHTML = '' +
            '<div class="loader" id="sending_loader"> ' +
            '<div class="cube"> ' +
            '<div class="face face_0"></div> ' +
            '<div class="face face_1"></div> ' +
            '<div class="face face_2"></div> ' +
            '<div class="face face_3"></div> ' +
            '<div class="face face_4"></div> ' +
            '<div class="face face_5"></div> ' +
            '<div class="face face_6"></div> ' +
            '</div> ' +
            '</div>' +
            '<div class="loaderprogress" id="sending">Sending...</div>';
        }, 800);
    }

    event.preventDefault();
    return false;
});