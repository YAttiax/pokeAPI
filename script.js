let request = new XMLHttpRequest();
let url = "https://pokeapi.co/api/v2/pokemon";
request.open("GET", url, true);

request.onload = function() {
    let data = JSON.parse(this.response);
    console.log(data)
    data.results.forEach(poke => {
        let url1 = poke.url
        console.log(url1)
        let request1 = new XMLHttpRequest();
        request1.open("GET", url1, false);
        request1.onload = function() {
            let data1 = JSON.parse(this.response);
            console.log(data1)
            let pokeA = document.createElement("a")
            let pokeDiv = document.createElement("div")
            pokeDiv.className = "pokeDiv"
            let pokeImg = document.createElement("img")
            let pokeTitle = document.createElement("h4")
            document.querySelector("#modals").innerHTML+=`<div class="modal fade" id="${data1.name}" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${data1.name.toUpperCase()}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <img src = ${data1.sprites.front_default}>
                    <p>Type: ${capitalize(data1.types[0].type.name)}</p>
                    <p>Base Experience: ${data1.base_experience}</p>
                    <span style="margin-right:30px">Height: ${data1.height}</span>
                    
                    <span>Weight: ${data1.weight}</span>
                    <hr/>
                    <div style="background-color:rgb(202, 200, 200);border-radius:10px;padding:15px 0px;">
                    <h3>Base Stats</h3>
                    <ul style="text-align:left">
                        <li>${capitalize(data1.stats[0].stat.name)}: ${data1.stats[0].base_stat}</li>
                        <li>${capitalize(data1.stats[1].stat.name)}: ${data1.stats[1].base_stat}</li>
                        <li>${capitalize(data1.stats[2].stat.name)}: ${data1.stats[2].base_stat}</li>
                        <li>${capitalize(data1.stats[3].stat.name)}: ${data1.stats[3].base_stat}</li>
                        <li>${capitalize(data1.stats[4].stat.name)}: ${data1.stats[4].base_stat}</li>
                        <li>${data1.stats[5].stat.name.toUpperCase()}: ${data1.stats[5].base_stat}</li>
                    </ul>
                    </div>
                </div>
            </div>
            </div>
        </div>`
            pokeTitle.innerHTML = data1.name
            pokeDiv.appendChild(pokeTitle)
            pokeDiv.appendChild(pokeImg)
            pokeA.appendChild(pokeDiv)
            pokeA.addEventListener("click",()=>{
                $("#"+data1.name).modal()
            })
            pokeImg.src = `https://play.pokemonshowdown.com/sprites/ani/${data1.name}.gif`
            document.querySelector("#pokelist").appendChild(pokeA)
        };
        
        request1.send();
    });
};

request.send();

function capitalize(input) { 
    return input[0].toUpperCase() + input.slice(1); 
}
