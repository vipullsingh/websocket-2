// connect to the WebSocket server
const socket = io();

// get the candidate list container element
const candidateList = document.getElementById("candidates");

// keep track of the user's vote
let userVote = null;

// listen for updates on the candidate list
socket.on("updateCandidates", (candidates) => {
  // clear the candidate list
  candidateList.innerHTML = "";

  // generate the candidate list HTML
  candidates.forEach((candidate) => {
    const candidateDiv = document.createElement("div");
    candidateDiv.classList.add("candidate");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = candidate.name;
    candidateDiv.appendChild(nameSpan);

    const voteCountSpan = document.createElement("span");
    voteCountSpan.textContent = candidate.votes;
    candidateDiv.appendChild(voteCountSpan);

    const voteButton = document.createElement("button");
    voteButton.textContent = "Vote";
    voteButton.disabled = userVote !== null;
    voteButton.addEventListener("click", () => {
      // send the vote to the server
      socket.emit("vote", candidate.id);
      userVote = candidate.id;

      // disable all vote buttons
      const voteButtons = document.querySelectorAll(".candidate button");
      voteButtons.forEach((button) => {
        button.disabled = true;
      });
    });
    candidateDiv.appendChild(voteButton);

    candidateList.appendChild(candidateDiv);
  });
});

// listen for updates on the user's vote
socket.on("updateVote", (vote) => {
  userVote = vote;
});

// listen for updates on the vote count
socket.on("updateVotes", (votes) => {
  // update the vote count for each candidate
  const candidateDivs = document.querySelectorAll(".candidate");
  candidateDivs.forEach((candidateDiv) => {
    const candidateId = candidateDiv.querySelector("button").dataset.id;
    const voteCountSpan = candidateDiv.querySelector("span:last-child");
    const voteCount = votes[candidateId] || 0;
    voteCountSpan.textContent = voteCount;
  });
});
