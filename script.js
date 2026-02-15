window.onload = function(){
  const modal = document.getElementById("registration-modal");
  const done = document.getElementById("done");

  const teamInput = document.getElementById("team");
  const tagInput = document.getElementById("tag");
  const p1 = document.getElementById("p1");
  const p2 = document.getElementById("p2");
  const p3 = document.getElementById("p3");
  const p4 = document.getElementById("p4");
  const igl = document.getElementById("igl");
  const sponsor = document.getElementById("sponsor");

  const teamsDiv = document.getElementById("teams");
  const teamCount = document.getElementById("team-count");
  const leaderboardDiv = document.getElementById("leaderboard");

  let teams = [];

  window.openDash = function(){ modal.classList.remove("hidden"); }
  window.closeDash = function(){ modal.classList.add("hidden"); }

  window.submitTeam = function(){
    if(!teamInput.value || !p1.value){ alert("Fill team name and Player 1"); return; }
    const group = String.fromCharCode(65 + (teams.length % 3));
    const newTeam = {
      name: teamInput.value,
      tag: tagInput.value,
      players: [p1.value,p2.value,p3.value,p4.value].filter(p=>p),
      igl: igl.value,
      sponsor: sponsor.value,
      group: group,
      matchesPlayed:0,
      points:0
    };
    teams.push(newTeam);
    renderTeams();
    renderLeaderboard();
    closeDash();
    done.classList.remove("hidden");
    setTimeout(()=>{done.classList.add("hidden");},3000);
    teamInput.value=""; tagInput.value=""; p1.value=""; p2.value=""; p3.value=""; p4.value="";
    igl.value=""; sponsor.value="";
  }

  function renderTeams(){
    teamsDiv.innerHTML="";
    teams.forEach(t=>{
      const div = document.createElement("div");
      div.className="team-card";
      div.innerHTML=<b>${t.name} [${t.tag}]</b><br>Group: ${t.group}<br>Players: ${t.players.join(", ")};
      teamsDiv.appendChild(div);
    });
    teamCount.innerText = teams.length;
  }

  function renderLeaderboard(){
    leaderboardDiv.innerHTML="";
    teams.sort((a,b)=>b.points - a.points).forEach(t=>{
      const div = document.createElement("div");
      div.className="team-card";
      div.innerHTML=<b>${t.name}</b> - Points: ${t.points} | Matches: ${t.matchesPlayed};
      leaderboardDiv.appendChild(div);
    });
  }

  // Countdown
  const timer = document.getElementById("timer");
  const target = new Date("Feb 20, 2026 00:00:00").getTime();
  setInterval(()=>{
    let d = target - new Date().getTime();
    if(d<=0){timer.innerHTML="Tournament Started!"; return;}
    timer.innerHTML = Math.floor(d/86400000)+"d "+
                      Math.floor(d%86400000/3600000)+"h "+
                      Math.floor(d%3600000/60000)+"m "+
                      Math.floor(d%60000/1000)+"s";
  },1000);
}
