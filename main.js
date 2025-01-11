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
    const btn = document.querySelector('.unregister')
    const placeholders = document.querySelectorAll('.placeholder')

    btn.addEventListener('click', () => {
        const input = document.querySelector('.value');
        enterValue(input.value)
        input.value = "";
    })

    const enterValue = (text) => {
        const li = document.createElement('li');
        li.textContent = text;
        document.querySelector('.list').append(li);
        li.scrollIntoView({behavior: "smooth"})
    }
                    
        const loaded = () => {
            frame.classList.add('loaded');
        }
                
        if (img.complete) {
            loaded()
        } else {
            img.addEventListener('load', loaded)
        }

        const placeholderLoaded = () => {
            placeholders.forEach((placeholder) => placeholder.classList.add('loaded'));
        }

        placeholders.forEach(placeholder => {
            const placeholderImg = placeholder.querySelector('img');

            if (placeholderImg.complete) {
                placeholderLoaded()
            }else{
                placeholderImg.addEventListener('load', placeholderLoaded)
            }
        })

        frame.style.setProperty('background-image', 'url(/fullImg)')

    const createModal = (event, index) => {
        const modalContainer = document.createElement('div');
        modalContainer.setAttribute('class', 'modal');
        modalContainer.style.setProperty('display', 'flex')
        modalContainer.style.setProperty('flex-direction', 'column')
        modalContainer.style.setProperty('align-items', 'center');
        modalContainer.style.setProperty('justify-content', 'center');
        const content = document.createElement('div');
        const closeBtn = document.createElement('button');
        const contentContainer = document.createElement('div');
        const imgContent = document.createElement('img');
        imgContent.src = event.target.src;
        contentContainer.style.setProperty('display', 'flex')
        contentContainer.style.setProperty('position', 'relative')
        contentContainer.style.setProperty('flex-direction', 'column')
        contentContainer.style.setProperty('align-items', 'center');
        contentContainer.style.setProperty('justify-content', 'center');
        contentContainer.style.setProperty('width', '600px');
        contentContainer.style.setProperty('height', '600px');
        contentContainer.style.setProperty('background-color', 'rgba(0,0,0,0.8)');
        contentContainer.style.setProperty('margin', 'auto');
        contentContainer.style.setProperty('padding', '2rem');
        contentContainer.style.setProperty('border-radius', '20px');
        imgContent.style.setProperty('width', '400px');
        imgContent.style.setProperty('height', '400px');
        imgContent.style.setProperty('object-fit', 'cover');
        imgContent.style.setProperty('object-position', 'center');
        imgContent.style.setProperty('border-radius', '20px');
        content.style.setProperty('width', '400px');
        content.style.setProperty('height', '400px');
        content.style.setProperty('background-color', 'white');
        content.style.setProperty('border-radius', '20px');
        content.style.setProperty('margin', 'auto');
        content.style.setProperty('overflow', 'hidden');
        content.style.setProperty('background-image',  `url(/smallImg/${index + 1})`);
        content.style.setProperty('background-position',  `center`);
        content.style.setProperty('background-size',  `cover`);
        content.append(imgContent);
        closeBtn.style.setProperty('padding', '1rem');
        closeBtn.style.setProperty('width', 'max-content');
        closeBtn.style.setProperty('position', 'absolute');
        closeBtn.style.setProperty('right', '0');
        closeBtn.style.setProperty('top', '0');
        closeBtn.style.setProperty('cursor', 'pointer');
        closeBtn.style.setProperty('background-color', 'rgba(255,255,255,0.7');
        closeBtn.textContent = 'X';
        closeBtn.addEventListener('click', function(){
            this.parentElement.parentElement.remove();
        })
        contentContainer.append(content, closeBtn)
        modalContainer.appendChild(contentContainer)
        document.body.append(modalContainer);
    }    
   
    placeholders.forEach((placeholder, index) => {
        const image = placeholder.querySelector('img');
        image.addEventListener('click', (e) => {
            createModal(e, index);
        })
    })

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
                entry.target.classList.toggle('fall')
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