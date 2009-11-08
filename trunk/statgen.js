/*   Statgenerator for MUME (VIII)

     Based on VrAK's javascript. Modified by Jahara 10/7/2001 for an added
     age support. Practice percentage support added 4/2/2002 by Jahara from
     Mandor's Stat Generator which happens to also have code by Frn in it.

     - 11/08/2009 cleaned up code, removed filter
     - 10/18/2008 fixed age
     - 10/7/2008 new track % code from Ahura
     - 5/27/2002 Added Stat List     

*/
<!--//////////////// VARIABLES AFTER THIS LINE ////////////////////
var MUMEVERSION      = 8;
var maxPoints        = 175;
var oldPointsLeft    = 175;
var newPointsLeft    = 175;
var maxValue         = 18;
var minValue         = 8;
var statCosts        = new Array(55, 45, 36, 28, 21, 15, 10,  6,  3, 1, 0);
var statValues       = new Array(18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8);
var typeStats        = new Array("Str:", "Int:", "Wis:", "Dex:", "Con:", "Wil:", "Per:");
var startStats       = new Array(8, 8, 8, 8, 8, 8, 8);
var oldTmpStats      = new Array(8, 8, 8, 8, 8, 8, 8);
var newTmpStats      = new Array(8, 8, 8, 8, 8, 8, 8);
var oldRaceModifiers = new Array(0, 0, 0, 0, 0, 0, 0);
var newRaceModifiers = new Array(0, 0, 0, 0, 0, 0, 0);
var oldPlayerRace    = "Man";
var newPlayerRace    = "Man";
var oldAgeModifiers  = new Array(0, 0, 0, 0, 0, 0, 0);
var newAgeModifiers  = new Array(0, 0, 0, 0, 0, 0, 0);
var oldPlayerAge     = 0;
var newPlayerAge     = 0;
var oldLifeRange     = 1;
var newLifeRange     = 1;
var ageBrackets      = new Array(0, 18, 24, 32, 40, 50, 65, 90);
var partialReroll    = false;
var currentSelect    = "oldTmpStats";

//////////////// SUBRUTINES AFTER THIS LINE ////////////////////-->

function copyStats() {
    for (var i = 1; i <= newTmpStats.length; i++) {
	eval("newTmpStats[i-1] = oldTmpStats[i-1]");
    }
    changeRace(oldPlayerRace,'new');
    eval("document.statForm.new_race.value = oldPlayerRace");
    changeAge(oldPlayerAge,'new');
    eval("document.statForm.new_age.value = oldPlayerAge");
    updateDisplay();
}

function clearStats(column) {
    for (var i = 1; i <= 7; i++) {
	eval(column+"TmpStats[i-1] = 8");
    }
    eval("changeRace('Man','"+column+"')");
    eval("document.statForm."+column+"_race.value = 'Man'");
    eval("changeAge('0','"+column+"')");
    eval("document.statForm."+column+"_age.value = 0");
    updateDisplay();
}

function selectGroup(selection) {
    eval("currentSelect = selection");
    updateDisplay();
}

