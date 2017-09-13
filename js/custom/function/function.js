// verifica se a data inicial é inferior a data final
function isPeriodoInferior(dataInicial, dataFinal) {
    var dataInicio;
    var dataFim;
    if (validaData(dataInicial) && validaData(dataFinal)) {
        try {
            dataInicio = angular.copy(converterStringEmDate(dataInicial));
            dataFim = angular.copy(converterStringEmDate(dataFinal));
        } catch (err) {
            dataInicio = angular.copy(dataInicial);
            dataFim = angular.copy(dataFinal);
        }

        if (dataFim.getTime() == dataInicio.getTime()) {
            return false;
        }

        return dataFim.getTime() > dataInicio.getTime();
    } else
        return true;
}

// serve para converter strings com o formato > mm/yyyy ou dd/mm/yyyy ou dd-mm-yyyy em date
function converterStringEmDate(str) {
    if (str) {
        if (str instanceof Date) {
            return str;
        } else {
            var day = null;
            var month = null;
            var year = null;

            if (str.length == 7) {
                day = "01";
            }
            var dataArray = str.split('/').reverse();
            if (dataArray.length == 1) {
                dataArray = str.split('-').reverse();
            }
            if (!day) {
                day = dataArray[2];
                month = dataArray[1] - 1;
                year = dataArray[0];
            } else {
                month = dataArray[1] - 1;
                year = dataArray[0];
            }
            return new Date(year, month, day);
        }
    }
}

var validaHoras = function (data) {
    if (!data || !data.match(/[0-9]/)
        || !data.match(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/))
        return false;

    var horaArray = data.split(':');

    var hh = horaArray[0], mm = horaArray[1], ss = horaArray[2];

    if (hh < 1 || hh > 24) {
        return false;
    }

    if (mm < 0 || mm > 59) {
        return false;
    }

    if (ss < 0 || ss > 59) {
        return false;
    }

    return true;
};

var validaData = function (data) {
    if (Object.prototype.toString.call(data) !== "[object Date]") {
        if (!data || !data.match(/[0-9]/)
            || !data.match(/[0-9]{2}\/[0-9]{2}\/[0-9]{4}/))
            return false;

        var dataArray = data.split('/');

        var day = dataArray[0], month = dataArray[1], year = dataArray[2];

        if (month < 1 || month > 12) {
            return false;
        }

        if (day < 1 || day > 31) {
            return false;
        }

        if ((month === 4 || month === 6 || month === 9 || month === 11)
            && day === 31) {
            return false;
        }

        if (month == 2) {
            var isleap = false;
            if ((!(year % 4) && year % 100) || !(year % 400)) {
                isleap = true;
            }

            if (isleap && day > 29) {
                return false;
            }
        }

        if (year.length !== 4) {
            return false;
        }

        if (year < 1900 || year > 2099) {
            return false;
        }

        return true;
    }

    return !isNaN(data.getTime());
};

var getUuid = (function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16)
            .substring(1);
    }

    return function () {
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4()
            + s4() + s4();
    };
})();

// metodo responsável por pegar o $scope do body, onde estão as funções genericas
function getScopeBody() {
    return angular.element(document.querySelector('body')).scope();
}

// metodo responsável por forcar em determindo campo com id (target)
var goFocus = function (target) {
    document.getElementById(target).focus();
};