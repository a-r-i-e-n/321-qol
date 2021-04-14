// ==UserScript==
// @name         321 QoL
// @version      1.0
// @description  Adds various QoL to 321, such as larger inputs for PM windows and the ability to resize them
// @author       Arien
// @match        https://*.321chat.com/
// @match        https://*.321sexchat.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Replace input field with textarea
    $('<textarea id="message_content" placeholder="Type something..." maxlength="500"></textarea>').insertBefore('input#message_content');
    $('input#message_content').remove();

    // Handle enter keypress in textarea to prevent it; make it work as the input
    $('textarea#message_content').keypress(function(e) {

        if (e.which === 13) {

            e.preventDefault();
            $('#message_form').submit();
        }
    });

    // Make PM windows resizable
    // Relies on the fact that 321 already has this; no need to include jQuery UI, might break in the future.
    $('#private_box').resizable({
        handles: 'n, w, nw',
        stop: function(e,ui) {

            var new_height = $('#private_box').height() - 156;
            $('#private_wrap_content #private_content').attr('style', `height: ${new_height}px;`);
        }
    });

    // Throw some CSS modifications in
    $(`<style>

    .hunter_private, .target_private {

        max-width: 80%;
    }

    #message_form {

        height: 100px;
    }

    #message_content {

        border-radius: 10px;
        padding-top: 5px;
    }

    #private_box {

        height: 426px;
    }

    </style>`).appendTo('body');
})();
