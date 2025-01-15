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
    
    window.addEventListener('scroll', scrollContactProgress);

    // When the user scrolls the page, execute myFunction 

    const dragText = document.querySelector('.dragText');
    const dropText = document.querySelector('.dropText');
    let dragged;

    const dragHandler = (event) => {
        event.target.classList.add("dragging");
        event.dataTransfer.setData('text/html', event.target.textContent);
        dragged = event.target;
    }

    const dropEnterHandler = (event) => {
        event.preventDefault();
        // console.log(event.dataTransfer.getData())
        if (event.target.classList.contains("dropText")) {
            event.target.classList.add("dragover");
          }
    }

    const dropLeaveHandler = (event) => {
        event.preventDefault();
        // console.log(event.dataTransfer.getData())
        if (event.target.classList.contains("dropText")) {
            event.target.classList.remove("dragover");
            event.target.appendChild(dragged);
          }
    }
    const dropOverHandler = (event) => {
          event.preventDefault();
    }
    
    // const dropHandler = (event) => {
    //     event.preventDefault();
    // // move dragged element to the selected drop target
    // if (event.target.classList.contains("dropText")) {
    //     event.target.classList.remove("dragover");
    //     event.target.appendChild(dragged);
    //     // alert("Dropped")
    // }
    // } 

    const dragEndHandler = (event) => {
        event.target.classList.remove("dragging");
    }

    dragText.addEventlistener('dragend', dragEndHandler);
    dragText.addEventListener('dragstart', dragHandler);
    dropText.addEventListener('dragover', dropOverHandler);
    dropText.addEventListener('dragenter', dropEnterHandler);
    dropText.addEventListener('dragleave', dropLeaveHandler);
    dropText.addEventListener('drop', dropHandler);
})