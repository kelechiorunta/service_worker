document.addEventListener('DOMContentLoaded', () => {
    // alert("Hello")
    // console.log(navigation)
    navigation.addEventListener('navigate', (event) => {
        const state = window.navigationState || event.state;
        console.log(state, event)
        if (state) {
            console.log('Global state:', state);
            if (state.from === 'main') {
                console.log('Navigated from main.js:', state.info);
            }
        } else {
            console.log('No state passed with the navigation event.');
        }

    })
})