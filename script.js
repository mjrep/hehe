$(document).ready(function() {
    var mario, move_times, x_movement, x_movement_on, x_movement_dir, y_movement, window_width;

    mario = {
        element: $('.mario'),
        bottom: 40,
        left: 100
    };
    move_times = 10;
    x_movement = null;
    x_movement_on = false;
    x_movement_dir = 0;
    y_movement = null;
    window_width = $(window).width();

    function move_degree(d) {
        return d * move_times;
    }

    function collision($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var b1 = y1 + h1;
        var r1 = x1 + w1;
        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var b2 = y2 + h2;
        var r2 = x2 + w2;

        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) {
            return false;
        } else {
            return true;
        }
    }

    function mario_event_listener() {
        $('.menu .option').each(function(index) {
            if (collision($('.mario'), $(this)) && !$(this).hasClass('touch')) {
                $('.menu .option.touch').removeClass('touch');
                $(this).addClass('touch');
                $(".content .show").removeClass('show');
                $(".content .content-index-" + index).addClass('show');
            }
        });
    }

    function move_mario(x, y) {
        var new_x = mario.left + x;
        new_x = new_x < 5 ? 5 : new_x;

        var new_y = mario.bottom + y;
        new_y = new_y < 40 ? 40 : new_y;
        new_y = new_y > 190 ? 190 : new_y;

        mario_event_listener();

        mario.bottom = new_y;
        mario.left = new_x;
        mario.element.css({
            bottom: mario.bottom,
            left: mario.left
        });
    }

    function move_mario_left() {
        return move_mario(-move_degree(1), 0);
    }

    function move_mario_right() {
        return move_mario(move_degree(1), 0);
    }

    function move_mario_jump() {
        if (y_movement) {
            return false;
        }

        var original_bottom = mario.bottom;
        var jump_height = 100; // Set the desired jump height
        var jump_speed = 20; // Control the jump speed

        y_movement = setInterval(function() {
            if (mario.bottom >= original_bottom && mario.bottom < original_bottom + jump_height) {
                move_mario(0, jump_speed);
            } else {
                clearInterval(y_movement);
                y_movement = setInterval(function() {
                    if (mario.bottom > original_bottom) {
                        move_mario(0, -jump_speed);
                    } else {
                        clearInterval(y_movement);
                        y_movement = null;
                    }
                }, 50);
            }
        }, 50);
    }

    $(document).on('keydown', function(e) {
        if (e.which === 39 || e.which === 68) {
            if (!x_movement_on) {
                x_movement = setInterval(move_mario_right, 50);
                x_movement_on = true;
            }
            x_movement_dir = 1;
        } else if (e.which === 37 || e.which === 65) {
            if (!x_movement_on) {
                x_movement = setInterval(move_mario_left, 50);
                x_movement_on = true;
            }
            x_movement_dir = -1;
        } else if (e.which === 32) {
            move_mario_jump();
        }
    });

    $(document).on('keyup', function(e) {
        if ((e.which === 39 && x_movement_dir === 1) || (e.which === 37 && x_movement_dir === -1) || (e.which === 68 && x_movement_dir === 1) || (e.which === 65 && x_movement_dir === -1)) {
            x_movement_on = false;
            clearInterval(x_movement);
        }
    });

    $(window).resize(function() {
        window_width = $(window).width();
    });

    // Event listener for "CLICK HERE" text
    $('#click-here').on('click', function() {
        $('.first-screen').removeClass('show');
        $('.getting-started').addClass('show');
    });
});
