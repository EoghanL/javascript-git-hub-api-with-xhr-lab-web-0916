// function getRepositories(){
//   let response = ""
//   let name = $("#userName").val()
//   debugger
//   $.ajax({
//     url: `https://api.github.com/users/${name}/repos`
//   }).done(function(data){ response = data })
//   debugger
//   alert(`${response}`)
// }
let constName = ""
function getRepositories(){
  event.preventDefault()
  const req = new XMLHttpRequest()
  let name = $('#userName').val()
  url = `${name}`
  req.addEventListener("load", showRepositories);
  req.open("GET", `https://api.github.com/users/${name}/repos`)
  req.send()
}

function showRepositories(event, data) {
  var repos = JSON.parse(this.responseText)
  console.log(repos)
  const repoList = `<ul>${repos.map(r => '<li>' + r.name + ' - <a href="#" data-repo="' + r.name + '" onclick="getCommits(this)"> Get Commits </a><a href="#" data-repo="' + r.name +'" onclick="getBranches(this)"> Get Branches </a></li>').join('')}</ul>`
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showCommits);
  req.open("GET", `https://api.github.com/repos/${url}/` + name + '/commits')
  req.send()
}

function showCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.slice(1).map(commit => '<li>' + commit.commit.author.name + ': <strong>' + commit.committer.login + '</strong> - ' + commit.commit.message + '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el){
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", showBranches)
  req.open("GET", `https://api.github.com/repos/${url}/` + name + '/branches')
  req.send()
}
function showBranches() {
  debugger
  const branches = JSON.parse(this.responseText)
  const branchList = `<ul>${branches.map(branch => '<li>' + branch.name + '</li>')}`
  document.getElementById("details").innerHTML = branchList
}
