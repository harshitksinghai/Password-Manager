function maskPassword(password){
    let str = ""
    for(let i=0; i<password.length; i++){
        str += "*"
    }
    return str
}


function copyText(txt){
    navigator.clipboard.writeText(txt).then(
        () => {
            document.getElementById("alert").style.display = "inline"
            setTimeout(() => {
                document.getElementById("alert").style.display = "none"
            }, 2000)
        },
        () => {
            alert(`Failed to copy ${txt} text!`)
        },

    )
    
}


deleteEntry = (website) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data)

    let newArr = arr.filter((e)=>{
        return e.website != website
    })

    localStorage.setItem("passwords", JSON.stringify(newArr))
    alert(`Successfully deleted ${website}'s password!`)
    showPasswords()
}


showPasswords = () => {
    let table = document.querySelector(".passwords")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length == 0) {
        table.innerHTML = "No Data to Show"
    }
    else {
        let arr = JSON.parse(data)
        let str = ""
        table.innerHTML = `<tr>
                <th>Website</th>
                <th>Username</th>
                <th>Password</th>
                <th>Delete</th>
            </tr>`

        for (let i = 0; i < arr.length; i++) {
            const element = arr[i]

            str += `<tr>
                <td>${element.website} <img onClick="copyText('${element.website}')" src="copy.svg" alt="Copy Button" width="15" height="20"></td>
                <td>${element.username} <img onClick="copyText('${element.username}')" src="copy.svg" alt="Copy Button" width="15" height="20"></td>
                <td>${maskPassword(element.password)} <img onClick="copyText('${element.password}')" src="copy.svg" alt="Copy Button" width="15" height="20"></td>
                <td><button class="btnsm" id="${element.website}" onClick="deleteEntry('${element.website}')">Delete</button></td>
            </tr>`
        }
        table.innerHTML = table.innerHTML + str
    }
    website.value = ""
    username.value = ""
    password.value = ""
}

showPasswords()

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()
    console.log(website.value, username.value, password.value)

    let passwords = localStorage.getItem("passwords")
    if (passwords == null) {
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value })
        alert('Password Saved!')
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        alert('Password Saved!')
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showPasswords()
})