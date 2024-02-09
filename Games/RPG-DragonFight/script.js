//decalring required variables
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];

const weapon = [
    {
        name: "stick",
        power: 10
    },
    {
        name: "dagger",
        power: 30
    },
    {
        name: "claw hammer",
        power: 50
    },
    {
        name: "sword",
        power: 100
    }
];

const monsters = [
    {
        name: "slime",
        level: 5,
        health: 30
    },
    {
        name: "fanged beast",
        level: 10,
        health: 80
    },
    {
        name: "dragon",
        level: 20,
        health: 300
    }
];

const locations = [
    
    {
        name: "town square",
        "button text":  ["go to Store","go to Cave","Fight Dragon"],
        "button functions": [goStore,goCave,fightDragon],
        text: "You are in the \"Town Square\"..."
    },

    {
        name: "Store",
        "button text": ["Buy 10 health (10 Gold)","Buy a weapon (30 Gold)","Go to town square"],
        "button functions": [buyHealth,buyWeapon,goTown],
        text: "You entered the \"store\"..."
    },

    {
        name: "Cave",
        "button text": ["Fight slime","Fight fanged beast","Go to town square"],
        "button functions": [fightSlime,fightBeast,goTown],
        text: "You entered the \"Cave\"...\nYou See \"Monsters\"."
    },

    {
        name: "fight",
        "button text": ["Attack","Dodge","Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting a \"Monster\"..."
    },

    {
        name: "kill monster",
        "button text": ["Go to town square","Go to town square","Go to town square"],
        "button functions": [goTown,goTown,easterEgg],
        text: "The Monster screams 'Arg!' as it dies. You gain exp. points and gain gold..."
    },

    {
        name: "lose",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart,restart,restart],
        text: "You die!... Try Again...."
    },

    {
        name: "win",
        "button text": ["REPLAY?","REPLAY?","REPLAY?"],
        "button functions": [restart,restart,restart],
        text: "You Defeted the Dragon! You WIN the Game!..." 
    },

    {
        name: "easter egg",
        "button text": ["2","8","Go to Town Square"],
        "button functions": [pick2,pick8,goTown],
        text: "You find a secret game. Pick a number above. A random num between 0 and 10 is generated if it matches your selection, You WIN 20 Gold!... else loose 10HP"
    }
];

//getting html document elements
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

//initialize buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

//function to update buttons and text
function update(location) {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText = location.text;
}

//function for goTown
function goTown() {
    console.log("going to Town");
    update(locations[0]);
}

//function for goStore
function goStore() {
    console.log("Going to Store...");
    update(locations[1]);
}

//function for goCave
function goCave() {
    console.log("Going to Cave...");
    update(locations[2])
}


//function for buyHealth
function buyHealth() {
    console.log("Buying Health");
    if ( gold >=10 ) {
        if ( health < 100 ){
            console.log("Healing");
            gold -= 10;
            health += 10;
            if (health > 100){
                health = 100;
            }
            goldText.innerText = gold;
            healthText.innerText = health;
        } else{
            console.log("Buying Health Failed");
            text.innerText = "You Have \"Maximum Health\"...";
        }
    } else{
        console.log("Buying Health Failed");
        text.innerText = "You Don't Have Enough \"Gold\" To Buy \"Health\"...";
    }
}

//function for buyWeapon
function buyWeapon() {
    console.log("buying a Weapon");
    if (currentWeapon < weapon.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon ++;
            goldText.innerText = gold;
            let newWeapon = weapon[currentWeapon].name;
            inventory.push(newWeapon);
            text.innerText = "You now have a \"" + newWeapon + "\"...\nIn your Inventory you have:" + inventory +"...";
            console.log("Weapon added");
        }   else {
            text.innerText = "You Don't Have Enough \"Gold\" To Buy \"Weapon\"...";
            console.log("buying Weapon Failed");
        }
    } else {
        console.log("Weapon Maxed!");
        text.innerText = "You already have the most \"Powerful Weapon\"";
        button2.innerText = "Sell weapon for 15 Gold";
        button2.onclick = sellWeapon;
    }
}

