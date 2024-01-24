const ONE_HANDED_SWORD = 4, ONE_HANDED_AXE_SWING = 4.4, ONE_HANDED_AXE_STAB = 3.2, TWO_HANDED_SWORD = 4.6, TWO_HANDED_AXE_SWING = 4.8,
TWO_HANDED_AXE_STAB = 3.4, SPEAR_SWING = 3, SPEAR_STAB = 5, POLEARM_SWING = 5, POLEARM_STAB = 3, DAGGER = 3.6, BOW = 3.4, CROSSBOW = 3.6;

// let classes = document.getElementById("classes").value;
// let jobs = document.getElementById("jobs").value;
let monsterSelect = document.getElementById("monsterSelect");
let monsterStatsTable = document.getElementById("monsterStatsTable");

if (classes == "none") {
    document.getElementById("jobs").style.display = "none";
}

function displayJobsSelect() {
    let classes = document.getElementById("classes").value;

    document.getElementById("jobs").style.display = "initial";
    if (classes == "none") {
        document.getElementById("jobs").style.display = "none";
    }
}

function ClassIsSelectedThenUpdate() {
    document.getElementById('finalDamage').style.display = "none";
    displayJobsSelect();
    updateJobsOptions();
    createMonsterStats();
    if (document.getElementById('stats').getElementsByTagName('label')[0]) {
        updateStatsDisplay();
        updateSkills(selectSkills());
    }
    initialSetting();
    calcRange(loadUserStats());
}

function JobIsSelectedThenUpdate() {
    let classes = document.getElementById("classes").value;

    if (!document.getElementById('stats').getElementsByTagName('label')[0]) {
        updateStatsDisplay();
        updateSkills(selectSkills());
    } else if (classes == "rogue") {
        updateStatsDisplay();
        updateSkills(selectSkills());
    } else if (classes == "magician" || classes == "bowman") {
        updateSkills(selectSkills());
    }

    if (classes == "warrior") {
        if (!document.getElementById('skills').getElementsByTagName('table')[0]) {
            updateSkills(selectSkills());
        }
    }
    // if (classes == "warrior" || classes == "bowman") {
        calcRange(loadUserStats());
    // }
    isSkillSwapped = false;
}

function statsChangedThenUpdate() {
    calcRange(loadUserStats());
}

function skillSelectedThenUpdate() {
    calcRange(loadUserStats());
}

function monsterSelectedThenUpdate() {
    createMonsterStats();
    calcRange(loadUserStats());
}

// 클래스를 고르면 세부 직업 or 무기 선택
function updateJobsOptions() {
    let classes = document.getElementById("classes").value;
    let optionsToShow = [];

    switch (classes) {
        case "warrior":
            optionsToShow = ["one_handed_sword", "two_handed_sword", "spear", "polearm", "one_handed_axe", "two_handed_axe"];
            break;
        case "magician":
            optionsToShow = ["one_dimension", "fire", "ice", "cleric"];
            break;
        case "bowman":
            optionsToShow = ["bow", "crossbow"];
            break;
        case "rogue":
            optionsToShow = ["assassin", "thief"];
            break;
    }

    const select = document.getElementById("jobs");
    select.value = "none";
  
    for (i=0; i<select.options.length; i++) {
        const option = select.options[i];
        if (optionsToShow.includes(option.value)) {
            option.style.display = "";
        } else {
            option.style.display = "none";
        }
    }
}


/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩   스탯 영역   ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
let statsContainer = document.getElementById("stats");

function updateStatsDisplay() {
    // 기존 스탯 요소들을 모두 제거
    while (statsContainer.firstChild) {
        statsContainer.removeChild(statsContainer.firstChild);
    }

    let statsLegend = document.createElement("legend");
    statsLegend.textContent = "스탯 입력";
    statsContainer.appendChild(statsLegend);

    let classes = document.getElementById("classes").value;
    let jobs = document.getElementById("jobs").value;
    let allStats = ["lvl", "str", "dex", "int", "luk", "wa", "pa", "aa", "ab", "totalmagic"];
    let statsToHide = [];

    switch (classes) {
        case "warrior":
            statsToHide = ["int", "luk", "totalmagic", "pa"];
            break;
        case "magician":
            statsToHide = ["str", "dex", "wa", "pa", "aa", "ab"];
            break;
        case "bowman":
            statsToHide = ["int", "luk", "totalmagic"];
            break;
        case "rogue":
            if (jobs === "none") {
                statsToHide = allStats;
            } else if (jobs === "thief") {
                statsToHide = ["int", "totalmagic", "pa"];
            } else {
                statsToHide = ["int", "totalmagic"];
            }
            break;
    }

    displayStats(allStats, statsToHide); 
}

function displayStats(allStats, statsToHide) {
    let statsToShow = allStats.filter(stat => !statsToHide.includes(stat));

    // 새로운 div1, div2를 생성
    let div1 = document.createElement('div');
    div1.className = "statleft";
    let div2 = document.createElement('div');
    div2.className = "statright";

    // 생성한 div1, div2를 statsContainer에 추가
    statsContainer.appendChild(div1);
    statsContainer.appendChild(div2);

    statsToShow.forEach(stat => {
        let labelAndInput = createAndAppendStat(stat);

        // 스탯에 따라 div1 또는 div2에 추가
        if (["lvl", "str", "dex", "int", "luk", "totalmagic"].includes(stat)) {
            div1.appendChild(labelAndInput.label);
            div1.appendChild(labelAndInput.input);
            div1.appendChild(labelAndInput.lineBreak);
        } else {
            div2.appendChild(labelAndInput.label);
            div2.appendChild(labelAndInput.input);
            div2.appendChild(labelAndInput.lineBreak);
        }
    });
}

