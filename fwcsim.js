function Team (teamName) {
    this.teamName = teamName;
    this.points = 0;
    this.goalsFor = [];
    this.goalsAgainst = [];
    this.total = 0;
}

function Group (ID) {
    this.id = ID;
    this.teams = [];
}

var groupTeams = [];
var teamNames = [   
    "Russia","Saudi Arabia","Egypt","Uruguay", 
    "Portugal","Spain", "Morrocco", "Iran",
    "France", "Australia", "Peru", "Denmark",
    "Argentina","Iceland", "Croatia","Nigeria",
    "Brazil","Switzerland","Costa Rica","Serbia",
    "Germany","Mexico","Sweden","South Korea",
    "Belgium","Panama","Tunisia","England",
    "Poland","Senegal","Colombia","Japan"
];

function buildGroupTeams() {
    for (let i = 0, j = 0; i < teamNames.length; i += 4, j++) {
        let id = String.fromCharCode(j + 65);
        let g = new Group(id);
        let ts = teamNames.slice(i, i + 4);
        ts.forEach( function(t) {
            let nt = new Team(t);
            g.teams.push(nt);
        });
        groupTeams.push(g);
    }
}

var roundOfSixteenTeams = [];
var quarterFinalTeams = [];
var semiFinalTeams = [];
var finalTeams = [];
var consolationTeams = [];

// see https://wiki.q-researchsoftware.com/wiki/How_to_Generate_Random_Numbers:_Poisson_Distribution
function score() {
    var mean = 1.2;
    var L = Math.exp(-mean);
    var p = 1.0;
    var k = 0;

    do {
        k++;
        p *= Math.random();
    } while (p > L);

    return k - 1;
}
function groupPlay() {
    console.log("Group Play");
    groupTeams.forEach(playGroupRound);
}

function playGroupRound(group) {
    console.log("");
    console.log("==================================================");
    
    console.log("Group: " + group.id);

    // Round robin play
    // Day 1: 0 => 1, 2 => 3
    game(0, group.teams[0], group.teams[1]);
    game(0, group.teams[1], group.teams[2]);

    // Day 2: 0 => 2, 1 => 3
    game(1, group.teams[0], group.teams[2]);
    game(1, group.teams[1], group.teams[3]);

    // Day 3: 0 => 3, 1 => 2
    game(2, group.teams[0], group.teams[3]);
    game(2, group.teams[1], group.teams[2]);

    // sort teams by points
    group.teams.sort(function(t1, t2){
        if (t2.points < t1.points) {
            return -1;
        }
        if (t2.points > t1.points) {
            return 1;
        }

        // break tie

        return t2.total - t1.total;
    });

    console.log("End of round results:");
    group.teams.forEach( function(t) {
        console.log(t.teamName + ": " + t.points);
    })

    // assign teams for round of 16
    let winners = group.teams.slice(0,2);
    roundOfSixteenTeams.push(winners);
}

function game(round, t1, t2) {
    var msg;
    t1.goalsFor[round] = score();
    t2.goalsFor[round] = score();

    t1.total += t1.scores[round];
    t2.total += t2.scores[round];

    if (t1.scores[round] > t2.scores[round]) {
        t1.points += 3;
        msg = t1.teamName + " beat " + t2.teamName + ", "
            + t1.scores[round] + " to " + t2.scores[round];
    } 
    else if (t1.scores[round] < t2.scores[round]) {
        t2.points += 3;
        msg = t2.teamName + " beat " + t1.teamName + ", "
            + t2.scores[round] + " to " + t1.scores[round];
    } 
    else {
        // must be a draw
        t1.points += 1;
        t2.points += 1;
        msg = t1.teamName + " tied " + t2.teamName + ", "
        + t1.scores[round] + " each";
    }

    console.log(msg);
}

function roundOfSixteen() {
    console.log("Play Round of Sixteen");
}

function quarterFinal() {
    console.log("Play Quarter Final");
}

function semiFinal() {
    console.log("Play Semi Final")
}

function consolation() {
    console.log("Play Consolation Game");

}

function final() {
    console.log("Play Final")
}

function awardTrophies() {
    console.log("Award Trophies");
}

function tournament() {
    console.log("Play the tournament!");
    buildGroupTeams();
    groupPlay();
    roundOfSixteen();
    quarterFinal();
    semiFinal();
    final();
    awardTrophies();
}

tournament();