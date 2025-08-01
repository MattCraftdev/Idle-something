    // Class OOP
    



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
            this.maxprogress = this.maxprogress*1.2
            if (this === focusBar) {
            updateAllSpeeds();
            }

            // Unlocking system
            if (discoverBar.level >= 50) {
                document.getElementById("regeninf").classList.remove("hidden");
                logMessage("You felt a strange sensation flow throughout your entire body")
                logMessage("You have unlocked regeneration!")
            };
            if (weaponlessBar.level >= 25) {
                document.getElementById("daggerinf").classList.remove("hidden");
                logMessage("You have reached a good degree of mastery on weaponless combat")
                logMessage("You have unlocked dagger combat!")
            };
            
            logMessage(`You have reached level ${this.level} in ${this.elementId}`)
            
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
    discoverBar.speed = baseSpeed;
    regenBar.speed = baseSpeed;
}


// Progress bars
const relaxBar = new ProgressBar("relax", 5, 200);
const focusBar = new ProgressBar("focus", 5, 100);
const weaponlessBar = new ProgressBar("weaponless", 5, 300);
const daggerBar = new ProgressBar("dagger", 5, 500);
const discoverBar = new ProgressBar("discover", 5, 100);
const regenBar = new ProgressBar("regen", 5, 100);

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

    } else if (activeBar === "dagger") {
        daggerBar.update();
        document.getElementById("daggerLevelDisplay").innerText = "Dagger Level: " + daggerBar.getLevel();
        player.atk = 15 + daggerBar.getLevel() * 0.1
        displayStats(player, "Player");
    




    } else if (activeBar === "discover") {
        discoverBar.update();
        document.getElementById("discoverLevelDisplay").innerText = "Discover Level: " + discoverBar.getLevel();

    } else if (activeBar === "regen") {
        regenBar.update();
        document.getElementById("regenLevelDisplay").innerText = "Regenerate Level: " + regenBar.getLevel();
    }
};


// Setting interval higher = worse transitioning rate
setInterval(updateProgress, 10);



// The buttons for progress bars, and their messages
document.getElementById("relaxbtn").addEventListener("click", () => {
    activeBar = "relax";
});

document.getElementById("focusbtn").addEventListener("click", () => {
    activeBar = "focus";
});

document.getElementById("weaponlessbtn").addEventListener("click", () => {
    activeBar = "weaponless";
});

document.getElementById("daggerbtn").addEventListener("click", () => {
    activeBar = "dagger";
});

document.getElementById("discoverbtn").addEventListener("click", () => {
    activeBar = "discover";
});

document.getElementById("regenbtn").addEventListener("click", () => {
    activeBar = "regen";
});



// RPG type fighting system
class RPGchar { 
    constructor (name, hp, maxhp, regenrate, mana, atk, def, lvl = 1, xp = 0,) {
    this.name = name;
    this.hp = hp;
    this.maxhp = maxhp;
    this.regenrate = regenrate
    this.mana = mana;
    this.atk = atk;
    this.def = def;
    this.lvl = lvl;
    this.xp = xp;
    }

    attackTarget(target) {
        const damagedone = (Math.max(this.atk - target.def, 1) * 100) / 100; // defense reduces damage by (def) amount
        target.hp -= damagedone;
        target.hp = Math.round(target.hp * 100) / 100;
        logMessage(`You attacked for ${damagedone} damage`)
        if (target.hp <= 0) {
            this.gainXP(target)
            target.reset()
            logMessage("The enemy has been slain!")        
        }
        const damagerec = Math.max(target.atk - this.def, 1);
        this.hp -= damagerec;
        this.hp = Math.round(this.hp * 100) / 100;
        logMessage(`You recieved ${damagerec} damage`)
        if (this.hp <= 0) {
            this.reset()
            logMessage("You have died.")
        }
        if (this.hp <= this.maxhp) {
            this.hp += this.regenrate
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


// The player
const player = new RPGchar ("Player", 100, 100, 0, 0, 10, 0, 1, 0)
let currentEnemy = new RPGchar("None", 0, 0, 0, 0, 0, 0, 0, 0);

// enemies
const wilddog = new RPGchar ("Wild Dog", 75, 75, 0, 0, 15, 1, 1, 0)
const goblin = new RPGchar ("Goblin", 125, 125, 1, 0, 20, 3, 1, 0)
const slime = new RPGchar ("Slime", 200, 200, 3, 0, 10, 2, 1, 0)




function switchEnemy(newEnemy) {
    currentEnemy = newEnemy;
    displayStats(currentEnemy, "Target");
    logMessage(`A ${newEnemy.name} appears!`);
}

const enemies = [slime, goblin, wilddog];
currentEnemy = enemies[Math.floor(Math.random() * enemies.length)];





document.getElementById("attack1").addEventListener("click", () => {
    player.attackTarget(currentEnemy);
    displayStats(currentEnemy, "Target");
    displayStats(player, "Player");

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
displayStats(currentEnemy, "Target");







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
      }
    }









/*
V1.11.1 - Weaponless now increases atk power by 0.05 + 10
V1.11.2 - Added basic stuff to the bar and button, and modified the border

V1.11.3 - Fixed a little error with the Target HP display after upgrading weaponless combat
V1.12 - Added chatbox from Evil Idle (took code from my game)
V1.12.1 - Added 3 messages for when you did bars
V1.12.2 - Added messages in combat (4 msg.)
V1.13 - Added discover bar
V1.13.1 - Added information with discover bar
V1.14 - Added regen bar with fixings
V1.14.1 - Adding regen to combat along with target
V1.14.2 - Fixed small error
V1.14.3 - Made the regen bar show AFTER you reach X focus
V1.15 - Added dagger bar with fixings
V1.15.1 - Dagger is now locked until level 25 weaponless
V1.15.1.1 - Fixed quick error
V1.16 - Added 3 new enemies and random combat system
V1.16.1 - Focus bar now updates speed for all bars quicker
V1.16.2 - Added messages when unlocking new bars
V1.16.3 - When leveling up in a bar, says on message log
V1.16.3.1 - Deleted all switching bars messages
V1.16.3.2 - Fixed small error with damagedone
V1.16.4 - Rounded damage done from error (fixed)
*/