function createAndAppendStat(statName) {
    let statLabel = document.createElement("label");
    statLabel.classList.add("stat", statName);
    statLabel.textContent = displayName(statName) + " ";

    let statInput = null;
    let classes = document.getElementById("classes").value;
    let jobs = document.getElementById("jobs").value;

    if (statName === "pa") {
        statInput = document.createElement("select");
        const PROJECTILE_LIST1 = [
            {name: "수비 표창", value: "15"},
            {name: "월비 표창, 눈덩이", value: "17"},
            {name: "목비 표창, 나무팽이", value: "19"},
            {name: "금비 표창, 고드름", value: "21"},
            {name: "토비 표창", value: "23"},
            {name: "뇌전 수리검", value: "25"},
            {name: "일비 표창", value: "27"},
        ];
        const PROJECTILE_LIST2 = [
            {name: "나무 화살", value: "0"},
            {name: "청동 화살", value: "1"},
        ];
        if (classes === "bowman") {
            PROJECTILE_LIST2.forEach(option => {
                let optionElement = document.createElement("option");
                optionElement.value = option.value;
                optionElement.text = option.name;
                statInput.appendChild(optionElement);
            });
        } else if (jobs === "assassin") {
            PROJECTILE_LIST1.forEach(option => {
                let optionElement = document.createElement("option");
                optionElement.value = option.value;
                optionElement.text = option.name;
                statInput.appendChild(optionElement);
            });      
        }
    } else {
        statInput = document.createElement("input");
        statInput.type = "number";
        statInput.min = "0";
        statInput.max = "9999";
        switch (statName) {
            case "lvl":
                statInput.min = "1";
                statInput.max = "200";
                break;
            case ("str" || "dex" || "int" || "luk"):
                statInput.min = "4"; 
                break;
            case "totalmagic":
                statInput.title = "스탯창에 표시된 마력"
                break;
            default:
                break;
        }
    }
    statInput.id = statName;
    statInput.classList.add("stat", statName);
    statInput.oninput = statsChangedThenUpdate;   
    
    let lineBreak = document.createElement("br");

    return { label: statLabel, input: statInput, lineBreak: lineBreak };
}

function displayName(name) {
    const nameMapping = {
      "lvl": "레벨", "str": "STR", "dex": "DEX", "int": "INT", "luk": "LUK",
      "wa": "무기 공격력", "pa": "투사체 선택", "aa": "방어구 공격력", "ab": "도핑", "totalmagic": "총 마력",
    };
  
    return nameMapping[name] || statName;
}

function loadUserStats() {
    const userLvl = parseInt(document.getElementById("lvl").value) || 0;

    const strElement = document.getElementById("str");
    const dexElement = document.getElementById("dex");
    const intElement = document.getElementById("int");
    const lukElement = document.getElementById("luk");
    const waElement = document.getElementById("wa");
    const paElement = document.getElementById("pa");
    const aaElement = document.getElementById("aa");
    const abElement = document.getElementById("ab");
    const totalmagicElement = document.getElementById("totalmagic");

    const str = strElement ? parseInt(strElement.value) || 0 : 4;
    const dex = dexElement ? parseInt(dexElement.value) || 0 : 4;
    const int = intElement ? parseInt(intElement.value) || 0 : 4;
    const luk = lukElement ? parseInt(lukElement.value) || 0 : 4;
    const wa = waElement ? parseInt(waElement.value) || 0 : 0;
    const pa = paElement ? parseInt(paElement.value) || 0 : 0;
    const aa = aaElement ? parseInt(aaElement.value) || 0 : 0;
    const ab = abElement ? parseInt(abElement.value) || 0 : 0;
    const totalmagic = totalmagicElement ? parseInt(totalmagicElement.value) || 0 : 0;
    
    const totalATT = wa + pa + aa + ab;

    return { userLvl, str, dex, int, luk, totalmagic, totalATT };
} 

function calcRange(stats) {
    let classes = document.getElementById("classes").value;
    let jobs = document.getElementById("jobs").value;

    let masteryElement = document.getElementById("value3Display");
    let mastery = masteryElement ? parseFloat(masteryElement.innerText)/100 || 0.1 : 0.1;
    let maxRange, minRange, maxRange2, minRange2;

    if (classes == "warrior") {
        switch (jobs) {
            case "one_handed_sword":
                maxRange = Math.floor((stats.str*ONE_HANDED_SWORD+stats.dex)*stats.totalATT/100);
                minRange = Math.floor((stats.str*ONE_HANDED_SWORD*0.9*mastery+stats.dex)*stats.totalATT/100);
                break;
            case "two_handed_sword":
                maxRange = Math.floor((stats.str*TWO_HANDED_SWORD+stats.dex)*stats.totalATT/100);
                minRange = Math.floor((stats.str*TWO_HANDED_SWORD*0.9*mastery+stats.dex)*stats.totalATT/100);
                break;
            case "spear":
                maxRange = Math.floor((stats.str*SPEAR_STAB+stats.dex)*stats.totalATT/100);
                maxRange2 = Math.floor((stats.str*SPEAR_SWING+stats.dex)*stats.totalATT/100);
                minRange = Math.floor((stats.str*SPEAR_SWING*0.9*mastery+stats.dex)*stats.totalATT/100);
                minRange2 = Math.floor((stats.str*SPEAR_STAB*0.9*mastery+stats.dex)*stats.totalATT/100);
                break;
            case "polearm":
                maxRange = Math.floor((stats.str*POLEARM_SWING+stats.dex)*stats.totalATT/100);
                maxRange2 = Math.floor((stats.str*POLEARM_STAB+stats.dex)*stats.totalATT/100);
                minRange = Math.floor((stats.str*POLEARM_STAB*0.9*mastery+stats.dex)*stats.totalATT/100);
                minRange2 = Math.floor((stats.str*POLEARM_SWING*0.9*mastery+stats.dex)*stats.totalATT/100);
                break;
            case "one_handed_axe":
                maxRange = Math.floor((stats.str*ONE_HANDED_AXE_SWING+stats.dex)*stats.totalATT/100);
                maxRange2 = Math.floor((stats.str*ONE_HANDED_AXE_STAB+stats.dex)*stats.totalATT/100);
                minRange = Math.floor((stats.str*ONE_HANDED_AXE_STAB*0.9*mastery+stats.dex)*stats.totalATT/100);
                minRange2 = Math.floor((stats.str*ONE_HANDED_AXE_SWING*0.9*mastery+stats.dex)*stats.totalATT/100);
                break;
            case "two_handed_axe":
                maxRange = Math.floor((stats.str*TWO_HANDED_AXE_SWING+stats.dex)*stats.totalATT/100);
                maxRange2 = Math.floor((stats.str*TWO_HANDED_AXE_STAB+stats.dex)*stats.totalATT/100);
                minRange = Math.floor((stats.str*TWO_HANDED_AXE_STAB*0.9*mastery+stats.dex)*stats.totalATT/100);
                minRange2 = Math.floor((stats.str*TWO_HANDED_AXE_SWING*0.9*mastery+stats.dex)*stats.totalATT/100);
                break;
        }
    } else if (classes == "bowman") {
        switch (jobs) {
            case "bow":
                maxRange = Math.floor((stats.dex*BOW+stats.str)*stats.totalATT/100);
                minRange = Math.floor((stats.dex*BOW*0.9*mastery+stats.str)*stats.totalATT/100);
                break;
            case "crossbow":
                maxRange = Math.floor((stats.dex*CROSSBOW+stats.str)*stats.totalATT/100);
                minRange = Math.floor((stats.dex*CROSSBOW*0.9*mastery+stats.str)*stats.totalATT/100);
                break;
        }
    } else {
        maxRange = Math.floor((stats.luk*DAGGER+stats.str+stats.dex)*stats.totalATT/100) || 1;
        minRange = Math.floor((stats.luk*DAGGER*0.9*mastery+stats.str+stats.dex)*stats.totalATT/100) || 1;
    }

    if (classes != "magician") {
        let div1 = document.getElementsByClassName("statleft")[0];

        let maxRangeLabel = document.createElement("span");
        maxRangeLabel.id = "maxRange";
        div1.appendChild(maxRangeLabel);
        let minRangeLabel = document.createElement("span");
        minRangeLabel.id = "minRange";
        div1.appendChild(minRangeLabel);

        document.getElementById("maxRange").innerHTML = "<br>" + "최대 스공 : " + maxRange + "<br>";
        document.getElementById("minRange").innerHTML = "최소 스공 : " + minRange;
    }
    
    displayDamage(stats.userLvl, stats.int, stats.luk, stats.totalmagic, stats.totalATT, maxRange, minRange, maxRange2, minRange2) ;
}