function displayPercent() {
    var str = 0;
    var inte = 0;
    var wis = 0;
    var dex = 0;
    var con = 0;
    var wil = 0;
    var per = 0;
    if (currentSelect == "newTmpStats") {
	str=newTmpStats[0]+newRaceModifiers[0];
	inte=newTmpStats[1]+newRaceModifiers[1];
	wis=newTmpStats[2]+newRaceModifiers[2];
	dex=newTmpStats[3]+newRaceModifiers[3];
	con=newTmpStats[4]+newRaceModifiers[4];
	wil=newTmpStats[5]+newRaceModifiers[5];
	per=newTmpStats[6]+newRaceModifiers[6];
    }
    else if (currentSelect == "oldTmpStats") {
	str=oldTmpStats[0]+oldRaceModifiers[0];
	inte=oldTmpStats[1]+oldRaceModifiers[1];
	wis=oldTmpStats[2]+oldRaceModifiers[2];
	dex=oldTmpStats[3]+oldRaceModifiers[3];
	con=oldTmpStats[4]+oldRaceModifiers[4];
	wil=oldTmpStats[5]+oldRaceModifiers[5];
	per=oldTmpStats[6]+oldRaceModifiers[6];
    }
    document.frn.hps.value=(2.6+0.375*con)*25.1;
    document.frn.hpsb.value=(2.6+0.375*con)*25.1*0.8495;
    var mana = 4*inte+4*wis-15;
    document.frn.manap.value= mana;
    document.frn.manapb.value = mana;
    document.frn.awareness.value=20+3.75*per+2.6*inte;
    document.frn.climb.value=16+3*dex+2*wil+1.25*str;
    document.frn.first.value=18+3.75*inte+2.5*dex;
    document.frn.leadership.value=20+3.75*wil+2.5*wis;
    document.frn.ride.value=18+3.75*dex+2.5*wil;
    document.frn.swim.value=18+3*con+2*wil+1.33*dex;
    //		document.frn.trackold.value=20+3.75*per+2.5*inte;
    //		document.frn.track.value=3.21*inte+4.1*per+5.41; // old code
    document.frn.track.value=Math.round(2.5*inte+3.8*per+16.9);
    //		document.frn.wildernessold.value=20+3.75*str+2.5*wil;
    document.frn.wilderness.value=4.2*str+5.5*wil-22.3;
    document.frn.bash.value= 50+1.67*str+dex+0.67*wil;
    document.frn.cleaving.value=50+1.56*str+dex+0.67*wil;
    var consmi = 50+1.56*str+con+0.67*wil;
    document.frn.concussion.value=consmi;
    document.frn.smite.value=consmi;
    document.frn.endurance.value=48+2.2*con+1.3*wil;
    document.frn.parry.value=50+1.56*dex+per+0.67*str;
    document.frn.rescue.value=52+1.4*dex+wil+0.67*str;
    var ss = 50+1.56*str+dex+0.67*per;
    document.frn.slashing.value= ss;
    document.frn.stabbing.value=ss;
    var bdsesh = 45+2*dex+1.25*per;
    document.frn.backstab.value=bdsesh;
    document.frn.dodge.value=bdsesh;
    document.frn.sneak.value=bdsesh;
    document.frn.escape.value=bdsesh;
    document.frn.steal.value=bdsesh;
    document.frn.hide.value=bdsesh;
    document.frn.attack.value=45+2*dex+1.25*wil;
    document.frn.missile.value=45+2*per+1.25*dex;
    document.frn.pick.value=45+2*inte+1.25*dex;
    document.frn.search.value=45+2*inte+1.25*per;
    document.frn.piercing.value=46+1.4*dex+per+0.67*str;
    document.frn.envenom.value=32+2*dex+1.25*inte;
    var det = 50+1.5*inte+wis+0.67*per;
    document.frn.detectmagic.value= det;
    document.frn.burninghands.value=det;
    document.frn.burninghands2.value=det;
    document.frn.burninghands3.value=det;
    document.frn.lightningbolt.value=det;
    document.frn.lightningbolt2.value=det;
    document.frn.lightningbolt3.value=det;
    document.frn.lightningbolt4.value=det;
    document.frn.calllightning.value=det;
    var loc = 50+1.5*inte+wis+0.67*wil;
    document.frn.locate.value=loc;
    document.frn.locate2.value=loc;
    document.frn.locate3.value=loc;
    var create = 50+2*inte+1.25*wis;
    document.frn.createlight.value= create;
    document.frn.armour.value=create;
    document.frn.armour2.value=create;
    document.frn.armour3.value=create;
    document.frn.armour4.value=create;
    document.frn.enchant.value=create;
    document.frn.shroud.value=create;
    var create2 = 50+2*inte+1.25*wil;
    document.frn.blockdoor.value=create2;
    document.frn.teleport.value=create2;
    document.frn.dispelmagic.value=create2;
    document.frn.dispelmagic2.value=create2;
    document.frn.charm.value=create2;
    document.frn.charm2.value=create2;
    var cure =50+1.875*wis+1.25*inte;
    document.frn.curelight.value=cure;
    document.frn.cure.value=cure;
    document.frn.cure2.value=cure;
    document.frn.cure3.value=cure;
    document.frn.cure4.value=cure;
    document.frn.cure5.value=cure;
    document.frn.heal.value=cure;
    document.frn.heal2.value=cure;
    document.frn.sanctuary.value=cure;
    document.frn.create.value=cure;
    document.frn.create2.value=cure;
    document.frn.bob.value=cure;
    document.frn.bob2.value=cure;
    document.frn.bless.value=45+1.5*wis+inte+0.67*wil;
    document.frn.senselife.value=37.5+1.5*wis+inte+0.67*wil;
    var blind = 50+1.875*wis+1.25*wil;
    document.frn.blindness.value= blind;
    document.frn.removecurse.value=blind;
    document.frn.removecurse2.value=blind;
    document.frn.dispelevil.value=blind;
    document.frn.fear.value=blind;
    document.frn.summon.value=blind;
    document.frn.transfer.value=blind;
    document.frn.transfer2.value=blind;
}

