$(function () {
    $('h1').addClass('page-title');
    $('.card').attr('title', 'FitTrack információs kártya');
    $('#year').text(new Date().getFullYear());

    $('.question').on('click', function () {
        $(this).next('.answer').slideToggle(250);
    });
    $('.details').on('click', function () {
        $(this).next('.tip').slideToggle(250);
    });

    function filterExercises() {
        const text = ($('#search').val() || '').toLowerCase().trim();
        const muscle = $('#muscle').val();
        let visible = 0;
        $('.exercise').each(function () {
            const matches = $(this).data('name').includes(text) &&
                (muscle === 'all' || $(this).data('muscle') === muscle);
            $(this).toggle(matches);
            if (matches) visible++;
        });
        $('#count').text(visible + ' gyakorlat');
        $('#noResults').prop('hidden', visible !== 0);
    }

    $('#search, #muscle').on('input change', filterExercises);

    function error(id, message) {
        $('#' + id).addClass('invalid');
        $('#' + id + 'Error').text(message);
    }
    function clearErrors(form) {
        $(form).find('.invalid').removeClass('invalid');
        $(form).find('.error').text('');
    }
    $('input, textarea').on('input change', function () {
        $(this).removeClass('invalid');
        $('#' + this.id + 'Error').text('');
    });

    $('#planForm').on('submit', function (event) {
        event.preventDefault();
        clearErrors(this);
        let valid = true;
        const name = $('#name').val().trim();
        const date = $('#start').val();
        const days = $('input[name="days"]:checked').val();
    
        if (name.length < 2) { 
            error('name', 'Adj meg legalább 2 karaktert!'); 
            valid = false; 
        }
        if (!date) {
            error('start', 'Válassz kezdési dátumot!');
            valid = false;
        }
        if (!days) {
            $('#daysError').text('Válassz edzésnap-számot!');
            valid = false;
        }
        if (!$('#accept').is(':checked')) {
            error('accept', 'A jelölőnégyzet elfogadása kötelező!');
            valid = false;
        }
        if (!valid) {
            $('#planResult').hide();
            return;
        }

        const plan = $('<div>');
        plan.append($('<h2>').text('Edzésterv - ' + name));
        plan.append($('<p>').text('Kezdés: ' + date + ' | Cél: ' + $('#goal').val()));
        const list = $('<ol>');
        const exercises = ['Teljes testes edzés', 'Felsőtest edzés', 'Lábedzés', 'Könnyű átmozgatás'];
        for (let i = 0; i < Number(days); i++) 
            list.append($('<li>').text(exercises[i]));

        plan.append(list);
        $('#planResult').css('border-left-color', $('#color').val()).empty().append(plan).fadeIn(300);
    });

    $('#planForm').on('reset', function () { 
        $('#planResult').hide().empty(); 
        clearErrors(this); 
    });

    $('#contactForm').on('submit', function (event) {
        event.preventDefault();
        clearErrors(this);
        let valid = true;
        if ($('#contactName').val().trim().length < 2) {
            error('contactName', 'Legalább 2 karakter szükséges!');
            valid = false;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test($('#email').val().trim())) {
            error('email', 'Érvényes e-mail címet adj meg!');
            valid = false;
        }
        if ($('#message').val().trim().length < 10) {
            error('message', 'Legalább 10 karakteres üzenetet írj!');
            valid = false;
        }
        if (!$('#privacy').is(':checked')) {
            error('privacy', 'Fogadd el a feltételeket!');
            valid = false;
        }
        if (!valid) {
            $('#contactResult').hide();
            return;
        }
        $('#contactResult').text('Köszönjük! Az űrlap sikeresen ellenőrizve.').fadeIn(300);
    });
    $('#contactForm').on('reset', function () {
        $('#contactResult').hide().empty(); clearErrors(this);
    });
});