// 스킬 영역
let skillsContainer = document.getElementById("skills");
let skillsTable = document.createElement("table");

function initialSetting() {
    while (skillsContainer.firstChild) {
        skillsContainer.removeChild(skillsContainer.firstChild);
    }

    let skillsLegend = document.createElement("legend");
    skillsLegend.textContent = "스킬 선택";
    skillsContainer.appendChild(skillsLegend);

    document.getElementById('maxDamage').innerText = "최대 : ";
    document.getElementById('minDamage').innerText = "최소 : ";
    document.getElementById('maxCritDamage').innerText = "최대 : ";
    document.getElementById('minCritDamage').innerText = "최소 : ";

    // let HitProbElements = [];
    for (let i=0; i<10; i++) {
        let HitProbElement = document.createElement("p");
        HitProbElement.id = "HitProb" + i;
        HitProbElement.className = "HitProbElement";
        HitProbElement.style.display = "block";
        document.getElementById("probs").appendChild(HitProbElement);
        // HitProbElements.push(HitProbElement);
    }
}


/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩   스킬 영역   ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
let isSkillSwapped = false;

function swapSkills(skills) {
    let jobs = document.getElementById("jobs").value;
    let temp = skills.attackSkill_1;
    skills.attackSkill_1 = skills.attackSkill_2;
    skills.attackSkill_2 = temp;

    isSkillSwapped = !isSkillSwapped;
    updateSkills(skills);
    if (jobs == "one_dimension" || jobs == "cleric" && isSkillSwapped == false || jobs == "thief") {
        document.getElementById('finalDamage').style.display = "none";
        document.getElementById('maxCritDamage').style.display = "none";
        document.getElementById('minCritDamage').style.display = "none";
    } else {
        document.getElementById('finalDamage').style.display = "initial";
        document.getElementById('maxCritDamage').style.display = "initial";
        document.getElementById('minCritDamage').style.display = "initial";
    }
}

function updateSkills(skills) {
    initialSetting();
    let classes = document.getElementById("classes").value;

    if (skills.attackSkill_2) {
        let skillsButton = document.createElement("button");
        skillsButton.textContent = "스킬 바꾸기";
        skillsButton.addEventListener("click", function(event) {
            event.preventDefault();
            swapSkills(skills);
        });
        skillsContainer.appendChild(skillsButton);
    }

    let { attackSkill_1, attackSkill_2, buffSkill, masterySkill } = skills;
    
    let tableHTML = "<table>";
    tableHTML += "<tr>"; // 1행
    tableHTML += "<td>" + attackSkill_1[1] + "</td>";
    tableHTML += "<td>" + inputSelectToTable(attackSkill_1, "attackSkill_1") + "</td>";
    if (attackSkill_1[1] !== "홀리 에로우") {
        buffSkill && (tableHTML += "<td>" + buffSkill[1] + "</td>");
        buffSkill && (tableHTML += "<td>" + inputSelectToTable(buffSkill, "buffSkill") + "</td>");
    }
    masterySkill && (tableHTML += "<td>" + masterySkill[1] + "</td>");
    masterySkill && (tableHTML += "<td>" + inputSelectToTable(masterySkill, "masterySkill") + "</td>");
    tableHTML += "</tr>";

    tableHTML += "<tr>"; // 2행
    tableHTML += "<td>" + Object.keys(attackSkill_1[0][1])[1] + "</td>";
    tableHTML += "<td id='value1Display'></td>";
    if (attackSkill_1[1] !== "홀리 에로우") {
        buffSkill && (tableHTML += "<td>" + Object.keys(buffSkill[0][1])[1] + "</td>");
        buffSkill && (tableHTML += "<td id='value2Display'></td>");
    }
    masterySkill && (tableHTML += "<td>" + Object.keys(masterySkill[0][1])[1] + "</td>");
    masterySkill && (tableHTML += "<td id='value3Display'></td>");
    tableHTML += "</tr>";
    
    if (!(attackSkill_1[1] == "힐" || attackSkill_1[1] == "더블 스탭")) {
        tableHTML += "<tr>"; // 3행
        tableHTML += "<td>";
        Object.keys(attackSkill_1[0][1])[2] && (tableHTML += Object.keys(attackSkill_1[0][1])[2]);
        tableHTML += "</td>";
        tableHTML += "<td id='value4Display'></td>";
        buffSkill && Object.keys(buffSkill[0][1])[2] && (tableHTML += "<td>" + Object.keys(buffSkill[0][1])[2] + "</td>");
        buffSkill && Object.keys(buffSkill[0][1])[2] && (tableHTML += "<td id='value5Display'></td>");
        if (classes == "warrior" || classes == "bowman" || attackSkill_1[1] == "럭키 세븐" || attackSkill_1[1] == "새비지 블로우") {
            tableHTML += "<td></td><td></td>";
        }
        tableHTML += "</tr>";
    }
    tableHTML += "</table>";

    skillsTable.innerHTML = tableHTML;
    skillsContainer.appendChild(skillsTable);

    let selectElement1 = document.getElementById("attackSkill_1");
    let selectElement2 = document.getElementById("buffSkill");
    let selectElement3 = document.getElementById("masterySkill");

    addChangeListenerAndUpdateDisplay(selectElement1, attackSkill_1, 1, "value1Display");
    if (attackSkill_1[1] !== "홀리 에로우") {
        buffSkill && addChangeListenerAndUpdateDisplay(selectElement2, buffSkill, 1, "value2Display");
    }
    masterySkill && addChangeListenerAndUpdateDisplay(selectElement3, masterySkill, 1, "value3Display");
    if (!(attackSkill_1[1] == "힐" || attackSkill_1[1] == "더블 스탭")) {
        addChangeListenerAndUpdateDisplay(selectElement1, attackSkill_1, 2, "value4Display");
        addChangeListenerAndUpdateDisplay(selectElement2, buffSkill, 2, "value5Display");
    }
}

