let ContactComposition = new myApp.Composition();

ContactComposition.components = {
    "name": new myApp.Component("fieldName"),
    "email": new myApp.Component("fieldEmail"),
    "message": new myApp.Component("fieldMessage"),
    "form": new myApp.Component("form")
};
ContactComposition.events = {
    "name": {
        "blur": "validate"
    },
    "email": {
        "blur": "validate"
    },
    "message": {
        "blur": "validate"
    },
    "form": {
        "submit": "send"
    }
};

ContactComposition.animations = {
    "validate": function(component) {

        var isValid = this.animations["isValid"](component);
        this.animations["setInputState"](component,isValid);
    },
    "setInputState": function(component, okay) {
        if (okay) {
            component.removeClass("error");
            component.addClass("success");
        } else {
            component.removeClass("success");
            component.addClass("error");
        }
    },
    "isValid": function(component) {
        var el = component.element;

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
    },
    "allInputsValid": function() {
        var allValid = true;
        var inputs = [
            this.components["name"],
            this.components["email"],
            this.components["message"]
        ];

        var t = this;

        inputs.forEach(function(component,key) {
            var isValid = t.animations["isValid"](component);
            if(!isValid) {
                allValid = false;
            }
            t.animations["setInputState"](component, isValid);
        });

        return allValid;
    },
    "send": function() {
        if(this.animations["allInputsValid"].call(this)) {
            var xmlhttp = new XMLHttpRequest();

            var url = "send.php";

            var params = "name="+ this.components["name"].element.value +"&email="+ this.components["email"].element.value +"&message="+ encodeURIComponent(this.components["message"].element.value);
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
    }
};

ContactComposition.attachEvents();
