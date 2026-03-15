const fs = require('fs');

// Update user.json
let user = JSON.parse(fs.readFileSync('./src/data/user.json', 'utf8'));
user.name = "Guillem M";
delete user.surname;
user.energy = 50; // default energy for arcade
fs.writeFileSync('./src/data/user.json', JSON.stringify(user, null, 2));

// Update skills.json
let skills = JSON.parse(fs.readFileSync('./src/data/skills.json', 'utf8'));
skills[0].global_level -= 20; // 75 -> 55
skills[1].global_level -= 15; // 65 -> 50
skills[2].global_level -= 30; // 82 -> 52
skills[3].global_level = 0;   // 78 -> 0 (Set some skills to 0%)

skills.forEach(skill => {
    skill.categories.forEach(cat => {
        cat.sub_skills.forEach(sub => {
            if (skill.global_level === 0) {
                sub.score = 0;
            } else {
                sub.score = Math.max(0, sub.score - 20);
            }
        });
    });
});
fs.writeFileSync('./src/data/skills.json', JSON.stringify(skills, null, 2));

// Update badges.json
let badges = JSON.parse(fs.readFileSync('./src/data/badges.json', 'utf8'));
badges.forEach((b, idx) => {
    if (b.id === 'custom_avatar') {
        b.name = "modificar avatar";
    }
    if (b.id === 'custom_nick') {
        b.name = "mòdul d'identificació";
    }
    if (!b.unlocked) {
        // give realistic unlock levels based on index
        b.unlockLevel = (idx * 2) + 1;
    }
});
fs.writeFileSync('./src/data/badges.json', JSON.stringify(badges, null, 4));

console.log("Data JSONs updated");
