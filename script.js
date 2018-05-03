class Stopwatch {
    constructor(display) {
        this.running = false;
        this.display = display;
        this.reset();
        this.print(this.times);
    }

    reset() { //wyzerowanie stopera
        this.times = {
            minutes: 0,
            seconds: 0,
            miliseconds: 0
        };
        this.print(this.times);
    }

    print() {
        this.display.innerText = this.format(this.times); // ustawia wewnętrzny tekst elementu DOM, który znajduje się pod atrybutem display
    }

    format(times) {
        return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`; // szablon tego co ma się wyświetlać, wykorzystuje obiekt times, podany do metody reset
    }

    start() {
        if (!this.running) { // sprawdza czy stoper nie jest uruchomiony
            this.running = true;
            this.watch = setInterval(() => this.step(), 10); // uruchamia interwał, który co 10ms odpala metodę step
        }
    }

    step() {
        if (!this.running) return; //jeżel timer jest uruchomiony, odpala metodę calculate, a nastepnie pokazuje wynik metodą print
        this.calculate();
        this.print();
    }

    calculate() { //zeruje milisekundy i sekundy gdy przekrocza pewną wartość, zwiększa sekundy i minuty
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

    stop() {
        this.running = false; // zatrzymuje stoper i czyści interwał
        clearInterval(this.watch);

    }

    writeList() { // zapisuje czas jaki element listy
        var result = document.querySelector('.results');
        var resultEl = document.createElement('li');
        result.appendChild(resultEl);
        resultEl.innerHTML = this.format(this.times);
    }

    resetList() {
        document.querySelector('.results').innerHTML = ''; // resetuje zapisane czasy
    }
}

const stopwatch = new Stopwatch(document.querySelector('.stopwatch'));


//sprawdza czy wartość jest mniejsza niż dwa, jeżeli tak to dodaje 0 przed liczbą
function pad0(value) {
    let result = value.toString();
    if (result.length < 2) {
        result = '0' + result;
    }
    return result;
}


let startButton = document.getElementById('start');
startButton.addEventListener('click', () => stopwatch.start());

let stopButton = document.getElementById('stop');
stopButton.addEventListener('click', () => stopwatch.stop());

let resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => stopwatch.reset());

let saveButton = document.getElementById('save');
saveButton.addEventListener('click', () => stopwatch.writeList());

let resetListButton = document.getElementById('resetList');
resetListButton.addEventListener('click', () => stopwatch.resetList());

 
//Swap theme

const style1 = document.getElementById("stylesheet1");
const style2 = document.getElementById("stylesheet2");

const swapStyleSheet = (sheet) => document.getElementById("theme_css").setAttribute("href", sheet); 

window.onload = () => style1.checked = true;

style1.addEventListener('click', ()=> swapStyleSheet("dark.css"));
style2.addEventListener('click', ()=> swapStyleSheet("light.css"))

