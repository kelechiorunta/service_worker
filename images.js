document.addEventListener('DOMContentLoaded', () => {
    const imgfigure = document.querySelector('.img_figure');
    const imgPlaceholder = imgfigure.querySelector('.placeholder');
    const imgPic = imgPlaceholder.querySelector('img');

    // Check for state in sessionStorage
    const state = sessionStorage.getItem('navigationState');
    if (state) {
        console.log('State from sessionStorage:', state);
        // const { id, text } = state;
        // Display state on the page
        const stateContainer = document.querySelector('.state-display');
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
            stateContainer.textContent = `${state}`;
            imgPic.src = `./imgs/next${parseInt(state) + 1}.jpg`;
            imgPlaceholder.style.setProperty('background-image', `url(/smallImg/${parseInt(state) + 1}) `);
            imgPlaceholder.style.setProperty('width', `400px`);
            imgPlaceholder.style.setProperty('height', `400px`);
        }
    } else {
        console.log('No state found in sessionStorage.');
    }
})