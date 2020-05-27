/* splash screen timeout */
const splash= document.querySelector('.splash')

/* event listener to the document */
document.addEventListener('DOMContentLoaded', (e)=>{
    setTimeout(()=>{
       splash.classList.add('display-none'); 
    }, 2000); /* Timeout set to 2 seconds */
})