function addChangeListenerAndUpdateDisplay(selectElement, skillList, selectedKeyIndex, displayId) {
    if (!document.getElementById(displayId).textContent.trim()) {
        let initialValue = getValueForSelectedLevel(skillList, selectElement.id, selectedKeyIndex);
        // if (!((classes == "magician" && (Object.keys(skillList[0][1])[1] == "대미지" || Object.keys(buffSkill[0][1])[1] == "계수")) || classes == "rogue" && Object.keys(attackSkill_1[0][1])[2] == "타수")) {
        if (initialValue < 10) {
            initialValue && !isNaN(initialValue) && (document.getElementById(displayId).textContent = Math.round(initialValue*100) + "%");
        } else {
            initialValue && !isNaN(initialValue) && (document.getElementById(displayId).textContent = initialValue/100);
        }

    }
    selectElement.addEventListener("change", function () {
        let selectedValue = getValueForSelectedLevel(skillList, selectElement.id, selectedKeyIndex);
        if (selectedValue < 10) {
            selectedValue && !isNaN(selectedValue) && (document.getElementById(displayId).textContent = Math.round(selectedValue*100) + "%");
        } else {    
            selectedValue && !isNaN(selectedValue) && (document.getElementById(displayId).textContent = selectedValue/100);
        }
        skillSelectedThenUpdate();
    });
}

function inputSelectToTable(list, selectId) {
    let selectHTML = "<select id='" + selectId + "'>";
    list[0].forEach(option => {
        selectHTML += "<option value='" + option.레벨 + "'>" + option.레벨 + "</option>";
    });
    selectHTML += "</select>";

    return selectHTML;
}

function getValueForSelectedLevel(selectedSkill, selectId, selectedKeyIndex) {
    // selectId에 해당하는 select 엘리먼트를 가져옴
    let selectElement = document.getElementById(selectId);
    // 선택된 옵션의 값(레벨 정보가 문자열로 들어있음)을 가져옴
    let selectedLevel = selectElement.value;
    // 문자열을 파싱하여 숫자로 변환
    selectedLevel = parseInt(selectedLevel, 10);
    let selectedValue = Object.values(selectedSkill[0].find(option => option.레벨 === selectedLevel))[selectedKeyIndex];
    
    return selectedValue;
}

function selectSkills() {
    let classes = document.getElementById("classes").value;
    let jobs = document.getElementById("jobs").value;
    let attackSkill_1;
    let attackSkill_2
    let buffSkill;
    let masterySkill;
    
    switch (classes) {
        case "warrior":
            attackSkill_1 = [power_strike, "파워 스트라이크"];
            attackSkill_2 = [slash_blast, "슬래시 블래스트"];
            buffSkill = [final_attack, "파이널 어택"];
            masterySkill = [weapon_mastery, "마스터리"];
            break;
        case "magician":
            buffSkill = null;
            masterySkill = null;
            switch (jobs) {
                case "one_dimension":
                    attackSkill_1 = [magic_claw, "매직 클로"];
                    attackSkill_2 = [energy_bolt, "에너지 볼트"];
                    break;
                case "fire":
                    attackSkill_1 = [fire_arrow, "파이어 에로우"];
                    attackSkill_2 = null;
                    break;
                case "ice":
                    attackSkill_1 = [thunder_bolt, "썬더볼트"];
                    attackSkill_2 = [cold_beam, "콜드 빔"];
                    break;
                case "cleric":
                    attackSkill_1 = [heal, "힐"];
                    attackSkill_2 = [holy_arrow, "홀리 에로우"];
                    buffSkill = [heal_target, "타겟 수"];
                    break;
                default:
                    break;
            }
            break;
        case "bowman":
            buffSkill = [critical_shot, "크리티컬 샷"];
            masterySkill = [weapon_mastery, "마스터리"];
            let attackSkill_3;
            switch (jobs) {
                case "bow":
                    attackSkill_1 = [double_shot, "더블 샷"];
                    attackSkill_2 = [arrow_bomb, "에로우 봄"];
                    break;
                case "crossbow":
                    attackSkill_1 = [double_shot, "더블 샷"];
                    attackSkill_2 = [iron_arrow, "아이언 에로우"];
                    break;
            }
            break;
        case "rogue":
            masterySkill = [weapon_mastery, "마스터리"];
            switch (jobs) {
                case "assassin":
                    attackSkill_1 = [lucky_seven, "럭키 세븐"];
                    attackSkill_2 = null;
                    buffSkill = [critical_throw, "크리티컬 스로우"];
                    break;
                case "thief":
                    attackSkill_1 = [double_stab, "더블 스탭"];
                    attackSkill_2 = [savage_blow, "새비지 블로우"];
                    buffSkill = null;
                    break;
            }
            break;
    }

    return { attackSkill_1, attackSkill_2, buffSkill, masterySkill };
}
console.log(monsterlist[0].district)


/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩   몬스터 영역   ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
const districtName = ["빅토리아 아일랜드", "미출시", "오르비스", "엘나스"];

for (let i=0; i<4; i++) {
    let optgroup = document.createElement("optgroup");
    optgroup.label = districtName[i];

    for (let j=0; j<monsterlist.length; j++) {
        if (monsterlist[j].district == districtName[i]) {
            let option = document.createElement("option");
            option.value = j;
            option.text = "LV." + monsterlist[j].level + " " + monsterlist[j].name;
            optgroup.appendChild(option);
        }
    }
    monsterSelect.appendChild(optgroup);
}

