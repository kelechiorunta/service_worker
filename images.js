document.addEventListener('DOMContentLoaded', async() => {
    const imgfigure = document.querySelector('.img_figure');
    const imgPlaceholder = imgfigure.querySelector('.placeholder');
    const imgPic = imgPlaceholder.querySelector('img');
    const mainHeader = document.querySelector('.imagesHeader')
    const imageProgressContainer = mainHeader.querySelector('.images-progress-container');
    const imageProgressBar = imageProgressContainer.querySelector('.images-progress-bar');
    console.log(imageProgressBar);

    let start;
    let pos = 0;
    let loadId;

    const fetchState = async(param) => {
        resetProgressBar(); // Reset progress bar state
        requestAnimationFrame(loadAPI); // Start animation

        try{
            const response = await fetch(`/details/${param}`);
            const data = await response.json();
            return data
        }
        catch(err){
            console.error(err)
        }
        finally{
            cancelAnimationFrame(loadId); // Stop animation
            finalizeProgressBar(); // Set progress to 100% or reset
            
        }  
    }

    const loadAPI = (timeStamp) => {
        if (!start) {
            start = timeStamp; // Initialize the start time
        }
    
        // Calculate progress based on elapsed time
        const elapsedTime = timeStamp - start;
        const progress = Math.min((elapsedTime / 3000) * 100, 100); // 3000ms is arbitrary fetch time
    
        // Update the progress bar width
        imageProgressBar.style.width = `${progress}%`;
    
        if (progress < 100) {
            loadId = requestAnimationFrame(loadAPI); // Continue animation
        }
    };
    

    const finalizeProgressBar = () => {
        imageProgressBar.style.width = '100%'; // Set progress to 100% upon completion
        setTimeout(() => resetProgressBar(), 500); // Reset after a delay
    };

    const resetProgressBar = () => {
        cancelAnimationFrame(loadId); // Stop any ongoing animations
        imageProgressBar.style.width = '0%'; // Reset progress
        start = null; // Clear stored start time
    };

    document.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollYPos = document.body.scrollTop || document.documentElement.scrollTop;
        const posY = (scrollYPos / height) * 100
        if (imageProgressBar) {
            imageProgressBar.style.width = `${posY}%`;
        }
    })

    // console.log(navigation.currentEntry)

    // fetch(`/details/${param}`)
    //     .then(res => {return res.json()})
    //     .then(res => {return res})
    //     .catch(err=>  console.error(err))

    // Check for state in sessionStorage
    const state = sessionStorage.getItem('navigationState');
    if (state) {
        const result = await fetchState(state);
        console.log(result)
        console.log('State from sessionStorage:', state);
        
        const stateContainer = document.querySelector('.state-display');
        const imgDetailsContainer = document.querySelector('.specie_frame .images_contents');
        const imgDetails = imgDetailsContainer.querySelector('details');
        const imgDetailsSummary = imgDetails.querySelector('summary');
        const imageFrame = document.querySelector('.image_frame');
        const imgDetailsFrame = imgDetails.querySelector('iframe');
        const specieDetails = imgDetails.querySelector('.specie-details');
        const specieTitle = imgDetails.querySelector('.specie-title');
        
        if (stateContainer && imgPlaceholder) {

            const imgplaceholderLoaded = () => {
                imgPlaceholder.classList.add('loaded');
            }
            
                const placeholderImg = imgPlaceholder.querySelector('img');
    
                if (placeholderImg.complete) {
                    imgplaceholderLoaded()
                }else{
                    placeholderImg.addEventListener('load', imgplaceholderLoaded)
                }
            
            // console.log(imgPlaceholder)
            stateContainer.textContent = result?.title//`${state}`;
            stateContainer.style.setProperty('z-index', '10');
            imgDetailsSummary.textContent = `DETAILS OF ${result?.title.toUpperCase()}`
            
            // requestIdleCallback((idleObj) => {
                // if (idleObj.didTimeout) {
                    imgPic.src = `./imgs/next${parseInt(state) + 1}.jpg`;
                    imgPic.style.setProperty('border', 'none');
                // }
            // }, {timeout: 1})
            
            imgPlaceholder.style.setProperty('background-image', `url(/smallImg/${parseInt(state)}) `);
            imageFrame.style.setProperty('background-image', `url(/smallImg/${parseInt(state)}) `);
            imgPlaceholder.style.setProperty('width', `60vh`);
            imgPlaceholder.style.setProperty('height', `60vh`);
            imgPlaceholder.style.setProperty('border', `none`);
            
            specieDetails.textContent = result?.content; 
            specieTitle.textContent = result?.title.toUpperCase(); 
            specieTitle.style.setProperty('font-size', '3vw')
            
        }
    } else {
        console.log('No state found in sessionStorage.');
    }
})