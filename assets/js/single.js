const $issueContainer = document.querySelector("#issues-container");
const $warningContainer = document.querySelector("#limit-warning");
const $repoName = document.querySelector("#repo-name");



const getRepoName = function() {
    const queryString = document.location.search;
    const repoName = queryString.split("=")[1];
    if (repoName) {
        $repoName.textContent = repoName;
        getRepoIssues(repoName);
    }
    else
    {
        document.location.replace("./index.html");
    }
    
}

let getRepoIssues = function (repo) {

    let apiUrl = "https://api.github.com/repos/"+repo+"/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                displayIssues(data);

                // Check if API has too many items
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        } 
        else // if not succesfull
        {
            document.location.replace("./index.html");
        }
    });
};

let displayIssues = function(issues) {
    if (issues.length === 0) {
        $issueContainer.textContent = "This repo has no open issues!";
        return;
    }
    for (let i = 0; i <issues.length; i++) {
        let $issue = document.createElement("a");
        $issue.classList = "list-item flex-row justify-space-between align-center";
        $issue.setAttribute("href", issues[i].html_url);
        $issue.setAttribute("target","_blank");

        let $title = document.createElement("span");
        $title.textContent = issues[i].title;
        $issue.appendChild($title);

        let $type = document.createElement("span");
        if (issues[i].pull_request) {
            $type.textContent = "(Pull Request)";
        }
        else
        {
            $type.textContent = "(Issue)";
        }
        $issue.appendChild($type);

        $issueContainer.appendChild($issue);
    }
};

let displayWarning = function(repo) {
    $warningContainer.textContent = "to see more than 30 issues, visit ";
    let $link = document.createElement("a");
    $link.textContent = "this page on GitHub.com";
    $link.setAttribute("href", "https://github.com/" + repo + "/issues");
    $link.setAttribute("target", "_blank");

    $warningContainer.appendChild($link);
}
getRepoName();
