
//     const pokemonTypeURL =''

// function fetchPokemonType(){

// }

const pokemonserchPoke=document.getElementById('serch-pokmon')

const pokemonBox = document.getElementById('pokemons-list')
const pokenmonTypeURL = 'https://pokeapi.co/api/v2/type/'

const pokemonSearchURL = 'https://pokeapi.co/api/v2/pokemon' + 'pokemonName'

const NameURLMap = {}

// get all pokemon types and add to select tag
function fetchPokenmonType () {

    fetch(pokenmonTypeURL)
    .then (
        ( response ) => response.json()
    )
    .then(
        ( parsedResponse ) => {

            console.log(parsedResponse)

            const select = document.getElementById('pokemon-types')

            for (let i = 0; i < parsedResponse.results.length; i++) {
                const type = parsedResponse.results[i];
                const typeName = type.name
                const typeURL = type.url
                NameURLMap[typeName] = typeURL
                const option = document.createElement('option')
                option.innerText = typeName
                option.setAttribute('value', typeName)
                option.setAttribute('data-url', typeURL)
                select.append(option)


                //All pokemon
                const AllpokemonDiv=document.createElement('div')



            }

        }
    )

}

// this function fetches 10 pokemons based on the type
function fetchPokemonOnType () {

    console.log(NameURLMap)
    const selectValue = document.getElementById('pokemon-types').value
    console.log("the select value\n\n", selectValue, NameURLMap[selectValue])

    fetch(NameURLMap[selectValue])
    .then (( response )  => response.json())
    .then((parsedResponse) => {

        const pokemonsData = parsedResponse.pokemon

        const pokemonsListLength = pokemonsData.length > 10 ? 10 : pokemonsData.length

       
        pokemonBox.innerHTML = ''

        for (let i = 0; i < pokemonsListLength; i++) {

            const pokemon = pokemonsData[i].pokemon;
            const pokemonName = pokemon.name
            const pokemonURL = pokemon.url
            let imageSrcData = ''
            fetchPokemonData(pokemonURL).then( imageSrc => {


                const pokemonDiv = document.createElement('div')
                pokemonDiv.className='pokemonCard'
                if(selectValue=="grass"){
                    pokemonDiv.style.background='#a0cb58'
                }else if(selectValue=='fire'){
                    pokemonDiv.style.background='#fd842f'
                }
                else if(selectValue=='bug'){
                    pokemonDiv.style.background='#79a449'
                }
                else if(selectValue=='water'){
                    pokemonDiv.style.background='#4e98c7'
                }
                else if(selectValue=='normal'){
                    pokemonDiv.style.background='#a9b0b3'
                }
                else if(selectValue=='poison'){
                    pokemonDiv.style.background='#bd86cc'
                }
                else if(selectValue=='electric'){
                    pokemonDiv.style.background='#f7e049'
                }
                else if(selectValue=='ground'){
                    pokemonDiv.style.background='#f7e049'
                }
                else if(selectValue=='fairy'){
                    pokemonDiv.style.background='#fdbdea'
                }
                else if(selectValue=='fighting'){
                    pokemonDiv.style.background='#d26c26'
                }
                else if(selectValue=='psychic'){
                    pokemonDiv.style.background='#d26c26'
                }
                else if(selectValue=='ghost'){
                    pokemonDiv.style.background='#8162a4'
                }
                const pokemonFrontPicture = document.createElement('img')
                const pokemonNameSpan = document.createElement('span')

                pokemonFrontPicture.setAttribute('src', imageSrc)

                pokemonNameSpan.innerText = pokemonName
                pokemonDiv.append(pokemonFrontPicture,  pokemonNameSpan)


                pokemonBox.append(pokemonDiv)


            } )


            
            
        }

    })

}


// this will return pokemon image based on the URL...
async function fetchPokemonData (pokemonURL) {

    const response = await fetch(pokemonURL)

    const parsedResponse = await response.json()

    return parsedResponse.sprites.front_default

}



function pokemonserchHandler(){
    pokemonBox.innerHTML = ''
    const pokemonName=document.getElementById('pokemon-name').value

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then(response=> response.json())
    .then(parsedRespons=>{
        console.log(parsedRespons)
        const div=document.createElement('div')
        div.className="serch-pokmon"
        div.style.display='flex'
        div.style.flexDirection='column-reverse'
        div.style.justifyContent='space-evenly'
        div.style.alignItems='center'
        div.style.textAlign='center'
        div.style.width='200px'
        div.style.height='300px'
        div.style.border='none'
        div.style.background='#FC766AFF'
        div.style.borderRadius='10px'
        div.style.marginTop='30px'
        div.style.boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        document.getElementById('pokemon-img').append(div)
        const name =document.createElement('span')
        
        
        const img=document.createElement('img')
        img.setAttribute('name','pokemonName')
        img.setAttribute('src',parsedRespons.sprites.front_default)
        name.innerHTML=pokemonName
        div.append(name)
        div.appendChild(img)
    })
    .catch(Error)
}


function resetPokemon(){
    pokemonBox.innerHTML=''
}