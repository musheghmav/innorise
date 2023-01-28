$(document).ready(function () {

    if (window.location.hash.length > 1) {
        var currentpage = ($(`a[href='${window.location.hash}']`).parent('li').index());
        $('.skill-content').children('.position-right-part:eq(' + (currentpage - 1) + ')').css('display', 'block');
        $('.position-right-part').not($('.position-right-part:eq(' + (currentpage - 1) + ')')).css('display', 'none');
    } else {
        //alert();
        console.log($('.position-right-part').find($('.position-right-part:eq(0)')));
        $('.position-right-part:eq(0)').show();
    }

    let defaultPosition = $('.skill-list ul').children('li:eq(1)').first().text();
    $('#inputPosition').val(defaultPosition);


    $('h4.panel-title').click(function () {
        $(this).siblings('i').toggleClass('fa-chevron-down');
        $(this).siblings('i').toggleClass('fa-chevron-up');
    });

    $('body').on('click', 'a.position', function (e) {
        let windowWidth = $(window).width();
        let windowHeight = $(window).height();
        let position = $(this).text() ;
        $('.fb-share-button').attr('data-href', 'http://innorise.com/careers.html/'+position+'');
        $('.fb-share-button').attr('href', 'https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Finnorise.com%2Fcareers.html%2F'+position+'&amp;src=sdkpreparse')

        if (windowWidth < 992) {
            $("html, body").animate({ scrollTop: 400  }, "slow");
        } else {
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }

        $(this).css('text-decoration', 'none');
        $('#inputPosition').val(position);
        let index = $(this).parent('li').index();
        $('.skill-content').children('.position-right-part:eq(' + (index - 1) + ')').css('display', 'block');
        $('.position-right-part').not($('.position-right-part:eq(' + (index - 1) + ')')).css('display', 'none');
    });

    $('.form-vacancy-message').submit(function (e) {
        e.preventDefault();
        let cv = $('#InputFile').prop('files')[0];
        let form_data = new FormData();
        let firstName = $('#inputFirstName').val();
        let lastName = $('#inputLastName').val();
        let email = $('#InputEmail').val();
        let inputPosition = $('#inputPosition').val();
        let recaptcha = grecaptcha.getResponse();

        if (email.length < 1) {
            $('.valid-email').text('Please fill in required field');
            return;
        } else if (!validateEmail(email)) {
            $('.valid-email').text('Email address is invalid.');
            return;
        }

        if (recaptcha.length < 1) {
            $('.recaptcha-warning').text('Please fill "I am not a robot" field');
            return;
        }

        form_data.append('file', cv);
        form_data.append('first_name', firstName);
        form_data.append('last_name', lastName);
        form_data.append('email', email);
        form_data.append('position', inputPosition);
        form_data.append('recaptcha', recaptcha);

        $.ajax({
            method: 'post',
            url: 'templates/vacancy.php',
            dataType: 'text',
            cache:false,
            contentType: false,
            processData: false,
            data: form_data,
            success: function (response) {

            }
        })
            .done(function (response) {
                if (response == 'not verified') {
                    $('.error-msg').text('You have not been verified. Please pass "I am not a robot" field');
                } else if (response == 'true') {
                    $('.success-msg').text('Message successfully sent');
                } else {
                    $('.error-msg').text('Something went wrong. Please try again');
                }
            })
    })
});