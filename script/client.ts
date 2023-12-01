const TARGET = "http://localhost:3000/team";
const TEAM_ID = ["team1", "team2", "team3"];

function post(teamId: string, data: string): void {
  const url = `${TARGET}/${teamId}`;
  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => {
      if (response.ok) {
        return response.text();
      }
      throw new Error("Network response was not ok.");
    })
    .then((text) => {
      console.log(teamId, text);
    })
    .catch((error) => {
      console.error(error);
    });
}

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const main = async () => {
  for (let i = 0; i < 100; i++) {
    const randomTeamId = TEAM_ID[Math.floor(Math.random() * TEAM_ID.length)];
    post(randomTeamId, Math.random().toString(36).slice(2));
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
};

main();
