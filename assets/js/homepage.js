const getUserRepos = function(user) {
    //format the Github API url
    let apiUrl = "https://api.github.com/users/"+user+"/repos";

    //Make a request to the URL
    fetch(apiUrl).then(function(response){
        response.json().then(function(data){
            console.log(data);
        });
    });
};

getUserRepos("palminski");