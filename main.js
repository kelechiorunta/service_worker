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

        frame.style.setProperty('background-image', 'url(/fullImg')

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
        closeBtn.style.setProperty('border-top-right-radius', '20px');
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

    // requestAnimationFrame(pageIntersection)
    

    registerServiceWorker('./service_worker.js');
})

let slideContainer = document.querySelector('.slide_container');
let myslides = slideContainer.querySelectorAll('.contact_slide');
const activateBtn = document.querySelector('.activateBtn');

// Global state variables
let taskList = [];
let totalTaskCount = 0;
let prevSlideIndex = 0;
let currentTaskNumber = 0;
let taskHandle = null;

// Log and activate the slide
const logSlide = (slideIndex) => {
    myslides.forEach((slide, index) => {
        // Determine the previous and next slide indices
        const prevSlideIndex = slideIndex === 0 ? myslides.length - 1 : slideIndex - 1;
        const nextSlideIndex = (slideIndex + 1) % myslides.length;

        if (index === slideIndex) {
            // Current slide: scroll to position 0
            slide.style.transform = "translateX(0%)";
            slide.style.transition = "transform 0.5s ease";
            slide.classList.add('active');
            // return
        } else if (index === prevSlideIndex) {
            // Previous slide: scroll to position -100%
            slide.style.transform = "translateX(-100%)";
            slide.style.transition = "transform 0.5s ease";
            slide.classList.remove('active');
        } else if (index === nextSlideIndex) {
            // Next slide: scroll to position 100%
            slide.style.transform = "translateX(100%)";
            slide.style.transition = "transform 0.5s ease";
            slide.classList.remove('active');
        }
         else {
            // All other slides: move them out of view
            slide.style.transform = "translateX(100%)";
            slide.style.transition = "none"; // Instantly move off-screen
        }
        // animateSlide(slideIndex)
    });
    
    console.log(`Slide ${slideIndex + 1} is now active.`);

};


let n = 0;

// Activate the button to enqueue tasks
activateBtn.addEventListener('click', () => {
    n = (n + 1) % myslides.length; // Loop back to the first slide
    // animateSlide(n)
    enqueueTask(logSlide, n);
});

// Enqueue a task using `requestIdleCallback`
const enqueueTask = (taskHandler, taskIndex) => {
    taskList.push({ handler: taskHandler, indexTask: taskIndex });
    totalTaskCount++;

    // Schedule the task if none is currently running
    if (!taskHandle) {
        taskHandle = requestIdleCallback(runTask, { timeout: 50 });
    }
};

// Process tasks during idle time
const runTask = (deadline) => {
    while ((deadline.timeRemaining() > 0 || deadline.didTimeout) && taskList.length) {
        const task = taskList.shift();
        task.handler(task.indexTask); // Execute the task handler
        animateSlide(task.indexTask)
    }

    // Reset taskHandle if no tasks remain
    if (taskList.length) {
        taskHandle = requestIdleCallback(runTask, { timeout: 50 });
    } else {
        taskHandle = null;
    }
    
};

// Use `requestAnimationFrame` for smooth transition animations
const animateSlide = (slideIndex) => {
    const activeSlide = myslides[slideIndex];
    const previousSlide = myslides[prevSlideIndex];

    // Example animation logic
    requestAnimationFrame(() => {
        activeSlide.style.opacity = 1;
        activeSlide.style.transform = "translateX(0)";
        previousSlide.style.opacity = 1;
        previousSlide.style.transform = "translateX(-100%)";
    });
};

// Add smooth transitions to each slide
myslides.forEach((slide, index) => {
    slide.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    if (index !== 0) {
        slide.style.opacity = 0;
        slide.style.transform = "translateX(100%)";
    }
});

//learning to implement the requestAnimationFrame
let start;
let pos;

let obj = document.querySelector('.obj');
let animateBtn = document.querySelector('.animate');
let endAnimateBtn = document.querySelector('.endAnimate');
let animateId;

const animate = (timeStamp) => {

    if (!start || pos > document.body.clientWidth) start = timeStamp;

    pos = (timeStamp - start) * 1;//Math.min((timeStamp - start) * 1, 200);

    obj.style.transform = `translateX(${pos}px)`;
    // if (pos < 200) {
        animateId = requestAnimationFrame(animate)
    // }
}

const endAnimate = () => {
    cancelAnimationFrame(animateId)
}

animateBtn.addEventListener('click', ()=> {
    requestAnimationFrame(animate)
} )

endAnimateBtn.addEventListener('click', endAnimate)
