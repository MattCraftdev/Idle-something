// Class OOP for progress bars

class ProgressBar {
    constructor(elementId, speed = 1, maxprogress = 100) {
        this.elementId = elementId;
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
            this.maxprogress = this.maxprogress*1.2;
            if (this === focusBar) {
            updateAllSpeeds();
            }

            // Unlocking system
            if (discoverBar.level >= 50) {
                document.getElementById("gainsinf").classList.remove("hidden");
                document.getElementById("gainsstory").classList.remove("hidden");
                newStory();
            };

            // Weapon unlocks
            if (weaponlessBar.level >= 25 && document.querySelector("#daggerinf").classList.contains("hidden")) {
                document.getElementById("daggerinf").classList.remove("hidden");
                document.getElementById("daggerstory").classList.remove("hidden");
                newStory();
            };
            
            if (daggerBar.level >= 25 && document.querySelector("#maceinf").classList.contains("hidden")) {
                document.getElementById("maceinf").classList.remove("hidden");
                document.getElementById("macestory").classList.remove("hidden");
                newStory();
            };

            if (maceBar.level >= 25 && document.querySelector("#axeinf").classList.contains("hidden")) {
                document.getElementById("axeinf").classList.remove("hidden");
                document.getElementById("axestory").classList.remove("hidden");
                newStory();
            };

            logMessage(`You have reached level ${this.level} in ${this.elementId}`);
            
        };
    };

    reset() {
        this.progress = 0;
        this.level = 1;

    };

    getLevel() {
        return this.level;
    };
};

// Updates all speeds quickly
function updateAllSpeeds() {
    const baseSpeed = focusBar.level + 10;
    relaxBar.speed = baseSpeed;
    weaponlessBar.speed = baseSpeed;
    daggerBar.speed = baseSpeed;
    maceBar.speed = baseSpeed;
    axeBar.speed = baseSpeed;
    discoverBar.speed = baseSpeed;
    gainsBar.speed = baseSpeed;
}

// Unlocking new story in story (story flashes)
let glowInterval;

function newStory() {
    document.getElementById("storybtn").classList.remove("glow");
    clearInterval(glowInterval);
    glowInterval = setInterval(() => {
        document.getElementById("storybtn").classList.toggle("glow");
    }, 500);
};

document.getElementById("storybtn").addEventListener("click", () => {
    document.getElementById("storybtn").classList.remove("glow");
    clearInterval(glowInterval);
});

// Progress bars
const relaxBar = new ProgressBar("relax", 10, 200);
const focusBar = new ProgressBar("focus", 10, 100);

const weaponlessBar = new ProgressBar("weaponless", 10, 300);
const daggerBar = new ProgressBar("dagger", 10, 500);
const maceBar = new ProgressBar("mace", 10, 600);
const axeBar = new ProgressBar("axe", 10, 750);

const discoverBar = new ProgressBar("discover", 10, 50);
const gainsBar = new ProgressBar("gains", 10, 100);

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
        player.atk = 10 + weaponlessBar.getLevel() * 0.05; // Weaponless makes atk 
        displayStats(player, "Player");

    } else if (activeBar === "dagger") {
        daggerBar.update();
        document.getElementById("daggerLevelDisplay").innerText = "Dagger Level: " + daggerBar.getLevel();
        player.atk = 15 + daggerBar.getLevel() * 0.1;
        displayStats(player, "Player");

    } else if (activeBar === "mace") {
        maceBar.update();
        document.getElementById("maceLevelDisplay").innerText = "Mace Level: " + maceBar.getLevel();
        player.atk = 20 + maceBar.getLevel() * 0.2;
        displayStats(player, "Player");

    } else if (activeBar === "axe") {
        axeBar.update();
        document.getElementById("axeLevelDisplay").innerText = "Axe Level: " + axeBar.getLevel();
        player.atk = 40 + axeBar.getLevel() * 0.3;
        displayStats(player, "Player");



    } else if (activeBar === "discover") {
        discoverBar.update();
        document.getElementById("discoverLevelDisplay").innerText = "Discover Level: " + discoverBar.getLevel();

    } else if (activeBar === "gains") {
        gainsBar.update();
        document.getElementById("gainsLevelDisplay").innerText = "Gains Level: " + gainsBar.getLevel();
    }
};


// Setting interval higher = worse transitioning rate
setInterval(updateProgress, 20);

// Time system - life expectancy 40 years (equals around 2 hours real time)
let day = 0;
let year = 14;

setInterval(() => {
    day += 1;
    updateTime();
    document.getElementById("displayTime").innerText = " Days: " + day + " Years: " + year;
}, 500);

function updateTime() {
    if (day >= 365) {
        day = 0;
        year += 1;
    };
};

// The buttons for progress bars, and their messages
document.getElementById("relaxbtn").addEventListener("click", () => {
    activeBar = "relax";
});

document.getElementById("focusbtn").addEventListener("click", () => {
    activeBar = "focus";
});
// Weapons
document.getElementById("weaponlessbtn").addEventListener("click", () => {
    activeBar = "weaponless";
});

document.getElementById("daggerbtn").addEventListener("click", () => {
    activeBar = "dagger";
});

document.getElementById("macebtn").addEventListener("click", () => {
    activeBar = "mace";
});

document.getElementById("axebtn").addEventListener("click", () => {
    activeBar = "axe";
});
// Discover
document.getElementById("discoverbtn").addEventListener("click", () => {
    activeBar = "discover";
});

document.getElementById("gainsbtn").addEventListener("click", () => {
    activeBar = "gains";
});




