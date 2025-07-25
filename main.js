// Varibles
let progress1 = 0;
let progress2 = 0;
let str = 0;
let activebar = null;

const jobProgress1 = document.getElementById("jobProgress1");
const jobProgress2 = document.getElementById("jobProgress2");

function updateProgress() {
    if (activebar === "bar1") {
        if (progress1 < 100) {
            progress1 += 0.5; // Adjust speed here
            jobProgress1.style.width = progress1 + "%";
        } else {
            progress1 = 0;
            if  (progress1>100) {
                str = str + 1
            }
        }
    }

    if (activebar === "bar2") {
        
        if (progress2 < 100) {
            progress2 += 2; // Adjust speed here
            jobProgress2.style.width = progress2 + "%";
        } else {
            progress2 = 0;
            if (progress2>100) {
                str = str + 1
            }
        }
    }
}

setInterval(updateProgress, 100);

const button1 = document.getElementById("button1")
button1.addEventListener("click", () => {
    activebar = "bar1";
});

const button2 = document.getElementById("button2")
button2.addEventListener("click", () => {
    activebar = "bar2";
});









/*
V1 - Created this, and added elements.
V1.1 - Added buttons and bars that fill up (extremely hard to add)

*/