document.addEventListener('DOMContentLoaded', () => {
    /**Install the service worker agent */

    const registerServiceWorker = async(scriptUrl) => {
        if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
            const registeration = await navigator.serviceWorker.register(scriptUrl, {scope: '/'});
            try{
                if (registeration && registeration.installing) {
                    const frame = document.querySelector('.frame');
                    const img = frame.querySelector('img');
                    
                    const loaded = () => {
                        frame.classList.add('loaded')
                    }
                
                    if (img.complete) {
                        loaded()
                    }
                    img.addEventListener('load', loaded)
                    frame.style.setProperty('background-image', 'url(/fullImg)')
                    
                    console.log("Service worker installed")
                }else if (registeration && registeration.active) {
                    console.log("Service worker is active")
                }else if (registeration && registeration.waiting) {
                    console.log("Service worker awaits your orders")
                    
                }else{
                    registeration.unregister();
                    console.log("Service worker exited")
                }  
            }
            catch(err){
                console.error(err, "Service worker not installed!")
            } 
        }
    }

    

    

    registerServiceWorker('./service_worker.js');
})