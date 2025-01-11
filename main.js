document.addEventListener('DOMContentLoaded', () => {
    /**Install the service worker agent */

    const registerServiceWorker = async(scriptUrl) => {
        if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
            const registeration = await navigator.serviceWorker.register(scriptUrl, {scope: './'});
            try{
                if (registeration && registeration.installing) {
                    
                    
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

    const intersectingOptions = {
        root: null,
        margin: '2px',
        threshold: 1
    }

    let yPos = 0

    const pageIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry.target)
                // if (entry.target.classList.contains('img')) {
                entry.target.classList.add('fall')
                    // entry.target.style.setProperty('transform', `translateY(${20}px)`)
                    // entry.target.parentElement.style.setProperty('background-position-y', `${yPos}px`)
                // }
            }
        })
    }

    const pageObserver = new IntersectionObserver(pageIntersection, intersectingOptions);

    // (document.body.children).forEach(child => {
        const child = document.querySelectorAll('.frame img')[0];
        pageObserver.observe(child)
    // })
    

    registerServiceWorker('./service_worker.js');
})