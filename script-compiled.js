'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Stopwatch = function () {
    function Stopwatch(display) {
        _classCallCheck(this, Stopwatch);

        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    _createClass(Stopwatch, [{
        key: 'reset',
        value: function reset() {
            //wyzerowanie stopera
            this.times = {
                minutes: 0,
                seconds: 0,
                miliseconds: 0
            };
            this.print(this.times);
        }
    }, {
        key: 'print',
        value: function print() {
            this.display.innerText = this.format(this.times); // ustawia wewnętrzny tekst elementu DOM, który znajduje się pod atrybutem display
        }
    }, {
        key: 'format',
        value: function format(times) {
            return pad0(times.minutes) + ':' + pad0(times.seconds) + ':' + pad0(Math.floor(times.miliseconds)); // szablon tego co ma się wyświetlać, wykorzystuje obiekt times, podany do metody reset
        }
    }, {
        key: 'start',
        value: function start() {
            var _this = this;

            if (!this.running) {
                // sprawdza czy stoper nie jest uruchomiony
                this.running = true;
                this.watch = setInterval(function () {
                    return _this.step();
                }, 10); // uruchamia interwał, który co 10ms odpala metodę step
            }
        }
    }, {
        key: 'step',
        value: function step() {
            if (!this.running) return; //jeżel timer jest uruchomiony, odpala metodę calculate, a nastepnie pokazuje wynik metodą print
            this.calculate();
            this.print();
        }
    }, {
        key: 'calculate',
        value: function calculate() {
            //zeruje milisekundy i sekundy gdy przekrocza pewną wartość, zwiększa sekundy i minuty
            this.times.miliseconds += 1;
            if (this.times.miliseconds >= 100) {
                this.times.seconds += 1;
                this.times.miliseconds = 0;
            }
            if (this.times.seconds >= 60) {
                this.times.minutes += 1;
                this.times.seconds = 0;
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            this.running = false; // zatrzymuje stoper i czyści interwał
            clearInterval(this.watch);
        }
    }, {
        key: 'writeList',
        value: function writeList() {
            // zapisuje czas jaki element listy
            var result = document.querySelector('.results');
            var resultEl = document.createElement('li');
            result.appendChild(resultEl);
            resultEl.innerHTML = this.format(this.times);
        }
    }, {
        key: 'resetList',
        value: function resetList() {
            document.querySelector('.results').innerHTML = ''; // resetuje zapisane czasy
        }
    }]);

    return Stopwatch;
}();

var stopwatch = new Stopwatch(document.querySelector('.stopwatch'));

//sprawdza czy wartość jest mniejsza niż dwa, jeżeli tak to dodaje 0 przed liczbą
function pad0(value) {
    var result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}

var startButton = document.getElementById('start');
startButton.addEventListener('click', function () {
    return stopwatch.start();
});

var stopButton = document.getElementById('stop');
stopButton.addEventListener('click', function () {
    return stopwatch.stop();
});

var resetButton = document.getElementById('reset');
resetButton.addEventListener('click', function () {
    return stopwatch.reset();
});

var saveButton = document.getElementById('save');
saveButton.addEventListener('click', function () {
    return stopwatch.writeList();
});

var resetListButton = document.getElementById('resetList');
resetListButton.addEventListener('click', function () {
    return stopwatch.resetList();
});

//Swap theme

var style1 = document.getElementById("stylesheet1");
var style2 = document.getElementById("stylesheet2");

var swapStyleSheet = function swapStyleSheet(sheet) {
    return document.getElementById("theme_css").setAttribute("href", sheet);
};

window.onload = function () {
    return style1.checked = true;
};

style1.addEventListener('click', function () {
    return swapStyleSheet("dark.css");
});
style2.addEventListener('click', function () {
    return swapStyleSheet("light.css");
});
