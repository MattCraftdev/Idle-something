
class ProgressBar {
    constructor(elementId, speed = 1, maxprogress = 100) {
        this.progress = 0;
        this.maxprogress = maxprogress;
        this.level = 1;
        this.speed = speed;
        this.element = document.getElementById(elementId);
    }

    update() {
        if (this.progress < this.maxprogress) {
            this.progress += this.speed;
            let widthPercent = Math.min((this.progress / this.maxprogress) * 100, 100);
            this.element.style.width = widthPercent + "%";
        } else {
            this.level++;
            this.progress = 0;
            this.maxprogress = this.maxprogress*1.2
        }
    }

    reset() {
        this.progress = 0;
        this.level = 1;
        this.element.style.width = "0%";

    }

    getLevel() {
        return this.level;
    }
}

const relaxBar = new ProgressBar("jobrelax", 10, 100);
const focusBar = new ProgressBar("jobfocus", 10, 100);


let activeBar = null;

function updateProgress() {
    if (activeBar === "relax") {
        relaxBar.update();
        document.getElementById("relaxLevelDisplay").innerText = "Relax Level: " + relaxBar.getLevel();
    } else if (activeBar === "focus") {
        focusBar.update();
        document.getElementById("focusLevelDisplay").innerText = "Focus Level: " + focusBar.getLevel();
    }
}



setInterval(updateProgress, 100);




document.getElementById("button1").addEventListener("click", () => {
    activeBar = "relax";
});

document.getElementById("button2").addEventListener("click", () => {
    activeBar = "focus";
});





















/*
V1 - Created this, and added elements.
V1.1 - Added buttons and bars that fill up (extremely hard to add)
V1.1.1 - Changed styles of bar and changed text/varibles

V1.2 - Switched to OOP and cleaned up code
V1.3 - Added level counters, and increasing difficulty
V1.4 - Fixed a visual bug with some math
*/