// RPG type fighting system
class RPGchar { 
    constructor (name, hp, maxhp, regenrate, mana, atk, def, lvl = 1, xp = 0,) {
    this.name = name;
    this.hp = hp;
    this.maxhp = maxhp;
    this.regenrate = regenrate;
    this.mana = mana;
    this.atk = atk;
    this.def = def;
    this.lvl = lvl;
    this.xp = xp;
    };

    attackTarget(target) {
        const damagedone = (Math.max(this.atk - target.def, 1) * 100) / 100; // defense reduces damage by (def) amount
        target.hp -= damagedone;
        target.hp = Math.round(target.hp * 100) / 100;
        logMessage(`You attacked for ${damagedone} damage`);
        if (target.hp <= 0) {
            this.gainXP(target);
            target.reset();
            logMessage("The enemy has been slain!");
            switchEnemy();
        };
        const damagerec = Math.max(target.atk - this.def, 1);
        this.hp -= damagerec;
        this.hp = Math.round(this.hp * 100) / 100;
        logMessage(`You recieved ${damagerec} damage`);
        if (this.hp <= 0) {
            this.reset();
            logMessage("You have died.");
        };
        if (this.hp <= this.maxhp) {
            this.hp += this.regenrate;
        };
        


        // log this
    };

    gainXP(target) {
        this.xp += Math.min(target.lvl*10);
        if (this.xp >= this.lvl * 100) { // If the xp is more than the current level*100, level up
            this.lvlUp();
        }   
    }

    reset() {
        this.hp = this.maxhp;
    }



    lvlUp() { // Stats you gain per level up
        this.lvl++;
        this.atk += 3;
        this.def += 0.5;
        this.xp = 0;
    };
};


// The player
const player = new RPGchar ("Player", 100, 100, 0, 0, 10, 0, 1, 0);
let currentEnemy = new RPGchar("None", 0, 0, 0, 0, 0, 0, 0, 0);

// Enemies
const wilddog = new RPGchar ("Wild Dog", 75, 75, 0, 0, 15, 1, 2, 0);
const wolf = new RPGchar ("Wolf", 100, 100, 0, 0, 20, 2, 5, 0);
const grizzlybear = new RPGchar ("Grizzly Bear", 200, 200, 0, 0, 25, 2, 10, 0);
const angrytownsfolk = new RPGchar ("Angry Townsfolk", 300, 300, 0, 0, 30, 3, 15, 0);



const enemies = [wilddog, wolf, grizzlybear];

function switchEnemy () {
    newEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    currentEnemy = newEnemy;
    displayStats(currentEnemy, "Target");
    logMessage(`A ${currentEnemy.name} appears!`);
};



// Attack Interval system (auto attack)
let attackinterval;
const button = document.getElementById("attacknstop");
manaperturn = Math.round(relaxBar.level*0.1*100)/100;

button.addEventListener("click", () => {
    const isntAttacking = button.classList.contains("stopattacking");
    
    if (isntAttacking) {
        button.classList.add("attack");
        button.classList.remove("stopattacking");
        button.innerText = "Stop Attacking";
        
        attackinterval = setInterval(() => {
            player.attackTarget(currentEnemy);
            displayStats(currentEnemy, "Target");
            displayStats(player, "Player");
            player.mana += manaperturn; // Every level of RelaxBar adds +0.1 for mana generation. Mana generates every attack
        }, 1000);


    } else {
        button.classList.remove("attack");
        button.classList.add("stopattacking");
        button.innerText = "Attack";
        clearInterval(attackinterval);
    };

});


// Displays Combat Information
for (let key in player) {
    if (player.hasOwnProperty(key)) {
        const value = player[key];
        const el = document.getElementById(key);
        if (el) {
            el.innerText = `${key}: ${value}`;
        };
    };
};

function displayStats(charObj, prefix) {
    for (let key in charObj) {
        if (charObj.hasOwnProperty(key)) {
            const el = document.getElementById(`${prefix}${key}`);
            if (el) {
                el.innerText = `${key}: ${charObj[key]}`;
            };
        };
    };
};

displayStats(player, "Player");
displayStats(currentEnemy, "Target");




// Tab code
const TabButtons= document.querySelectorAll(".tab-button");

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


// Chatbox code
const chatbox = document.getElementById("chatbox");

function logMessage(text) {
    const msg = document.createElement("div");
    msg.classList.add("message");
    msg.textContent = text;
    chatbox.appendChild(msg);
    // Max message count (set it)
    if (chatbox.children.length > 8) {
        chatbox.removeChild(chatbox.children[0]);
    };
};



/*
V1.17 - Added Mace weapon and fixings
V1.18 - Added axe weapon and fixings
V1.18.1 - Fixed error with logMessage and dagger+ descriptions
V1.18.2 - Changed descriptions
V1.19 - Deleted supernatural enemies (zombie, skeleton, etc.) and replaced with new enemies (grizzlybear, wild dog, wolf)
V1.19.1 - Shoved all (level: X) text into bars themselves
V1.19.2 - Cleaned up <div>'s 
V1.19.3 - Made the bars clickable, and removed buttons (bars replaced buttons)
V1.19.4 - Added time system
V1.20 - Added story part
V1.20.1 - Added leveling up, and fixed enemy randomizing (made it work :O)
V1.20.1.1 - Added townsfolk (another enemy)
V1.20.2 - Added auto attacking
V1.20.3 - Fixed errors with the attacking
V1.20.4 - Pushed all unlocks into story
V1.21 - Added a glow effect when new story bits are unlocked
V1.21.1 - Modified and combined story bits
V1.21.2 - Added mana generation (relax has an effect now) per turn
V1.21.2.1 - Fixed glitches
*/