function createMonsterStats() {
    let classes = document.getElementById("classes").value;

    let selectedIndex = monsterSelect.value;
    let selectedArray = monsterlist[selectedIndex];

    let tableHTML = "<table border='1'>";

    tableHTML += "<tr>";
    tableHTML += "<td>레벨</td><td>체력</td>";
    if (classes == "magician") {
        tableHTML += "<td>마방</td>";
    } else {
        tableHTML += "<td>물방</td>";
    }
    tableHTML += "<td>회피</td><td>경험치</td>";
    tableHTML += "</tr>";

    tableHTML += "<tr>";
    tableHTML += "<td id='monsterLvl'></td><td = id='monsterHp'></td>";
    if (classes == "magician") {
        tableHTML += "<td id='mdef'></td>";
    } else {
        tableHTML += "<td id='wdef'></td>";
    }
    tableHTML += "<td id='avoid'></td><td id='exp'></td>";
    tableHTML += "</tr>";
    tableHTML += "</table>";

    monsterStatsTable.innerHTML = tableHTML;

    document.getElementById("monsterLvl").textContent = selectedArray.level;
    document.getElementById("monsterHp").textContent = selectedArray.hp;
    (classes == "magician") && (document.getElementById("mdef").textContent = selectedArray.mdef);
    (classes != "magician") && (document.getElementById("wdef").textContent = selectedArray.wdef);
    document.getElementById("avoid").textContent = selectedArray.avoid;
    document.getElementById("exp").textContent = selectedArray.exp;

    // 속성 확인
    let monsterElement = document.createElement("span");
    monsterElement.id = "elem";
    monsterElement.textContent = selectedArray.elem;
    monsterElement.style.display = "none";
    monsterStatsTable.appendChild(monsterElement);
    // 언데드 확인
    let monsterUndead = document.createElement("span");
    monsterUndead.id = "undead";
    monsterUndead.textContent = selectedArray.undead;
    monsterUndead.style.display = "none";
    monsterStatsTable.appendChild(monsterUndead);
}


