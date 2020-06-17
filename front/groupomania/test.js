const url = 'http://localhost:3000/user';

async function getUser() {
    let response = await fetch(url);
    let data = await response.json()
    .then((data) => {
        console.log(data)
    })
    return data;
}

getUser();