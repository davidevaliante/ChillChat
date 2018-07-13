import React from 'react';
import {connect} from 'react-redux';


const Presence = (props) => {
    console.log(props.folks) 
    return(
        <h1>lol</h1>

    );
}

const mapStateToProps = (state) => ({
    folks : state.activeChannel.folks
})

export default connect(mapStateToProps)(Presence);