//funtion to sellWeapon
function sellWeapon() {
    console.log("Selling a Weapon");
    if (inventory.length > 1) {
        gold += 15;
        gold.innerText = gold;
        let currentWeapon = inventory.shift();
        text.innerText = "You Sold a \"" + currentWeapon + "\"...";
        text.innerText += "\nIn Inventory you have: \"" + inventory + "\"...";
        console.log("Weapon Sold!...");
    } else {
        text.innerText = "Don't Sell your only \"Weapon\"";
        console.log("Selling Weapon Failed");
    }
}

//funtion for fightSlime
function fightSlime() {
    console.log("Fighting Slime...");
    fighting = 0;
    goFight();
}

//funtion for fightBeast
function fightBeast() {
    console.log("Fighting Beast...");
    fighting = 1;
    goFight();
}

//function for fightDragon
function fightDragon() {
    console.log("Fighting Dragon...");
    fighting = 2;
    goFight();
}

//function for goFight
function goFight() {
    console.log("In the battlefield...");
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth;
    monsterStats.style.display = "block";
}

//function for attack
function attack() {
    console.log("Attacking..."+ monsters[fighting].name + ".");
    text.innerText = "The " + monsters[fighting].name + "attacks...";
    text.innerText += "\nYou attack it with your " + weapon[currentWeapon].name + "...";
    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    }   else {
        text.innerText = "You Dodged The attack..."
    }

    monsterHealth -= weapon[currentWeapon].power + Math.floor ( Math.random() * xp ) + 1;
    if ( health <=0 ) {
        healthText.innerText = 0;
        monsterHealthText.innerText = monsterHealth;
        lose();
    } else if ( monsterHealth <=0 ) {
        healthText.innerText = health;
        monsterHealthText.innerText = 0;
        fighting == 2? winGame() : defeatMonster();
    } else {
        healthText.innerText = health;
        monsterHealthText.innerText = monsterHealth;
    }
    
    if (Math.random() <= .1 && inventory.length != 1) {
        text.innerText += "\nYour " + inventory.pop() + "Breaks...";
        currentWeapon--;
    }
}

//funtion getMonsterAttackValue
function getMonsterAttackValue(level) {
    let hit = Math.floor((level * 2.5) - (Math.floor(Math.random() * xp)));
    console.log(hit + " --> Monster hit value");
    return hit;
}

//funtion for isMonsterHit
function isMonsterHit() {
    return Math.random() <= 0.1;
}

//function for dodge
function dodge() {
    console.log("Taking Cover from" +  monsters[fighting].name + ".");
    text.innerText = "You dodge the attack from the "+ monsters[fighting].name + ".";
    
}

//funtion for defeatMonster
function defeatMonster() {
    console.log("Defeated Monster:" +  monsters[fighting].name + ".");
    gold += Math.floor(monsters[fighting].level * 5.5);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

//function for lose
function lose() {
    console.log("You Lose! Game Over...");
    update(locations[5]);
}

//finction for winGame
function winGame() {
    console.log("You Win! Game Over...");
    update(locations[6])
}

//function for restart
function restart() {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"]
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

//funtionn for easterEgg
function easterEgg() {
    update(locations[7]);
}

//function if 2 choosen
function pick2() {
    pick(2);
}

//function if 8 choosen
function pick8() {
    pick(8);
}

//function for pick
function pick(guess) {
    let numbers = []
    
    while ( numbers.length < 10 ) {
        numbers.push(Math.floor(Math.random()*11))
    }
    text.innerText = "You picked  " + guess + ", Here are the random numbers:\n"
    
    for (var i =0; i < 10; i++ ){
        text.innerText += numbers[i] + "\n";
    }

    if(numbers.indexOf(guess) != -1 ) {
        text.innerText += "Right! You win 20 gold!";
        gold += 20;
        goldText.innerText = gold;
    } else {
        text.innerText += "OOps! You loose 10 Health!";
        health -= 10;
        if(health <= 0) {
            healthText.innerText = health;
            lose();
        } else{
            healthText.innerText = health;
        }
    }
}
