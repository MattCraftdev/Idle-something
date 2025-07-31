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
            this.speed = focusBar.level + 10
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
const relaxBar = new ProgressBar("growrelax", 5, 200);
const focusBar = new ProgressBar("growfocus", 5, 100);
const weaponlessBar = new ProgressBar("weaponless", 5, 300);


let activeBar = null;

function updateProgress() {


    if (activeBar === "relax") {
        relaxBar.update();
        document.getElementById("relaxLevelDisplay").innerText = "Relax Level: " + relaxBar.getLevel();
    } else if (activeBar === "focus") {
        focusBar.update();
        document.getElementById("focusLevelDisplay").innerText = "Focus Level: " + focusBar.getLevel();
    } else if (activeBar === "weaponless") {
        weaponlessBar.update();
        document.getElementById("weaponlessLevelDisplay").innerText = "Weaponless Level: " + weaponlessBar.getLevel();
        player.atk = 10 + weaponlessBar.getLevel() * 0.05 // Weaponless makes atk 
        displayStats(player, "Player");

    }
}



// Setting interval higher = worse transitioning rate
setInterval(updateProgress, 10);



// The buttons for progress bars
document.getElementById("relaxbtn").addEventListener("click", () => {
    activeBar = "relax";
});

document.getElementById("focusbtn").addEventListener("click", () => {
    activeBar = "focus";
});

document.getElementById("weaponlessbtn").addEventListener("click", () => {
    activeBar = "weaponless";
});


// RPG type fighting system
class RPGchar { 
    constructor (name, hp, maxhp, mana, atk, def, lvl = 1, xp = 0) {
    this.name = name;
    this.hp = hp;
    this.maxhp = maxhp;
    this.mana = mana;
    this.atk = atk;
    this.def = def;
    this.lvl = lvl;
    this.xp = xp;
    }

    attackTarget(target) {
        const damagedone = Math.max(this.atk - target.def, 1); // defense reduces damage by (def) amount
        target.hp -= damagedone;
        if (target.hp <= 0) {
            this.gainXP(target)
            target.reset()
        }
        const damagerec = Math.max(target.atk - this.def, 1);
        this.hp -= damagerec;
        if (this.hp <= 0) {
            this.reset()
        }
        

        // log this
    }

    gainXP(target) {
        this.xp += Math.min(target.lvl*10);
        if (this.xp >= this.lvl * 100) { // If the xp is more than the current level*100, level up
            this.lvlUp();
        }   
    }

    reset() {
        this.hp = this.maxhp;
    }



    lvlUp() {
        this.lvl++; /*
        this.hp += 1;
        this.atk += 5;
        this.def += 3;
        this.mana += 10; */
        this.xp = 0;

        //log this
    }
}



const player = new RPGchar ("Player", 100, 100, 0, 10, 0, 1, 0)
const target = new RPGchar ("insertname", 200, 200, 0, 7, 1, 1, 0)

document.getElementById("attack1").addEventListener("click", () => {
    player.attackTarget(target)
    displayStats(player, "Player");
    displayStats(target, "Target");

});


// Displays Combat Information
for (let key in player) {
    if (player.hasOwnProperty(key)) {
        const value = player[key];
        const el = document.getElementById(key);
        if (el) {
            el.innerText = `${key}: ${value}`;
        }
    }
}

function displayStats(charObj, prefix) {
    for (let key in charObj) {
        if (charObj.hasOwnProperty(key)) {
            const el = document.getElementById(`${prefix}${key}`);
            if (el) {
                el.innerText = `${key}: ${charObj[key]}`;
            }
        }
    }
}

displayStats(player, "Player");
displayStats(target, "Target");







// Tab code
const TabButtons= document.querySelectorAll(".tab-button")

TabButtons.forEach(button => {
    button.addEventListener("click", () => {
        const tabId = button.dataset.tab;

        // Hides all tabs
        document.querySelectorAll(".tab-content").forEach(tab => {
            tab.style.display = "none";

        });
        // Shows the selected tab
        document.getElementById(tabId).style.display = "block";
    });
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

V1.6 - Added combat system
V1.6.1 - Added "enemy1"
V1.7 - Stole some tab code from Evil Idle (game i made)
V1.8 - Created tabs training and combat
V1.8.1 - Made buttons for tabs visually appalling
V1.9 - Created a display for combat information
V1.9.1 - Made the stats display vertically (harder than i thought )
V1.10 - Added a combat button, and combat workings
V1.10.1 - Furnished the combat workings
V1.10.2 - Added player death, and enemy death
V1.11 - Added weaponless bar and button
V1.11.1 - Weaponless now increases atk power by 0.05 + 10
V1.11.2 - Added basic stuff to the bar and button, and modified the border
*/