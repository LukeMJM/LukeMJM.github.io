var api_key = "81ba539f1128347b30ab1dcd555bc9d4";

fetch("http://api.openweathermap.org/data/2.5/group?id=524901,703448,2643743&appid=81ba539f1128347b30ab1dcd555bc9d4")
    .then(res => {
        if (res.ok) {
            console.log("SUCCESS")
                res.json()
                .then(data => console.log(data))
                .catch(error => console.log("ERROR"))
        } else {
            console.log("NOT SUCCESSFUL")
        }
    })