import { addMessage } from "./indexedDB.js";

document.addEventListener('DOMContentLoaded', () => {
    
  const scrollheader = document.querySelector('.mainHeader');
  const navItem = scrollheader.querySelector(' .primary_nav li a');
  const scrollContainer = scrollheader.querySelector('.progress-container');
  const progressBar = scrollContainer.querySelector('.progress-bar');
  const imgSection = document.querySelector('.img_section');
  const imgContainer = imgSection.querySelectorAll('.img_container');
  const sliderBtn = document.querySelector('.startSlider')

  //Implementing the modern Navigation API over the legacy history API
  imgContainer.forEach((container, index) => {
    const docBtn = container.querySelector('button');
    docBtn.addEventListener('click', async() => {
        const state = index;//{id: index, text: "Hello from main.js"};
        sessionStorage.setItem('navigationState', state);
        const info = {name: "Orunta Kelechi"}
        await navigation.navigate('./images' , {state}).finished;
    })

  })
  
  let loaderId;

  /**
   * Create loader and append to a container at initial loading time with service Worker
   */

  const createLoader = (activate) => {
    // Check if loader container already exists
    let loader_container = document.querySelector('.loader_container');

    if (activate) {
        // If activating, create loader only if it doesn't exist
        if (!loader_container) {
            loader_container = document.createElement('div');
            loader_container.setAttribute('class', 'loader_container');
            loader_container.style.setProperty('position', 'fixed');
            loader_container.style.setProperty('width', '100%');
            loader_container.style.setProperty('inset', '0');
            loader_container.style.setProperty('background-color', 'rgba(0,0,0,0.9)');
            loader_container.style.setProperty('margin', 'auto');
            loader_container.style.setProperty('display', 'flex');
            loader_container.style.setProperty('justify-content', 'center');
            loader_container.style.setProperty('align-items', 'center');

            const loader = document.createElement('div');
            loader.setAttribute('class', 'loader');
            loader.style.setProperty('border', '16px solid white');
            loader.style.setProperty('width', '120px');
            loader.style.setProperty('height', '120px');
            loader.style.setProperty('border-radius', '50%');
            loader.style.setProperty('border-top', '16px solid #545c00');
            loader.style.setProperty('border-bottom', '16px solid #ee7d39');
            loader.style.setProperty('animation', 'spin 2s linear infinite');

            loader_container.append(loader);
            document.body.append(loader_container);
        }
    } else {
        // If deactivating, remove loader container if it exists
        if (loader_container) {
            loader_container.remove();
        }
    }
};

    /**Install the service worker agent */
    // createLoader(true);
    const registerServiceWorker = async(scriptUrl) => {
        if ('serviceWorker' in navigator && navigator.serviceWorker.ready) {
            const registeration = await navigator.serviceWorker.register(scriptUrl, {scope: './'});
            
            try{
                createLoader(true);
                const loader_container = document.querySelector('.loader_container');
                if (registeration && registeration.installing) {
                    loaderId = setTimeout(()=>{loader_container.remove(); createLoader(false); clearTimeout(loaderId)}, 5000)
                    console.log("Service worker installed")
                }else if (registeration && registeration.active) {
                    console.log("Service worker is active") 
                    
                    loader_container.remove(); 
                }else if (registeration && registeration.waiting) {
                    console.log("Service worker awaits your orders")
                     loader_container.remove(); 
                }
                else{
                    
                }
            }
            catch(err){
                console.error(err, "Service worker not installed!")
            }finally{
                // createLoader(false)
                
                loaderId = setTimeout(()=>{createLoader(false); clearTimeout(loaderId)}, 3000)
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

     /** Modal Creation to showcase images */   
    const createModal = (event, index) => {
        const modalContainer = document.createElement('div');
        modalContainer.setAttribute('class', 'modal');
        modalContainer.style.setProperty('display', 'flex')
        modalContainer.style.setProperty('flex-direction', 'column')
        modalContainer.style.setProperty('align-items', 'center');
        modalContainer.style.setProperty('min-width', '300px');
        modalContainer.style.setProperty('min-height', '300px');
        modalContainer.style.setProperty('justify-content', 'center');
        const content = document.createElement('div');
        const closeBtn = document.createElement('button');
        const contentContainer = document.createElement('div');
        const imgContent = document.createElement('img');
        contentContainer.setAttribute('class', 'contentContainer');
        imgContent.setAttribute('class', 'imgContent');
        content.setAttribute('class', 'content');
        imgContent.src = event.target.src;
        contentContainer.style.setProperty('display', 'flex')
        contentContainer.style.setProperty('position', 'relative')
        contentContainer.style.setProperty('flex-direction', 'column')
        contentContainer.style.setProperty('align-items', 'center');
        contentContainer.style.setProperty('justify-content', 'center');
        contentContainer.style.setProperty('max-width', '600px');
        contentContainer.style.setProperty('max-height', '600px');
        contentContainer.style.setProperty('width', '100%');
        contentContainer.style.setProperty('height', '100%');
        contentContainer.style.setProperty('min-width', '300px');
        contentContainer.style.setProperty('min-height', '300px');
        contentContainer.style.setProperty('background-color', 'rgba(0,0,0,0.8)');
        contentContainer.style.setProperty('margin', 'auto');
        contentContainer.style.setProperty('padding', '2rem');
        contentContainer.style.setProperty('border-radius', '20px');
        imgContent.style.setProperty('width', '100%');
        imgContent.style.setProperty('height', '100%');
        imgContent.style.setProperty('min-width', '200px');
        imgContent.style.setProperty('min-height', '200px');
        imgContent.style.setProperty('object-fit', 'cover');
        imgContent.style.setProperty('object-position', 'center');
        imgContent.style.setProperty('border-radius', '20px');
        content.style.setProperty('max-width', '400px');
        content.style.setProperty('max-height', '400px');
        content.style.setProperty('width', '100%');
        content.style.setProperty('height', '100%');
        content.style.setProperty('background-color', 'white');
        content.style.setProperty('border-radius', '20px');
        content.style.setProperty('min-width', '200px');
        content.style.setProperty('min-height', '200px');
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

    /**Creating options for the intersecting object */
    const intersectingOptions = {
        root: null,
        margin: '2px',
        threshold: 1
    }

    let yPos = 0

    const headerIntersection = (entries, observer) => {
        
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.addEventListener('scroll', (event) => {
                    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                    let navItems =  entry.target.querySelectorAll('.primary_nav li a')
                    
                     if (winScroll >= `300`) {
                        // console.log(navItems)
                        entry.target.style.setProperty('background-color', 'white')
                        navItems.forEach(item => {
                            item.style.setProperty('color', 'rgba(0,0,0,0.9)')
                        })
                        
                     }else{
                        console.log(navItems)
                        entry.target.style.setProperty('background-color', 'rgba(0,0,0,0.7)')
                        navItems.forEach(item => {
                            item.style.setProperty('color', 'white')
                        })
                    }
                })
            }
        })
    }

    const pageIntersection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log(entry.target)
                entry.target.classList.toggle('fall')
            }
        })
    }

    const pageObserver = new IntersectionObserver(pageIntersection, intersectingOptions);

    const headerObserver = new IntersectionObserver(headerIntersection, intersectingOptions);

    headerObserver.observe(scrollheader);

    // (document.body.children).forEach(child => {
        const child = document.querySelectorAll('.frame img')[0];
        pageObserver.observe(child)
    // })

    /**Scroll handler for the scroll indicator */
    const scrollProgress = () => {
    
    // console.log(progressBar)
    
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";
    }

    document.addEventListener('scroll', scrollProgress);

    registerServiceWorker('./service_worker.js');


    /**
     * Form subscription handling
     * 
     */
    const subscriptionBtn = document.querySelector('input[type=submit]');
    const form = document.querySelector('form');

    subscriptionBtn.addEventListener('click', async(event) => {
        event.preventDefault();
        try{
            const name = form.elements['name'].value; // Get the value of the 'name' input
            const email = form.elements['mail'].value; // Get the value of the 'mail' input
            const divSpinner = form.querySelector('.container:nth-child(3)');
            const spinnerContainer = divSpinner.querySelector('.spinner_container')
            console.log(name, email)
            if (!name || !email) {
                alert("Please fill all details")
            }else{
               /**
                * The navigator.onLine property indicates whether the browser is currently online (true) or offline (false).
                */
                if ('connection' in navigator) {
                    const connection = navigator.connection;
                    console.log('Effective network type:', connection.effectiveType); // e.g., '4g', '3g', etc.
                    console.log('Downlink speed:', connection.downlink, 'Mbps');
                    console.log('RTT (Round-Trip Time):', connection.rtt, 'ms');
                  }
                  
                 if (navigator.onLine) {
                    spinnerContainer.style.display = 'block'
                    try{
                        const onlineMessage = await subscribe(name, email)
                        createToaster(onlineMessage)
                    }
                    catch(err){
                        console.error(err)
                    }
                    finally{
                        spinnerContainer.style.display = 'none';
                    } 
                    //await sendOnline(name, email)
                }else{
                    registerSync('./service_worker.js');
                    const offlineMessage = await addMessage(name, email);
                    createToaster(offlineMessage)
                }
                    
            }
        }
        catch(err){
             createToaster("Unable to subscribe")
             console.error(err, "Unable to subscribe")
        }
        finally{
            form.elements['name'].value = "";
            form.elements['mail'].value = "";
        }     
    })

        // Function to send messages online
        const sendOnline = (name, email) => {
            return new Promise((resolve, reject) => {
              const xhr = new XMLHttpRequest();
          
              xhr.open('POST', '/subscribe', true);
              xhr.setRequestHeader('Content-Type', 'application/json');
          
              xhr.onreadystatechange = () => {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                  if (xhr.status >= 200 && xhr.status < 300) {
                    console.log('Message sent successfully online!');
                    createToaster('Message sent successfully online!');
                    resolve(true); // Indicate success
                  } else {
                    console.error('Failed to send message online:', xhr.responseText);
                    reject(new Error(`Server Error: ${xhr.status}`)); // Indicate failure
                  }
                }
              };
          
              xhr.onerror = () => {
                console.error('Network Error: Unable to send message online.');
                reject(new Error('Network Error: Unable to send message online.'));
              };
          
              xhr.send(JSON.stringify({ name, email }));
            });
          };

    
    /**
     * A Background Sync handler that listens for the message event of the service Worker to report the message posted from the oncomplete event handler of the final transaction of the objectStore of the indexeddb message store from the sendMessage handler in the service worker file.
     */
    const syncMessage = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./service_worker.js', { scope: './' })
                .then(() => {
                    console.log('ServiceWorker registered successfully.');

                    navigator.serviceWorker.addEventListener('message', (event) => {
                        if (event.data.type === 'syncSuccess') {
                            console.log(event.data.message); // "All messages sent successfully!"
                                createToaster(event.data.message);
                                // createLoader(true)
                        }
                        else if (event.data.type === 'emailSuccess'){
                            createToaster(event.data.message)
                        }
                    });
                })
                .catch((err) => {
                    console.error('ServiceWorker registration failed:', err);
                });
        }
    }
    
    syncMessage();


    
