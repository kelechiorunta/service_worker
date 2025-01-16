document.addEventListener('DOMContentLoaded', async() => {
    const imgfigure = document.querySelector('.img_figure');
    const imgPlaceholder = imgfigure.querySelector('.placeholder');
    const imgPic = imgPlaceholder.querySelector('img');

    const fetchState = async(param) => {
        try{
            const response = await fetch(`/details/${param}`);
            const data = await response.json();
            return data
        }
        catch(err){
            console.error(err)
        }
    }

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
            
            console.log(imgPlaceholder)
            stateContainer.textContent = result?.title//`${state}`;
            stateContainer.style.setProperty('z-index', '10');
            imgDetailsSummary.textContent = `DETAILS OF ${result?.title.toUpperCase()}`
            imgPic.src = `./imgs/next${parseInt(state) + 1}.jpg`;
            imgPlaceholder.style.setProperty('background-image', `url(/smallImg/${parseInt(state) + 1}) `);
            imgPlaceholder.style.setProperty('width', `400px`);
            imgPlaceholder.style.setProperty('height', `400px`);
            // imgDetailsFrame.src =  `/details/${parseInt(state)}`;
            // imgDetailsFrame.style.setProperty('font-size', `2vw`);
            // imgDetailsFrame.style.setProperty('border-radius', `10px`);
            // imgDetailsFrame.style.setProperty('background-color', `white`);
            
            
            
            specieDetails.textContent = result?.content; 
            specieTitle.textContent = result?.title.toUpperCase(); 
            specieTitle.style.setProperty('font-size', '3vw')
            // const iframeDoc = imgDetailsFrame.contentDocument || imgDetailsFrame.contentWindow.document;
            // const iframeHTML = iframeDoc.documentElement.innerHTML;
            // const iframeBody = iframeDoc//.querySelector('pre')
            // console.log(imgDetailsFrame)
        }
    } else {
        console.log('No state found in sessionStorage.');
    }
})