function alter(column, stat) {
    newStat = Math.abs(eval("document.statForm."+ column +"_stat"+ stat +".value") - eval(column+"AgeModifiers["+ (stat - 1) +"]") - eval(column+"RaceModifiers["+ (stat - 1) +"]"));
    if (newStat <= maxValue && newStat >= minValue) {
	tmpStats = eval(column+"TmpStats");
	newCost = statsCost(tmpStats) - statCost(tmpStats[stat - 1]) + statCost(newStat);
	if (newCost <= maxPoints) {
	    if (partialReroll) {
				
	    } else {
		tmpStats[stat - 1] = newStat;
	    }
	}
    }
    updateDisplay();
}

function inc(column,stat) {
    tmpStats = eval(column+"TmpStats");
    if (tmpStats[stat - 1] < maxValue) {
	newCost = statsCost(tmpStats) - statCost(tmpStats[stat -1]) + statCost(tmpStats[stat-1] +1);
	if (newCost <= maxPoints) {
	    if (partialReroll) {
				
	    } else {
		tmpStats[stat - 1]++;
	    }
	}
    }
    updateDisplay();
}
function dec(column,stat) {
    tmpStats = eval(column+"TmpStats");
    if (tmpStats[stat - 1] > minValue) {
	eval(column+"PointsLeft += statCost(tmpStats[stat -1])");
	tmpStats[stat - 1]--;
	eval(column+"PointsLeft -= statCost(tmpStats[stat -1])");
    }
    updateDisplay();
}

function statCost(statValue) {
    for (var i = 0; i < statValues.length; i++) {
	if (statValue == statValues[i]) {return statCosts[i]};
    }
    return -1;
}

function statsCost(theStats) {
    var statSum = 0;
    for (var i = 0; i < theStats.length; i++) {
	statSum += statCost(theStats[i]);
    }
    return statSum;
}

function computeDiff() {
    var diff = 0;	
    for (var i = 0; i < oldTmpStats.length; i++) {
	t1 = oldTmpStats[i] - newTmpStats[i];
	if (t1 == 0) {
	    t2 = 0;
	    t3 = 0;
	} else {
	    t2 = Math.abs(t1);
	    if (t2 > 1) {
		t3 = (t2 ^ (5/4));
	    }
	    else {
		t3=1;
	    }
	}
	diff += t3;
    }
    return Math.floor(diff/0.07);
}

function updateDisplay() {
    for (var i = 1; i <= oldTmpStats.length; i++) {
	eval("document.statForm.old_stat"+ i +".value = oldTmpStats[i-1] + oldRaceModifiers[i-1] + oldAgeModifiers[i-1]");
    }
    for (var i = 1; i <= newTmpStats.length; i++) {
	eval("document.statForm.new_stat"+ i +".value = newTmpStats[i-1] + newRaceModifiers[i-1] + newAgeModifiers[i-1]");
    }
    document.statForm.old_ptsleft.value    = maxPoints - statsCost(oldTmpStats);
    document.statForm.new_ptsleft.value    = maxPoints - statsCost(newTmpStats);
    document.statForm.pts_difference.value = computeDiff();
    
    //	DISPLAYS PRACTICE PERCENTAGES	
    displayPercent();
}

