
/* phone mask */

        $(function() {
            $(".phone").mask("8(999)999-99-99");
            $(".imei").mask("999999999999999");
        });

/* select */

        $(function() {
            $('select').change(function() {
                $(this).css({"color":"#131514"},0);
            });
        });

        $(function() {
            $('#model-select').change(function(){
                $('.formbox p').fadeOut(0);
                $('#' + $(this).val()).fadeIn(0);
            });
        });

        $(function() {
            $('#shop-select').change(function(){
                $('.sert').fadeOut(0);
                $('#' + $(this).val()).fadeIn(0);
            });
        });

/* setInterval animate */

        $(function() {
            setInterval(function() {
                $('.img1-1').animate({ rotate: '5deg'},2000);
                $('.img1-1').animate({ rotate: '0'},2000);
                $('.img1-2').animate({ rotate: '-5deg'},2000);
                $('.img1-2').animate({ rotate: '0'},2000);
                $('.img1-3').animate({ y: '10px'},2000);
                $('.img1-3').animate({ y: '0'},2000);
            });
        });

/* down scroll */

        $(function() {
            $("a.link-2, a.model-link").click(function() {
                $("html, body").stop().animate({
                    scrollTop: $($(this).attr("href")).offset().top - 0
                }, {
                    duration: 700
                });
                return false;
            });
        });

/* pop-up */

        $(function() {
            $('.button-1, .button-2').click(function(){
                $('#zb1').fadeIn(300);
            });
        });

        $(function() {
            $('.wrapper, .wrapper-2, .close').click(function(){
                $('.wrapper, .z-box-2, .z-box-w, .thnx').fadeOut(300);
            });
        });

/* form validate */

        $(function() {
            $('#form').validate(
                {
                    rules: {
                        "name": {
                            required: true,
                            maxlength: 40
                        },
                        "city": {
                            required: true
                        },
                        "numb":{
                            required:true
                        },
                        "email": {
                            required: true,
                            email: true,
                            maxlength: 100
                        },
                        "imei": {
                            required: true
                        }
                    },
                    messages: {
                        "name": {
                            required: ""
                        },
                        "city": {
                            required: ""
                        },
                        "numb":{
                            required:""
                        },
                        "email": {
                            required: "",
                            email: ""
                        },
                        "imei": {
                            required: ""
                        }
                    }
                });
        });

/* thnx */

        $(function() {
            $('#form').ajaxForm(function() {
                $('.wrapper, .thnx').fadeIn(300);
                $('.z-box-w, .z-box-2').fadeOut(300);
                $('#form')[0].reset();
            });
        });

/* form attach */

        $(function() {
            function click(el) {
                var evt = document.createEvent('Event');
                evt.initEvent('click', true, true);
                el.dispatchEvent(evt);
            }

            $('#filesel').on('click', function(e) {
                var fileInput = document.querySelector('.fileElem');
                //click(fileInput); // Simulate the click with a custom event.
                fileInput.click(); // Or, use the native click() of the file input.

            });

            var selDiv = "";

            document.querySelector('.fileElem').addEventListener('change', handleFileSelect, false);
            selDiv = document.querySelector("#MultiFile-wrap");

            function handleFileSelect(e) {

                if(!e.target.files) return;

                selDiv.innerHTML = "";

                var files = e.target.files;
                for(var i=0; i<files.length; i++) {
                    var f = files[i];

                    selDiv.innerHTML += f.name + "<br/>";

                }

            }
        });

/* animation */

        $('.ani-1').waypoint(function () {
            $(this).addClass('fadeInUp').addClass('animated');
        }, {
            offset:'100%'
        });

        $('.ani-2').waypoint(function () {
            $(this).addClass('fadeInDown').addClass('animated');
        }, {
            offset:'100%'
        });

/* end */