// // FORMER CODE
//     subscriptionBtn.addEventListener('click', (event) => {
//         event.preventDefault();
//         try{
//             const name = form.elements['name'].value; // Get the value of the 'name' input
//             const email = form.elements['mail'].value; // Get the value of the 'mail' input
//             console.log(name, email)
//             if (!name || !email) {
//                 alert("Please fill all details")
//             }else{
//                 localStorage.setItem('messages', {name, email})
//                 subscribe(name, email)
//             }      
//         }
//         catch(err){
//             console.error(err, "Unable to subscribe")
//         }
//         finally{
//             form.elements['name'].value = "";
//             form.elements['mail'].value = "";
//         }     
//     })
    
//     //Subscribe event handler
//     const subscribe = (name, email) => {
//         // createLoader(true);
//         try{ 
//             fetch('/subscribe', {
//                 method:'POST',
//                 headers: {
//                     'Content-Type': 'application/json', // Correct format for headers
//                 },
//                 body:JSON.stringify({name, email})
//             })
//             .then(res => res.json())
//             .then(res => {console.log(res?.message);  createToaster(res?.message);}) 
           
//         }
//         catch(err){
//             console.error(err)
//             createToaster(err.error)
//         }
//     }
//////////////////////////////////////////////////

const subscribe = (name, email) => {
    return new Promise((resolve, reject) => {
        fetch('/subscribe', {
                            method:'POST',
                            headers: {
                                'Content-Type': 'application/json', // Correct format for headers
                            },
                             body:JSON.stringify({name, email})
                         })
                         .then(res => res.json())
                         .then(res => {resolve(res?.message)
                        .catch((err) => {reject(err.message)})  
    })
})
}

