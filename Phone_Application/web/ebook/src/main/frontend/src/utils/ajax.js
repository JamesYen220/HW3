let postRequestForm = (url, data, callback) => {

    let form = new FormData();

    for (let p in data){
        if(data.hasOwnProperty(p))
            form.append(p, data[p]);
    }

    let opts = {
        method: "POST",
        body: form,
        credentials: "include"
    };

    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
           console.log(error);
        });
};

let postRequest = (url, json, callback) => {

    let opts = {
        method: "POST",
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: "include"
    };

    //A Promise object is simply a wrapper around a value that may or may not be known when the object is instantiated
    // and provides a method for handling the value after it is known (also known as resolved ) or is unavailable for a
    // failure reason (we'll refer to this as rejected ).
    fetch(url,opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            callback(data);
        })
        .catch((error) => {
            console.log(error);
        });
};

export {postRequest,postRequestForm};
