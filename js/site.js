$(document).ready(function() {

    $(window).on('scroll', function () {
        var scrollTop = $(window).scrollTop();
        if (scrollTop > 30) {
            $('#header').stop().animate({"height": "60px"}, 250);
        }
        else {
            $('#header').stop().animate({"height": "90px"}, 250);
        }
    });

    $('.menu-button').click(function () {
        $('.nav-menu').toggle();
    });

    $('.nav-menu-item a[href^="#"]').click(function(e) {
         scrollToSection(this.hash);
        $('.nav-menu-item a[href^="#"]').css('color', '#234a73');
        $(this).css('color', '#ffb40c');
        if ($(window).width() < 992) {
            $('.nav-menu').css('display', 'none');
        }
         e.preventDefault();
         return false;
    });

    $("#send_email").click(function() {
        var params = getParams(),
            msgElement =$("#message");
        if(params) {
            msgElement.text("Sending Message, Please wait...").css("color", "grey");
        } else {
            msgElement.text("Fill all fields, please.").css("color", "red");
            return;
        }
        var service_id = 'gmail',
            template_id = 'email_from_website_inn';
        emailjs.send(service_id, template_id, params)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                msgElement.empty();
                $(".popup").css("display", "block");
            }, function(error) {
                console.log('FAILED...', error);
            });
    });

    $("#close-popup").click(function () {
        $(".popup").css("display", "none");
        $("#name").val("");
        $("#email").val("");
        $("#msg-content").val("");
    });

});



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())) {
        return email;
    } else {
        $("#email").addClass("red-borders");
        return false;
    }
}

function getParams() {
    var name = setErrorStyleAndReturnVal("#name"),
        email = setErrorStyleAndReturnVal("#email"),
        text = setErrorStyleAndReturnVal("#msg-content");
    email = validateEmail(email);
    if(!name || !email || !text) {
        return false;
    } else {
        return {
            from_name: name,
            reply_to: email,
            message_html: text
        };
    }
}

function setErrorStyleAndReturnVal(elClass) {
    var el = $(elClass);
    var value = el.val().trim();
    if(!value) {
        el.addClass("red-borders");
    } else {
        el.removeClass("red-borders");
    }
    return value;
}