///Service worker Sync Background Task API
const registerSync = (url) => {
    if ("serviceWorker" in navigator && 'SyncManager' in window) {
        navigator.serviceWorker.register(url, {scope: './'}).then(async(syncReg) => {
             console.log("Service worker synchronization API created")
             try{
                 await syncReg.sync.register('sendMessages');
                 console.log("Synchronization created");
             }
             catch(err){
                 console.error("Failed to create synchronization", err)
             }
         })
     }
}
   
/**
 * TOASTER FUNCTION
 */

const createToaster = (text) => {
    // Get the snackbar DIV
    var toaster = document.getElementById("snackbar");
    var mySVG = document.getElementById("mySVG");
    var triangle = document.getElementById("triangle");
    var length = triangle.getTotalLength();
    // Set up stroke-dash properties
    triangle.style.strokeDasharray = length;
    triangle.style.strokeDashoffset = length;

    if (mySVG){
        // alert("SVG");
        mySVG.style.setProperty('height', '100px')
        mySVG.style.setProperty('width', '100px')
        mySVG.style.setProperty('padding', '1rem')
        mySVG.style.setProperty('background-color', 'transparent')
        mySVG.style.setProperty('border', '2px solid white')
        mySVG.style.setProperty('z-index', '10')
        mySVG.style.setProperty('margin', 'auto')
        mySVG.style.setProperty('border-radius', '50%')
        mySVG.style.setProperty('display', 'flex')
        mySVG.style.setProperty('align-items', 'center')
        mySVG.style.setProperty('justify-content', 'center')

    }
   // Animation
   let start;

   const drawLine = (timestamp) => {
     if (!start) start = timestamp;
 
     // Calculate progress based on time elapsed
     const elapsed = timestamp - start;
     const progress = Math.min(elapsed / 1000, 1); // Animate over 2 seconds (2000ms)
 
     // Update strokeDashoffset based on progress
     triangle.style.strokeDashoffset = length * (1 - progress);
 
     if (progress < 1) {
       requestAnimationFrame(drawLine);
     }
   };
 
   // Start animation
   requestAnimationFrame(drawLine);
    
    // Find scroll percentage on scroll (using cross-browser properties), and offset dash same amount as percentage scrolled
  
    // Add the "show" class to DIV
    toaster.classList.add("show");
    toaster.textContent = text;
    mySVG.append(triangle)
    toaster.append(mySVG)
  
    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ toaster.classList.remove("show"); }, 3000);
  }

  ////////////////////////////////////////////////
})

    let myslides;
    let slideContainer = document.querySelector('.slide_container');
    if (slideContainer) {
        myslides = slideContainer.querySelectorAll('.contact_slide');
    }
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
    if (activateBtn) {
        activateBtn.addEventListener('click', () => {
            n = (n + 1) % myslides.length; // Loop back to the first slide
            // animateSlide(n)
            enqueueTask(logSlide, n);
        });    
    }
   
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
    if (myslides) {
        myslides.forEach((slide, index) => {
            slide.style.transition = "opacity 0.5s ease, transform 0.5s ease";
            if (index !== 0) {
                slide.style.opacity = 0;
                slide.style.transform = "translateX(100%)";
            }
        });
    }
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

    if (animateBtn) {
        animateBtn.addEventListener('click', ()=> {
            requestAnimationFrame(animate)
        } )
    }
    if (endAnimateBtn) {
        endAnimateBtn.addEventListener('click', endAnimate);
    }

    const contents = document.querySelector('.contents')
    // Access the text node inside the element
    if (contents) {
        const textNode = contents.firstChild;

    const range1 = new Range();

    // Set the range within the text node (offsets correspond to character positions)
    range1.setStart(textNode, 6); // Starting at the 6th character: "there"
    range1.setEnd(textNode, 22); // Ending after "new beginning"

    const textHighlight = new Highlight(range1);

    // Apply the highlight to the `contents_highlight` name
    CSS.highlights.set('contents_highlight', textHighlight);
    }

    