/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩   대미지 영역   ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
function displayDamage(userLvl, int, luk, totalmagic, totalATT, maxRange, minRange, maxRange2, minRange2) {
    let classes = document.getElementById("classes").value;
    let jobs = document.getElementById("jobs").value;

    const monsterLvl = parseInt(document.getElementById("monsterLvl").innerText);
    const wdefElement = document.getElementById("wdef");
    const wdef = wdefElement ? parseInt(wdefElement.innerText) : 0;
    const mdefElement = document.getElementById("mdef");
    const mdef = mdefElement ? parseInt(mdefElement.innerText) : 0;
    const elem = document.getElementById("elem").innerText;

    const BASIC_DAMAGE_Element = document.getElementById("value1Display");
    let BASIC_DAMAGE;
    if (classes == "magician") {
        BASIC_DAMAGE = BASIC_DAMAGE_Element ? parseFloat(BASIC_DAMAGE_Element.innerText) : 0;
    } else {
        BASIC_DAMAGE = BASIC_DAMAGE_Element ? parseFloat(BASIC_DAMAGE_Element.innerText)/100 : 0;
    }
    const MAGIC_MASTERY_Element = document.getElementById("value4Display");
    const MAGIC_MASTERY = MAGIC_MASTERY_Element ? parseFloat(MAGIC_MASTERY_Element.innerText)/100 : 0.1;
    const CRIT_DAMAGE_Element = document.getElementById("value5Display");
    const CRIT_DAMAGE = CRIT_DAMAGE_Element ? parseFloat(CRIT_DAMAGE_Element.innerText)/100 || 1 : 1;
    const CRIT_PROB_Element = document.getElementById("value2Display");
    const CRIT_PROB = CRIT_PROB_Element ? parseFloat(CRIT_PROB_Element.innerText)/100 : 4;
    console.log("확인해야",BASIC_DAMAGE,MAGIC_MASTERY,CRIT_DAMAGE,CRIT_PROB)
    let d = 0;
    if(monsterLvl > userLvl) {
        d = monsterLvl - userLvl;
    }

    let maxDamage, minDamage, maxCritDamage, minCritDamage, finalDamage, maxDamage2, minDamage2, maxCritDamage2, minCritDamage2;
    let maxCritDamage3, maxCritDamage4, minCritDamage3, minCritDamage4;
    let maxMagicDamage = (0.0033665*Math.pow(totalmagic, 2)+3.3*totalmagic+0.5*int)*BASIC_DAMAGE/100;
    let minMagicDamage = (0.0033665*Math.pow(totalmagic, 2)+0.9*MAGIC_MASTERY*3.3*totalmagic+0.5*int)*BASIC_DAMAGE/100;
    let maxSubtractMdef = 0.5*mdef*(1+0.01*d);
    let minSubtractMdef = 0.6*mdef*(1+0.01*d);

    maxDamage = Math.floor((maxRange*(1-0.01*d)-0.5*wdef)*BASIC_DAMAGE);
    minDamage = Math.floor((minRange*(1-0.01*d)-0.6*wdef)*BASIC_DAMAGE);
    switch (classes) {
        case "warrior":
            maxCritDamage = Math.floor((maxRange*(1-0.01*d)-0.5*wdef)*(BASIC_DAMAGE+CRIT_DAMAGE));
            minCritDamage = Math.floor((minRange*(1-0.01*d)-0.6*wdef)*(BASIC_DAMAGE+CRIT_DAMAGE));
            maxDamage2 = Math.floor((maxRange2*(1-0.01*d)-0.5*wdef)*BASIC_DAMAGE);
            minDamage2 = Math.floor((minRange2*(1-0.01*d)-0.6*wdef)*BASIC_DAMAGE);
            maxCritDamage2 = Math.floor((maxRange2*(1-0.01*d)-0.5*wdef)*(BASIC_DAMAGE+CRIT_DAMAGE));
            minCritDamage2 = Math.floor((minRange2*(1-0.01*d)-0.6*wdef)*(BASIC_DAMAGE+CRIT_DAMAGE));
            maxCritDamage4 = Math.floor((maxRange2*(1-0.01*d)-0.5*wdef)*BASIC_DAMAGE + (maxRange*(1-0.01*d)-0.5*wdef)*CRIT_DAMAGE);
            minCritDamage4 = Math.floor((minRange*(1-0.01*d)-0.6*wdef)*BASIC_DAMAGE + (minRange2*(1-0.01*d)-0.6*wdef)*CRIT_DAMAGE);
            maxCritDamage3 = Math.floor((maxRange*(1-0.01*d)-0.5*wdef)*BASIC_DAMAGE + (maxRange2*(1-0.01*d)-0.5*wdef)*CRIT_DAMAGE);
            minCritDamage3 = Math.floor((minRange2*(1-0.01*d)-0.6*wdef)*BASIC_DAMAGE + (minRange*(1-0.01*d)-0.6*wdef)*CRIT_DAMAGE);
            finalDamage = "파이널 어택 포함";
            break;
        case "magician":
            maxDamage = Math.floor(maxMagicDamage - maxSubtractMdef);
            minDamage = Math.floor(minMagicDamage - minSubtractMdef);
            finalDamage = "";
            switch (jobs) {
                case "fire":
                    if (elem.indexOf("F3") !== -1) {
                        maxCritDamage = Math.floor(1.5*maxMagicDamage - maxSubtractMdef);
                        minCritDamage = Math.floor(1.5*minMagicDamage - minSubtractMdef);
                        finalDamage = "불 속성 대미지 증폭";
                    } else if (elem.indexOf("F2") !== -1) {
                        maxCritDamage = Math.floor(0.5*maxMagicDamage - maxSubtractMdef);
                        minCritDamage = Math.floor(0.5*minMagicDamage - minSubtractMdef);
                        finalDamage = "불 속성 대미지 반감";
                    } else {
                        maxCritDamage = maxDamage;
                        minCritDamage = minDamage;
                        finalDamage = "불 속성 대미지 적용×";
                    } break;
                case "ice":
                    if (isSkillSwapped == false) {
                        if (elem.indexOf("L3") !== -1) {
                            maxCritDamage = Math.floor(1.5*maxMagicDamage - maxSubtractMdef);
                            minCritDamage = Math.floor(1.5*minMagicDamage - minSubtractMdef);
                            finalDamage = "전기 속성 대미지 증폭";
                        } else if (elem.indexOf("L2") !== -1) {
                            maxCritDamage = Math.floor(0.5*maxMagicDamage - maxSubtractMdef);
                            minCritDamage = Math.floor(0.5*minMagicDamage - minSubtractMdef);
                            finalDamage = "전기 속성 대미지 반감";
                        } else {
                            maxCritDamage = maxDamage;
                            minCritDamage = minDamage;
                            finalDamage = "전기 속성 대미지 적용×";
                        } break;
                    } else {
                        if (elem.indexOf("I3") !== -1) {
                            maxCritDamage = Math.floor(1.5*maxMagicDamage - maxSubtractMdef);
                            minCritDamage = Math.floor(1.5*minMagicDamage - minSubtractMdef);
                            finalDamage = "얼음 속성 대미지 증폭";
                        } else if (elem.indexOf("I2") !== -1) {
                            maxCritDamage = Math.floor(0.5*maxMagicDamage - maxSubtractMdef);
                            minCritDamage = Math.floor(0.5*minMagicDamage - minSubtractMdef);
                            finalDamage = "얼음 속성 대미지 반감";
                        } else {
                            maxCritDamage = maxDamage;
                            minCritDamage = minDamage;
                            finalDamage = "얼음 속성 대미지 적용×";
                        } break;
                    }
                case "cleric":
                    if (isSkillSwapped == false) {
                        maxDamage = Math.floor((int*1.2+luk)*totalmagic/1000*CRIT_PROB*BASIC_DAMAGE - maxSubtractMdef);
                        minDamage = Math.floor((int*0.3+luk)*totalmagic/1000*CRIT_PROB*BASIC_DAMAGE - minSubtractMdef);
                        maxCritDamage = maxDamage;
                        minCritDamage = minDamage;
                        break;
                    } else {
                        if (elem.indexOf("H3") !== -1) {
                            maxCritDamage = Math.floor(1.5*maxMagicDamage - maxSubtractMdef);
                            minCritDamage = Math.floor(1.5*minMagicDamage - minSubtractMdef);
                            finalDamage = "성 속성 대미지 증폭";
                        } else if (elem.indexOf("H2") !== -1) {
                            maxCritDamage = Math.floor(0.5*maxMagicDamage - maxSubtractMdef);
                            minCritDamage = Math.floor(0.5*minMagicDamage - minSubtractMdef);
                            finalDamage = "성 속성 대미지 반감";
                        } else {
                            maxCritDamage = maxDamage;
                            minCritDamage = minDamage;
                            finalDamage = "성 속성 대미지 적용×";
                        } break;
                    }
                default:
                    maxCritDamage = maxDamage;
                    minCritDamage = minDamage;
                    break;
            }
            break;
        case "bowman":
            maxCritDamage = Math.floor((maxRange*(1-0.01*d)-0.5*wdef)*(BASIC_DAMAGE+CRIT_DAMAGE-1));
            minCritDamage = Math.floor((minRange*(1-0.01*d)-0.6*wdef)*(BASIC_DAMAGE+CRIT_DAMAGE-1));
            finalDamage = "크리티컬";
            break;
        case "rogue":
            finalDamage = "";
            if (jobs == "assassin") {
                maxDamage = Math.floor((5.0*luk*totalATT/100*(1-0.01*d)-0.5*wdef)*BASIC_DAMAGE);
                minDamage = Math.floor((2.5*luk*totalATT/100*(1-0.01*d)-0.6*wdef)*BASIC_DAMAGE);
                maxCritDamage = Math.floor((5.0*luk*totalATT/100*(1-0.01*d)-0.5*wdef)*(BASIC_DAMAGE+CRIT_DAMAGE-1));
                minCritDamage = Math.floor((2.5*luk*totalATT/100*(1-0.01*d)-0.6*wdef)*(BASIC_DAMAGE+CRIT_DAMAGE-1));
                finalDamage = "크리티컬";
            } else {
                maxCritDamage = maxDamage;
                minCritDamage = minDamage;
            } break;
    }

    let confirmDamageLowerLimit = [maxDamage, minDamage, maxCritDamage, minCritDamage];
    for (i=0; i<confirmDamageLowerLimit.length; i++) {
        if (confirmDamageLowerLimit[i] < 1) {
            confirmDamageLowerLimit[i] = 1;
        }
    }
    [maxDamage, minDamage, maxCritDamage, minCritDamage] = confirmDamageLowerLimit;

    // 클레릭인 경우, 언데드가 아니면 "miss" 반환
    let undead = document.getElementById("undead").innerText;
    if (jobs == "cleric" && isSkillSwapped == false && undead == 0) {
        maxDamage = "힐 안 통함"
        minDamage = "힐 안 통함"
        maxCritDamage = "힐 안 통함"
        minCritDamage = "힐 안 통함"
    }
    console.log(maxDamage2, minDamage2)
    document.getElementById('finalDamage').innerText = finalDamage;
    document.getElementById('maxDamage').innerText = "최대 : " + maxDamage;
    document.getElementById('minDamage').innerText = "최소 : " + minDamage;
    document.getElementById('maxCritDamage').innerText = "최대 : " + maxCritDamage;
    document.getElementById('minCritDamage').innerText = "최소 : " + minCritDamage;

    if (jobs == "one_dimension" || jobs == "cleric" && isSkillSwapped == false || jobs == "thief") {
        document.getElementById('finalDamage').style.display = "none";
        document.getElementById('maxCritDamage').style.display = "none";
        document.getElementById('minCritDamage').style.display = "none";
    } else {
        document.getElementById('finalDamage').style.display = "initial";
        document.getElementById('maxCritDamage').style.display = "initial";
        document.getElementById('minCritDamage').style.display = "initial";
    }

    if (maxDamage !== 0) {
        displayProb(maxDamage, minDamage, maxCritDamage, minCritDamage, CRIT_PROB, maxDamage2, minDamage2,
            maxCritDamage2, maxCritDamage3, maxCritDamage4, minCritDamage2, minCritDamage3, minCritDamage4);
    }
}


