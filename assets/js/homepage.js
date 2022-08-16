let $userForm = document.querySelector("#user-form"); //form
let $nameInput = document.querySelector("#username"); //input field

const $languageButtons = document.querySelector("#language-buttons"); //Language buttons

let $repoContainer = document.querySelector("#repos-container"); //Div Containing Repos
let repoSearchTerm = document.querySelector("#repo-search-term"); //Span

const formSubmitHandler = function(event) {
    event.preventDefault();
    let username = $nameInput.value.trim();
    if (username) {
        getUserRepos(username);
        $nameInput.value = "";
    } else {
        alert("please enter a github username");
    }
}

const getUserRepos = function(user) {
    //format the Github API url
    let apiUrl = "https://api.github.com/users/"+user+"/repos";

    //Make a request to the URL
    fetch(apiUrl).then(function(response){
        if (response.ok) { //Response OK
            response.json().then(function(data){
                displayRepos(data,user);
            });
        }else{
            alert("error: GitHub user not found")
        } 
    })
    .catch(function(error) { //This is getting chained onto the then() method above
        alert("unable to connect to GitHub");
    });
};

const getFeaturedRepos = function(language) { //Featured REPOS
    let apiUrl = `https://api.github.com/search/repositories?q=${language}+is:featured&sort=help-wanted-issues`;
    fetch(apiUrl).then(function(res){
        if (res.ok) {
            res.json().then(function(data){
                displayRepos(data.items, language);
            })
        } 
        else
        {
            alert("ERROR git hub user not found");
        }
    });
};

const displayRepos = function(repos, searchTerm) {
    //Check to see if there are any repos
    if (repos.length === 0) {
        $repoContainer.textContent = "no Repos Found"
        return;
    }
    // clear old content
    $repoContainer.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    for (let i = 0;i<repos.length; i++) {
        //Format repos name
        let repoName = repos[i].owner.login + " / " + repos[i].name;
        let querryParameterRepoName = repos[i].owner.login + "/" + repos[i].name;

        //container for each repo
        let $repo = document.createElement("a");
        $repo.classList = "list-item flex-row justify-space-between align-center";
        $repo.setAttribute("href", "./single-repo.html?repo=" + querryParameterRepoName);

        //create a span to hold repo name
        let $title = document.createElement("span");
        $title.textContent = repoName;

        //append to container
        $repo.appendChild($title);

        //Status element
        let $status = document.createElement("span");
        $status.classList = "flex-row align center";
        //Check if repo has issues
        if (repos[i].open_issues_count > 0) {
            $status.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + "issue(s)";
        } else {
            $status.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        //appent to container
        $repo.appendChild($status);

        //append container to dom
        $repoContainer.appendChild($repo);
    }
}

const buttonClickHandler = function(event) {
    let language = event.target.getAttribute("data-language")
    if (language) {
        getFeaturedRepos(language);
        $repoContainer.textContent="";
    }
}

$userForm.addEventListener("submit",formSubmitHandler);
$languageButtons.addEventListener("click",buttonClickHandler);