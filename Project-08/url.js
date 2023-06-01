var form = document.getElementById('form');
var errorMessage = document.getElementById('error_message');
var url = document.getElementById('url');
var formClass = document.getElementsByClassName('form')
form.addEventListener('submit',function(e){
    if(!url.value){
        errorMessage.innerText = 'Please add a link';
        url.style.outline ='3px solid hsl(0, 87%, 67%)';
        url.id = 'url1';
        e.preventDefault();
    }
    else{
        // creating the api request
        const api = 'https://api.shrtco.de/v2/shorten?url=';
        const fullURL = api +url.value;
        getShortenURL();
        e.preventDefault();
        
        
        // the function that creates the api request
        async function getShortenURL(){
            const response =  await fetch(fullURL)
            const data = await response.json()
            const shorten_link = await data.result.short_link


            // creating the copy form
            var top1 = document.getElementById('top1')
            var shortenURLForm = document.createElement('div')
            shortenURLForm.id = 'shorten_link_to_copy'
            top1.appendChild(shortenURLForm)
            var shortForm = document.createElement('div')
            shortForm.className = 'short_form'
        
            var urlPar = document.createElement('p')
            urlPar.textContent = url.value
            shortenURLForm.appendChild(urlPar)
            // shortenURLForm.appendChild(shortForm)

            var short = document.createElement('input')
            short.setAttribute('type','text')
            short.setAttribute('value',(shorten_link))
            short.setAttribute('readonly','true')
            short.className = 'the_shorten_link'
            shortForm.appendChild(short)

            var copyButton = document.createElement('button')
            copyButton.innerText = 'Copy'
            copyButton.className = 'copy_button'
            shortForm.appendChild(copyButton)


            shortenURLForm.appendChild(shortForm)

            copyButton.onclick = function(){
                short.select()
                document.execCommand('Copy');
                copyButton.innerText = 'Copied!'
                copyButton.style.backgroundColor = 'hsl(257, 27%, 26%)'
            }
        }
    }
});