/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩   확률 영역   ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
/* ▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩▩ */
function calcSingleProbability(a, b, h) {
    result = (b-h) / (b-a);
    if (result < 0) {
        result = 0;
    } else if (result > 1 ) {
        result = 1;
    }
    return result;
}

function calcDoubleProbability(a, b, h) {
    if (2*a > h) { return 1; }
    else if (h > 2*b) { return 0; }
    else if (a+b < h) {
        return 0.5 * Math.pow((2*b-h)/(b-a), 2);
    }
    return 1 - 0.5 * Math.pow((h-2*a)/(b-a), 2);
}

function standardNormalCDF(x) {
    const t = 1 / (1 + 0.2316419 * Math.abs(x));
    const d = 0.3989423 * Math.exp(-x * x / 2);

    const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));

    if (x > 0) {
        return 1 - p;
    } else {
        return p;
    }
}

function normalCDF(x, mean, stdDev) {
    const z = (x - mean) / stdDev;
    return standardNormalCDF(z);
}

function factorial(r) {
    let s = 1;
    while (r > 1) s *= r--;
    return s;
}
  
function combinations(n, r) {
    let s = 1;
    let i = r;
    while (i < n) s *= ++i;
    return s / factorial(n - r);
}

function calcMultipleProbability(n, a, b, c, d, h, p) {
    let result = 0;
    for (i=0; i<n+1; i++) {
        result += combinations(n, i) * Math.pow(p, i) * Math.pow(1-p, n-i)
                * (1 - normalCDF(h, (n-i)/2*(a+b) + i/2*(c+d), Math.sqrt(((n-i)*Math.pow(b-a, 2) + i*Math.pow(d-c, 2))/11.5)));
    }
    return result;
}

