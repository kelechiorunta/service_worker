document.addEventListener('DOMContentLoaded', () => {
    const contactheader = document.querySelector('.contactHeader');
    const contactScrollContainer = contactheader.querySelector('.contact-progress-container');
    const contactProgressBar = contactScrollContainer.querySelector('.contact-progress-bar');

     /**Scroll handler for the scroll indicator */
    const scrollContactProgress = () => {
    
    console.log(contactProgressBar)
        
    var contact_winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var contact_height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var contact_scrolled = (contact_winScroll / contact_height) * 100;
    contactProgressBar.style.width = contact_scrolled + "%";
    }
    
    window.addEventListener('scroll', scrollContactProgress)
})