styleSheet = document.createElement("style");
let studySecs;
let pauseSecs;

document.getElementById('clear').addEventListener('click', function() {
    console.log('clear');
    document.getElementById('studyTime').value = '';
    document.getElementById('pauseTime').value = '';
    document.getElementById('cycles').value = '1';
});


document.getElementById('studyForm').addEventListener('submit', function(event) {
    event.preventDefault();

const studyTime = (document.getElementById('studyTime').value).split(':');
studySecs = (+studyTime[0]) * 60 * 60 + (+studyTime[1]) * 60 + (+studyTime[2]);

console.log(studySecs);

const pauseTime = (document.getElementById('pauseTime').value).split(':');
pauseSecs = (+pauseTime[0]) * 60 * 60 + (+pauseTime[1]) * 60 + (+pauseTime[2]);
console.log(pauseSecs);

const cycles = document.getElementById('cycles').value * 2;
console.log(cycles);

    console.log('start');
    timerCycle(0, cycles, studySecs);
});


function timerCycle(i, cycles, seconds) {
        
    const endTime = Date.now() + (seconds) * 1000;
    if (i%2 == 0) {
       studyAnimation(seconds);
    } else {
       pauseAnimation(seconds);
    }
    const interval = setInterval(function () {
        const now = Date.now();
        const difference = endTime - now;
        console.log(difference);

        if (difference <= 0) {
            clearInterval(interval);
            if (i < cycles - 1) {
                if (i%2 == 0) {
                    document.getElementById('timer').textContent = "Pause";
                    timerCycle(i + 1, cycles, pauseSecs);
                } else {
                    document.getElementById('timer').textContent = "Study";
                    timerCycle(i + 1, cycles, studySecs);
                }    
            }
            else {
                document.getElementById('timer').textContent = "Finished!";
                //animate splash
            }
            return;
        }

        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        document.getElementById('timer').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }, 1000);
}

function studyAnimation(seconds) {

    console.log("studyanim");
    styleSheet.innerText = `#juice::after { animation: spin ${seconds}s linear forwards; }`;
    document.head.appendChild(styleSheet);
}

function pauseAnimation(seconds) {
    console.log("pauseanim");
    styleSheet.innerText = `#juice::after { animation: spinreverse ${seconds}s linear forwards; top:-75%; }`;
    document.head.appendChild(styleSheet);
}

