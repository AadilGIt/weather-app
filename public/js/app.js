console.log('client side javascript')



const weather = document.querySelector('form');
const search = document.querySelector('input');
const para = document.getElementById('mes');
//para.textContent = ('paragraph');

weather.addEventListener('submit',(e) =>{
    e.preventDefault()
    const location = search.value;
    //console.log(location);
para.textContent = ('loading...')
    fetch('/weather?address=' + location).then((response)=>{
        // console.log(response.json);
        Access-Control-Allow-Origin
        response.json().then((data) =>{
            //console.log(data);
            if(data.error){
               // console.log('something went wrong!!');
                para.textContent = data.error
            }
            else{
                // console.log(data.location);
                // console.log(data.data)
                para.textContent =data.location;
                para.textContent = data.data
            }
        })
    })

})