function changeRace(race,column) {
    eval(column+"PlayerRace = race");
    raceModifiers = new Array( 0,  0,  0,  0,  0,  0,  0);
    var lifeRange = 0;
  
    if (race == "Dwarf") { raceModifiers = new Array( 1,  0, -1, -1,  1,  1, -1); lifeRange = 2; }
    if (race == "Noldo") { raceModifiers = new Array(-1,  1,  0,  1, -1, -1,  1); lifeRange = 3.5; }
    if (race == "Sinda") { raceModifiers = new Array(-1,  1,  0,  1, -1, -1,  1); lifeRange = 3; }
    if (race == "Silvan") { raceModifiers = new Array(-1,  1,  0,  1, -1, -1,  1); lifeRange = 2.5; }
    if (race == "Half-Elf") { raceModifiers = new Array(-1,  0,  1,  0,  0,  0,  0); lifeRange = 2; }
    if (race == "Hobbit") { raceModifiers = new Array(-2, -1,  0,  1,  1,  1,  0); lifeRange = 1.5; }
    if (race == "Man") { raceModifiers = new Array( 0,  0,  0,  0,  0,  0,  0); lifeRange = 1; }
    if (race == "Dunadan") { raceModifiers = new Array( 0,  0,  0,  0,  0,  0,  0); lifeRange = 1.5; }
    if (race == "BN") { raceModifiers = new Array( 0,  0, -1,  0,  0, -2,  0); lifeRange = 1.5; } 
    if (race == "Orc") { raceModifiers = new Array( 2, -3, -2,  0,  2, -2,  0); lifeRange = 2; }
    if (race == "Troll") { raceModifiers = new Array( 7, -3, -3, -3,  4, -3, -2); lifeRange = 2; }
    

    eval(column+"RaceModifiers = raceModifiers");
    eval(column+"LifeRange = lifeRange");
	
    eval("var age = "+column+"PlayerAge");
    changeAge(age,column);

}

function changeAge(age,column) {
    eval(column+"PlayerAge = age");
    eval("lifeRange = "+column+"LifeRange");

    if (age == "0") {ageModifiers = new Array( 0,  0,  0,  0,  0,  0,  0);}
    if (age == "1") {ageModifiers = new Array( 0,  1, -1,  1,  0,  1,  1);}
    if (age == "2") {ageModifiers = new Array( 1,  1,  0,  1,  1,  1,  1);}
    if (age == "3") {ageModifiers = new Array( 1,  1,  0,  0,  1,  1,  0);}
    if (age == "4") {ageModifiers = new Array( 0,  0,  1,  0,  0,  1,  0);}
    if (age == "5") {ageModifiers = new Array(-1,  0,  1, -1,  0,  1, -1);}
    if (age == "6") {ageModifiers = new Array(-1,  0,  2, -2, -1,  0, -2);}
    if (age == "7") {ageModifiers = new Array(-2, -1,  2, -3, -2,  0, -3);}

    if (age == "0") {
	    var currentAge = "x" + lifeRange;
    }
    else {
	var firstAge = lifeRange * ageBrackets[age];
	if (age == "7") {
	    var currentAge = firstAge +"+";
	}
	else {
	    var secondAge = (lifeRange * ageBrackets[++age]) -1;
	    var currentAge = "(" + firstAge + "-" + secondAge + ")";
	}
    }
    eval("document.statForm."+column+"AgeRange.value = \""+currentAge+"\"");
    
    eval(column+"AgeModifiers = ageModifiers");
    updateDisplay();

}

function addStatsToListT(column) {
    tmpStats = eval(column+"TmpStats");
    var tmp = "";
    var sum = 0;
    for (var i = 0;i < tmpStats.length; i++) {
	tmp += typeStats[i];
	sum = tmpStats[i] + eval(column+"RaceModifiers[i]");
	if (sum < 10) {
	    sum = " " + sum;
	}
	if (i != 6) tmp += sum + " ";
	else tmp +=  sum + ".";
    }
    eval("document.statForm.statListT.value = tmp + \"  (\" + "+column+"PlayerRace + \")\\n\" + document.statForm.statListT.value");
    document.statForm.statListT.value.fixed();
	   
}

//////////////// NO MORE JAVASCRIPT!!! //////////////////////////-->
