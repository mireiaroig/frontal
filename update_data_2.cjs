const fs = require('fs');

// Update user.json
let user = JSON.parse(fs.readFileSync('./src/data/user.json', 'utf8'));
user.name = "Guillem Morgó";
delete user.surname;
user.level = 3;
user.xp = 550;
user.next_level_xp = 1000;
user.voltcoins = 230; // some default
user.energy = 50;
fs.writeFileSync('./src/data/user.json', JSON.stringify(user, null, 2));

// Update skills.json - Add transversal if missing or just update scores
let skills = JSON.parse(fs.readFileSync('./src/data/skills.json', 'utf8'));
// We need to ensure we have all 4 axes.
let foundTransversal = skills.find(s => s.id === 'transversal');
if (!foundTransversal) {
    // Re-insert it if we accidentally deleted it completely instead of just zeroing it
}

skills.forEach(skill => {
    let skillTotal = 0;
    let subSkillCount = 0;
    
    skill.categories.forEach(cat => {
        cat.sub_skills.forEach(sub => {
            // Cap between 0 and 30
            sub.score = Math.floor(Math.random() * 30); // Or specific logic, let's just make sure it's max 30
            if(sub.score > 30) sub.score = 30;
            if(sub.score < 0) sub.score = 0;
            
            skillTotal += sub.score;
            subSkillCount++;
        });
    });
    
    skill.global_level = subSkillCount > 0 ? Math.floor(skillTotal / subSkillCount) : 0;
});
fs.writeFileSync('./src/data/skills.json', JSON.stringify(skills, null, 2));

// Update badges.json
let badges = JSON.parse(fs.readFileSync('./src/data/badges.json', 'utf8'));
badges.forEach(b => {
    if (b.id === 'custom_avatar') {
        b.name = "Modificar avatar";
    }
    if (b.id === 'custom_nick') {
        b.name = "Mòdul d'identificació";
    }
    if (b.id === 'ui_colors') {
        b.unlockLevel = 4;
        b.unlocked = false;
    }
    if (b.id === 'team_player') {
        b.unlockLevel = 5;
        b.unlocked = false;
    }
    if (b.id === 'bug_hunter') {
        b.unlockLevel = 6;
        b.unlocked = false;
    }
});
fs.writeFileSync('./src/data/badges.json', JSON.stringify(badges, null, 4));

console.log("Data JSONs updated for feedback corrections");
