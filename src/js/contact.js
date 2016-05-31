function validateInput(el) {
    var okay = false;
    switch (el.name) {
        case "name":
            if (el.value.length >= 4) {
                okay = true;
            }
            break;
        case "email":
            var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
            if(re.test(el.value)) {
                okay = true;
            }
            break;
        case "message":
            if (el.value.length >= 15) {
                okay = true;
            }
            break;
        default:
            okay = false;
            break;
    }

    return okay;
}

function allInputsValid(inputs) {
    var allValid = true;
    inputs.forEach(function(el,key) {
        var isValid = validateInput(el);
        if(!isValid) {
            allValid = false;
        }
        setInputState(el, isValid);
    });

    return allValid;
}

function setInputState(el, okay) {
    (okay)? el.className = "success": el.className = "error";
}

var inputs = [
    document.getElementById("fieldName"),
    document.getElementById("fieldEmail"),
    document.getElementById("fieldMessage")];

inputs.forEach(function(el,key) {
    el.onblur = function() {
        var isValid = validateInput(el);
        setInputState(el,isValid);
    }
});

document.getElementById("form").addEventListener("submit", function() {
    if(allInputsValid(inputs)) {
        var xmlhttp = new XMLHttpRequest();

        var url = "send.php";

        var params = "name="+ document.getElementById("fieldName").value +"&email="+ document.getElementById("fieldEmail").value +"&message="+ encodeURIComponent(document.getElementById("fieldMessage").value);
        xmlhttp.open("POST", url, true);

        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

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