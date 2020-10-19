/* form validate */

$(function() {
    $('#formNav').validate({
        rules: {
            "nameNav": {
                required: true,
            },
            "orgNav": {
                required: true,
            },
            "emailNav": {
                required: true,
            },
            "messNav": {
                required: true,
            },

        },
        messages: {
            "nameNav": {
                required: 'Ошибка заполнения',
            },
            "orgNav": {
                required: 'Ошибка заполнения',
            },
            "emailNav": {
                required: 'Ошибка заполнения',
            },
            "messNav": {
                required: 'Ошибка заполнения',
            },
        }
    });
});
$(function() {
    $('#formFile').validate({
        rules: {
            "organizations_name": {
                required: true,
            },
            "organizations_email": {
                required: true,
            },
            "organizations_text": {
                required: true,
            },

        },
        messages: {
            "organizations_name": {
                required: 'Ошибка заполнения',
            },
            "organizations_email": {
                required: 'Ошибка заполнения',
            },
            "organizations_text": {
                required: 'Ошибка заполнения',
            },

        }
    });
});
$(function() {
    $('#formVacan').validate({
        rules: {
            "fio_vacan": {
                required: true,
            },
            "phone_vacan": {
                required: true,
            },
            "otch_vacan": {
                required: true,
            },
            "email_vacan": {
                required: true,
            },
            "zaved_vacan": {
                required: true,
            },

            "fac_edu": {
                required: true,
            },
            "programm_vacan": {
                required: true,
            },
            "name_org_vacan": {
                required: true,
            },
            "dolj_vacan": {
                required: true,
            },

            "edu_col_vacan": {
                required: true,
            },
            "ojid_vacan": {
                required: true,
            },
        },
        messages: {
            "fio_vacan": {
                required: 'Ошибка заполнения',
            },
            "phone_vacan": {
                required: 'Ошибка заполнения',
            },
            "otch_vacan": {
                required: 'Ошибка заполнения',
            },
            "email_vacan": {
                required: 'Ошибка заполнения',
            },
            "zaved_vacan": {
                required: 'Ошибка заполнения',
            },
            "fac_edu": {
                required: 'Ошибка заполнения',
            },
            "programm_vacan": {
                required: 'Ошибка заполнения',
            },

            "name_org_vacan": {
                required: 'Ошибка заполнения',
            },
            "dolj_vacan": {
                required: 'Ошибка заполнения',
            },
            "edu_col_vacan": {
                required: 'Ошибка заполнения',
            },
            "ojid_vacan": {
                required: 'Ошибка заполнения',
            },
        }
    });
});
$(function() {
    $('#formVacanRez').validate({
        rules: {
            "vacan_rez_1": {
                required: true,
            },
            "vacan_rez_2": {
                required: true,
            },
            "vacan_rez_3": {
                required: true,
            },

        },
        messages: {
            "vacan_rez_1": {
                required: 'Ошибка заполнения',
            },
            "vacan_rez_2": {
                required: 'Ошибка заполнения',
            },
            "vacan_rez_3": {
                required: 'Ошибка заполнения',
            },

        }
    });
});
/* thnx */

$(function() {
    $('#formNav').ajaxForm(function() {

        $('#form')[0].reset();
    });
});
$(function() {
    $('#formFile').ajaxForm(function() {

        $('#form')[0].reset();
    });
});
$(function() {
    $('#formVacan').ajaxForm(function() {

        $('#form')[0].reset();
    });
});
$(function() {
    $('#formVacanRez').ajaxForm(function() {

        $('#form')[0].reset();
    });
});