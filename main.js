    // Class OOP
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
                // Increases exponentionally
            this.maxprogress = this.maxprogress*1.2
            this.speed = focusBar.level/2 + 10
        }
    }

    reset() {
        this.progress = 0;
        this.level = 1;

    }

    getLevel() {
        return this.level;
    }
}



// Progress bars
const relaxBar = new ProgressBar("growrelax", 10, 200);
const focusBar = new ProgressBar("growfocus", 5, 100); 

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


// Setting interval higher = worse transitioning rate
setInterval(updateProgress, 10);




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

    V1.4.1 - Added the title and fixed visuals
    V1.4.2 - Added a border to seperate the title
    V1.4.3 - Transitioning is cleaner while staying smooth
    V1.4.4 - Changed the texture to sqaure
    V1.5 - Focus level now increases the speed of other progress bars
    V1.5.1 - Added descriptions when hovering over buttons
    */