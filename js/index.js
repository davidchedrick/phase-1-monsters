const formMonster = document.querySelector('#create-monster');
const containMonster = document.querySelector('#monster-container');
const back = document.querySelector('#back');
const forward = document.querySelector('#forward');
let pageNum = 333

document.addEventListener('DOMContentLoaded', getMonsters());

back.addEventListener('click', () => {
    if(pageNum === 1) {
        window.alert('No Monsters Here')
    }else{
        pageNum -= 1
        getMonsters()
    }
})

forward.addEventListener('click', () => {
    pageNum += 1
    fetch(`http://localhost:3000/monsters/?_limit=3&_page=${pageNum}`)
    .then(resp => resp.json())
    .then(monsters => {
        if(monsters.length === 0){
            pageNum -= 1
            window.alert('No Monsters Here')
        }else{
            containMonster.textContent = `Page ${pageNum}`
            monsters.forEach(renderMonsters)
       }
    })
})


function renderMonsters(monster){
    const spanMonster = document.createElement('span');
    spanMonster.innerHTML = `
      <h1>Name: ${monster.name}<h1>
      <h4>Age: ${monster.age}</h4>
      <p>${monster.description}</p>
    `
    const hr = document.createElement('hr')
    spanMonster.style.color = 'blue'
    containMonster.append(spanMonster, hr);
}   

function getMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=3&_page=${pageNum}`)
    .then(resp => resp.json())
    .then(monsters => {
        containMonster.textContent = `Page ${pageNum}`
        monsters.forEach(renderMonsters)
    })
    .catch(err => alert(err));
}


