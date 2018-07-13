function defaultFunc (id) {
    const viewToScroll = document.getElementById(id);
    console.log('schould scroll')

    if(viewToScroll){
        console.log('view found')
        viewToScroll.scrollIntoView()
    }else{
        console.log('view NOT found')
    }
}

const myState = {goToBottom:defaultFunc}

export const goToBottom = (state = myState ) => {
    return state;
}

export default goToBottom;