function displayProb(maxDamage, minDamage, maxCritDamage, minCritDamage, CRIT_PROB, maxDamage2, minDamage2,
    maxCritDamage2, maxCritDamage3, maxCritDamage4, minCritDamage2, minCritDamage3, minCritDamage4) {
    let classes = document.getElementById("classes").value;
    let jobs = document.getElementById("jobs").value;
    const attackSkillName = document.getElementById('skills').getElementsByTagName('table')[0].rows[0].cells[0].textContent;
    const monsterHp = parseInt(document.getElementById("monsterHp").innerText);
    const MEAN_of_MAX = (maxDamage + maxCritDamage) / 2;
    const MEAN_of_MIN = (minDamage + minCritDamage) / 2;

    let HitProb7 = [];
    console.log(classes)
    if (classes == "warrior") {
        switch (jobs) {
            case "one_handed_sword":
            case "two_handed_sword":
                HitProb7[0] = (1-CRIT_PROB)*calcSingleProbability(minDamage, maxDamage, monsterHp)
                + CRIT_PROB*calcSingleProbability(minCritDamage, maxCritDamage, monsterHp);
                HitProb7[1] = Math.pow(1-CRIT_PROB, 2) * calcDoubleProbability(minDamage, maxDamage, monsterHp)
                + 2*CRIT_PROB*(1-CRIT_PROB) * calcDoubleProbability(MEAN_of_MIN, MEAN_of_MAX, monsterHp)
                + Math.pow(CRIT_PROB, 2) * calcDoubleProbability(minCritDamage, maxCritDamage, monsterHp);
                for (let i=2; i<10; i++) {
                    HitProb7[i] = calcMultipleProbability(i+1, minDamage, maxDamage, minCritDamage, maxCritDamage, monsterHp, CRIT_PROB);
                }
                break;
            case "spear":
                HitProb7[0] = 0.4*(1-CRIT_PROB)*calcSingleProbability(minDamage2, maxDamage, monsterHp) 
                + 0.36*CRIT_PROB*calcSingleProbability(minCritDamage, maxCritDamage2, monsterHp)
                + 0.24*CRIT_PROB*calcSingleProbability(minCritDamage4, maxCritDamage4, monsterHp)
                + 0.6*(1-CRIT_PROB)*calcSingleProbability(minDamage, maxDamage2, monsterHp)
                + 0.24*CRIT_PROB*calcSingleProbability(minCritDamage3, maxCritDamage3, monsterHp)
                + 0.16*CRIT_PROB*calcSingleProbability(minCritDamage2, maxCritDamage, monsterHp);
                for (let i=1; i<10; i++) {
                    HitProb7[i] = 0.6*calcMultipleProbability(i+1, minDamage, maxDamage2, minCritDamage, maxCritDamage2, monsterHp, CRIT_PROB)
                    + 0.4*calcMultipleProbability(i+1, minDamage2, maxDamage, minCritDamage2, maxCritDamage, monsterHp, CRIT_PROB)
                }
                break;
            case "polearm":
            case "one_handed_axe":
            case "two_handed_axe":
                HitProb7[0] = 0.6*(1-CRIT_PROB)*calcSingleProbability(minDamage2, maxDamage, monsterHp) 
                + 0.16*CRIT_PROB*calcSingleProbability(minCritDamage, maxCritDamage2, monsterHp)
                + 0.24*CRIT_PROB*calcSingleProbability(minCritDamage4, maxCritDamage4, monsterHp)
                + 0.4*(1-CRIT_PROB)*calcSingleProbability(minDamage, maxDamage2, monsterHp)
                + 0.24*CRIT_PROB*calcSingleProbability(minCritDamage3, maxCritDamage3, monsterHp)
                + 0.36*CRIT_PROB*calcSingleProbability(minCritDamage2, maxCritDamage, monsterHp);
                for (let i=1; i<10; i++) {
                    HitProb7[i] = 0.4*calcMultipleProbability(i+1, minDamage, maxDamage2, minCritDamage, maxCritDamage2, monsterHp, CRIT_PROB)
                    + 0.6*calcMultipleProbability(i+1, minDamage2, maxDamage, minCritDamage2, maxCritDamage, monsterHp, CRIT_PROB)
                }
                break;
        }
        console.log("6")
    } else {
        switch (attackSkillName) {
            case "매직 클로":
            case "더블 스탭":
                HitProb7[0] = calcDoubleProbability(minDamage, maxDamage, monsterHp);
                for (let i=1; i<10; i++) {
                    HitProb7[i] = 1 - normalCDF(monsterHp, (i+1)*(minDamage+maxDamage), Math.sqrt((2*(i+1)*Math.pow(minDamage-maxDamage, 2))/11.5))
                }
                console.log("1")
                break;
            case "더블 샷":
            case "럭키 세븐":
                HitProb7[0] = Math.pow(1-CRIT_PROB, 2) * calcDoubleProbability(minDamage, maxDamage, monsterHp)
                + 2*CRIT_PROB*(1-CRIT_PROB) * calcDoubleProbability(MEAN_of_MIN, MEAN_of_MAX, monsterHp)
                + Math.pow(CRIT_PROB, 2) * calcDoubleProbability(minCritDamage, maxCritDamage, monsterHp);
                for (let i=1; i<10; i++) {
                    HitProb7[i] = calcMultipleProbability(2*i+2, minDamage, maxDamage, minCritDamage, maxCritDamage, monsterHp, CRIT_PROB);
                }
                console.log("2")
                break;
            case "새비지 블로우":
                const MAGIC_MASTERY = parseFloat(document.getElementById("value4Display").innerText);
                console.log(MAGIC_MASTERY)
                if (MAGIC_MASTERY == "2") {
                    HitProb7[0] = calcDoubleProbability(minDamage, maxDamage, monsterHp);
                    for (let i=1; i<10; i++) {
                        HitProb7[i] = calcMultipleProbability(2*i+2, minDamage, maxDamage, minCritDamage, maxCritDamage, monsterHp, CRIT_PROB);
                    }
                    break;
                } else if (MAGIC_MASTERY == "4") {
                    for (let i=0; i<10; i++) {
                        HitProb7[i] = 1 - normalCDF(monsterHp, 2*(i+1)*(minDamage+maxDamage), Math.sqrt((4*(i+1)*Math.pow(minDamage-maxDamage, 2))/11.5))
                    }
                    break;
                } else {
                    for (let i=0; i<10; i++) {
                        HitProb7[i] = 1 - normalCDF(monsterHp, 3*(i+1)*(minDamage+maxDamage), Math.sqrt((6*(i+1)*Math.pow(minDamage-maxDamage, 2))/11.5))
                    }
                    break;
                }
            case "에로우 봄":
            case "아이언 에로우":
                HitProb7[0] = (1-CRIT_PROB)*calcSingleProbability(minDamage, maxDamage, monsterHp)
                + CRIT_PROB*calcSingleProbability(minCritDamage, maxCritDamage, monsterHp);
                HitProb7[1] = Math.pow(1-CRIT_PROB, 2) * calcDoubleProbability(minDamage, maxDamage, monsterHp)
                + 2*CRIT_PROB*(1-CRIT_PROB) * calcDoubleProbability(MEAN_of_MIN, MEAN_of_MAX, monsterHp)
                + Math.pow(CRIT_PROB, 2) * calcDoubleProbability(minCritDamage, maxCritDamage, monsterHp);
                for (let i=2; i<10; i++) {
                    HitProb7[i] = calcMultipleProbability(i+1, minDamage, maxDamage, minCritDamage, maxCritDamage, monsterHp, CRIT_PROB);
                }
                break;
            default: // 에너지볼트, 법사2차
                HitProb7[0] = calcSingleProbability(minCritDamage, maxCritDamage, monsterHp);
                HitProb7[1] = calcDoubleProbability(minCritDamage, maxCritDamage, monsterHp);
                for (let i=2; i<10; i++) {
                    HitProb7[i] = 1 - normalCDF(monsterHp, (i+1)*(minDamage+maxDamage)/2, Math.sqrt(((i+1)*Math.pow(minDamage-maxDamage, 2))/11.5))
                }
                console.log("4")
                break;
        }
        console.log("5")
    }
    console.log(CRIT_PROB, minCritDamage, HitProb7, attackSkillName)
    for (let i=0; i<10; i++) {
        if (HitProb7[i] < 0) {
            HitProb7[i] = 0;
        } else if (HitProb7[i] > 1) {
            HitProb7[i] = 1;
        }
    }

    let HitProb = [HitProb7[0]];

    for (let i = 1; i < 10; i++) {
        let product = 1;
        for (let j = 0; j < i; j++) {
            product *= (1 - HitProb7[j]);
        }
        HitProb.push(product * HitProb7[i]);
    }

    for (let i=0; i<10; i++) {
        document.getElementById("HitProb"+i).innerText = i+1 + "방컷 : " + (100*HitProb[i]).toFixed(2) + "%";
        if (HitProb[i] < 0.0001 || isNaN(HitProb[i])) {
            document.getElementById("HitProb"+i).style.display = "none";
        } else {
            document.getElementById("HitProb"+i).style.display = "block";
        }
    }
}