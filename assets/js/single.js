const $issueContainer = document.querySelector("#issues-container");

let getRepoIssues = function (repo) {
    let apiUrl = "https://api.github.com/repos/"+repo+"/issues?direction=asc";
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data){
                displayIssues(data);
            });
        } 
        else
        {
            alert("There was a problem with your request!");
        }
    });
};

let displayIssues = function(issues) {
    if (issues.length === 0) {
        $issueContainer.textContent = "This repo has no open issues!";
        return;
    }
    console.log(issues);
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
        console.log($issue);
        console.log($issueContainer);
        $issueContainer.appendChild($issue);
    }
};

getRepoIssues("palminski/git-it-done");