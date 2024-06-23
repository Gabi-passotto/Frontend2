var allUsers = [];
var count = 1;

function insertNewUser(data ,nome, email){
    var newUser = { id: count++, data: data, nome: nome, email: email};
    allUsers.push(newUser);
    localStorage.setItem('allUsers', JSON.stringify(allUsers));
    renderUserList();
}
function clearAllUsers(){
    allUsers = [];
    localStorage.clear();
    renderUserList();
}
function deleteUser(userId){
    var newList = allUsers.filter(function (user){
        return user.id !== userId;
    });

    if(newList.length < allUsers.length){
        allUsers = newList;
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
        renderUserList();
    } else{
        alert('Usuário não existe.');
    }
}
function getUserList(){
    var storedList = JSON.parse(localStorage.getItem('allUsers'));
    allUsers =storedList || [];
}

function renderUserList(){
    var currentList = document.getElementById('allUsers');
    currentList.innerHTML = '';

    allUsers.forEach(function (user) {
        var newListItem = document.createElement('li');
        newListItem.innerHTML = user.data + ' - ' + user.nome + ' - ' + user.email + '<button class="delete-button" onclick="deleteUser(' + user.id + ')">Excluir</button>';
        currentList.appendChild(newListItem);
    });
}
function searchUser(){
    if(document.getElementById('searchBox').value == ''){
        alert('Please, insert a valid value')
        renderUserList();
    }else if(document.getElementById('selectOptions').value == 'name'){
        var name = document.getElementById('searchBox').value;
        var currentList = document.getElementById('allUsers');
        
        currentList.innerHTML = '';
        allUsers.forEach(function (user) {
            if(user.nome == name){
                var newListItem = document.createElement('li');
                newListItem.innerHTML = user.data + ' - ' + user.nome + ' - ' + user.email + '<button class="delete-button" onclick="deleteUser(' + user.id + ')">Excluir</button>';
                currentList.appendChild(newListItem);
            }
        });
    }else if(document.getElementById('selectOptions').value == 'date'){
        var date = document.getElementById('searchBox').value;
        var currentList = document.getElementById('allUsers');
        
        currentList.innerHTML = '';
        allUsers.forEach(function (user) {
            if(user.data == date){
                var newListItem = document.createElement('li');
                newListItem.innerHTML = user.data + ' - ' + user.nome + ' - ' + user.email + '<button class="delete-button" onclick="deleteUser(' + user.id + ')">Excluir</button>';
                currentList.appendChild(newListItem);
            }
        });
    }else if(document.getElementById('selectOptions').value == 'email'){
        var email = document.getElementById('searchBox').value;
        var currentList = document.getElementById('allUsers');
        
        currentList.innerHTML = '';
        allUsers.forEach(function (user) {
            if(user.email == email){
                var newListItem = document.createElement('li');
                newListItem.innerHTML = user.data + ' - ' + user.nome + ' - ' + user.email + '<button class="delete-button" onclick="deleteUser(' + user.id + ')">Excluir</button>';
                currentList.appendChild(newListItem);
            }
        });
    }
}

getUserList();
renderUserList();

document.getElementById('cadUser').addEventListener('submit', function (event){
    event.preventDefault();
    var nome = document.getElementById('nome');
    var email = document.getElementById('email');
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth();
    var aaaa = date.getFullYear();
    var data = `${dd}/${mm + 1}/${aaaa}`
    insertNewUser(data, nome.value, email.value);
    date.value = '';
    nome.value = '';
    email.value = '';
});
