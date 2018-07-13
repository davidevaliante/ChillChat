import React from 'react';
import {connect} from 'react-redux';
import {Input} from 'semantic-ui-react';
import {changePlayList} from './../actions/activeChannelActions.js';

const YouTubePlayer = (props) => {


    const playlistId = () => {
        return props.activeChannel.playlist.playlistId
    }

    const youtubeParser = (url) => {
        const regExp =/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match&&match[7].length===11)? match[7] : false;
    }

    const handleNewLink = (event) => {
        if(event.target.value.length !== 0){
            const pasted = youtubeParser(event.target.value);
            if (pasted!== undefined && pasted.length!==0 && pasted!==false) {
                console.log(pasted);
                props.dispatch(changePlayList(pasted))
            } else {
                props.dispatch(changePlayList('INVALID'))
            }
        }
    }

    return(
        <div>
            <iframe
                title='chillChat'height="250"
                src={`https://www.youtube.com/embed/${playlistId()}` +
                     `?autoplay=1&loop=1&mute=1&enablejsapi=1`+
                     `&playlist=${playlistId()}`+
                     `&output=embed`}
                     frameBorder="0"
                     allowFullScreen
                >
            </iframe>
            <Input
                id='newLinkInput'
                style={{marginRight:'8px'}}
                fluid
                error={props.activeChannel.playlist.playlistId === 'INVALID' ? true : false}
                onChange={handleNewLink}
                placeholder={(props.activeChannel.playlist.playlistId === 'INVALID' && props.activeChannel.playlist.playlistId.length!==0)?
                                'Invalid Url': 'Paste a link to change song/playlist'}
                />
        </div>
    );
}

const mapStateToProps = (state) =>({
    activeChannel : state.activeChannel,
    dispatch : state.dispatch
})

export default connect(mapStateToProps)(YouTubePlayer);
