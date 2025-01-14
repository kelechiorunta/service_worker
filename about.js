document.addEventListener('DOMContentLoaded', () => {
    const aboutheader = document.querySelector('.aboutHeader');
    const aboutScrollContainer = aboutheader.querySelector('.about-progress-container');
    const aboutProgressBar = aboutScrollContainer.querySelector('.about-progress-bar');

     /**Scroll handler for the scroll indicator */
     const scrollAboutProgress = () => {
    
    console.log(aboutProgressBar)
        
    var about_winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var about_height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var about_scrolled = (about_winScroll / about_height) * 100;
    aboutProgressBar.style.width = about_scrolled + "%";
    }
    
    window.addEventListener('scroll', scrollAboutProgress)
})