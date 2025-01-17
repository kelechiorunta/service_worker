document.addEventListener('DOMContentLoaded', () => {
    const contactheader = document.querySelector('.contactHeader');
    const contactScrollContainer = contactheader.querySelector('.contact-progress-container');
    const contactProgressBar = contactScrollContainer.querySelector('.contact-progress-bar');
    const dragText = document.querySelector('.dragText');
    const dropText = document.querySelectorAll('.dropText');
    const geoLocationBtn =  document.querySelector('.geolocationBtn');
    const geoLocationResult = document.querySelector('.geolocation_pos');


    let dragged;
    console.log(navigation)
    console.log(dragText, dropText)


    /**
     * Check geolocation position with the geoLocation API
     * 
     */

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        geoLocationResult.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`
    }

    const error = (error) => {
        console.log("Failed to get location", error)
    }

    const options = {
        enableHighAccuracy: true,
        maximumAge: 30000,
        timeout: 27000,
    }

    const getLocation = async() => {
        if ('geolocation' in navigator) {
            console.log("Geolocation is supported");
    
            navigator.geolocation.getCurrentPosition(success, error)

            const watchID = navigator.geolocation.watchPosition(success, error);
            console.log(watchID)
            return watchID;

            
        }else{
            console.log("Geolocation API not supported")
        }
    }

    geoLocationBtn.addEventListener('click', getLocation)

     /**Scroll handler for the scroll indicator */
    const scrollContactProgress = () => {
    
    console.log(contactProgressBar)
        
    var contact_winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var contact_height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var contact_scrolled = (contact_winScroll / contact_height) * 100;
    contactProgressBar.style.width = contact_scrolled + "%";
    }
    
    window.addEventListener('scroll', scrollContactProgress);

    // Drag and Drop API

    const dragStartHandler = (event) => {
        // event.target.classList.add("dragging");
        event.dataTransfer.setData('text', event.target.id);
        event.dataTransfer.setDragImage(event.target, 25, 25)
        dragged = event.target;
        console.log(dragged)
    }

    const dropEnterHandler = (event) => {
        
        console.log(event.dataTransfer.getData())
        if (event.target.classList.contains("dropText")) {
            event.target.classList.add("dragover");
            event.preventDefault();
            console.log(event.target)
          }
    }

    const dropLeaveHandler = (event) => {
        //  event.preventDefault();
        // console.log(event.dataTransfer.getData())
        if (event.target.classList.contains("dropText")) {
            event.target.classList.remove("dragover");
            event.target.appendChild(dragged);
          }
    }
    const dropOverHandler = (event) => {
          event.preventDefault();
        //   event.dataTransfer.dropEffect = 'move';
    }
    
    const dropHandler = (event) => {
        event.preventDefault();
    // move dragged element to the selected drop target
    // if (event.target.classList.contains("dropText")) {
        // event.target.classList.remove("dragover");
        var item = event.dataTransfer.getData('text');
        var droppedItem = document.getElementById(`${item}`);
        event.target.appendChild(droppedItem);
        console.log(item, droppedItem)
        // alert("Dropped")
    // }
    } 

    const dragEndHandler = (event) => {
        event.target.classList.remove("dragging");
        if (event.dataTransfer.dropEffect == 'move') {
            // remove the dragged element
            // event.target.parentNode.removeChild(event.target);
          }
    }
    console.log(dragText, dropText)

    if (dragText) {
        // dragText.addEventListener('dragend', dragEndHandler);
        dragText.addEventListener('dragstart', dragStartHandler);
       
    }
    
    if (dropText) {
        dropText.forEach(dropElement => {
            dropElement.addEventListener('dragover', dropOverHandler);
        // dropText.addEventListener('dragenter', dropEnterHandler);
        // dropText.addEventListener('dragleave', dropLeaveHandler);
            dropElement.addEventListener('drop', dropHandler);
        })
    }
    
})