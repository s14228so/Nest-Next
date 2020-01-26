import React from 'react';
// import Modal from '@material-ui/core/Modal';
// import { useInteractJS } from "../hooks/drugable"
import { useInteractJS } from "../hooks/drugable";
import { Song } from "../types"
import Button from "../components/style/Button"



interface Iprops {
    song: Song,
    closeModal: () => void
}



const Video: React.FC<Iprops> = ({ song, closeModal }) => {
    // const interact = useInteractJS();
    console.log({ song })
    const interact = useInteractJS();

    return (
        <div
            id="video-box"
            ref={interact.ref}
            style={{
                ...interact.style,
                border: "2px solid #000",
                backgroundColor: "grey",
                position: "absolute" as "absolute",
                display: "flex",
                flexDirection: "column",/* 子要素をflexboxにより縦方向に揃える */
                justifyContent: "center", /* 子要素をflexboxにより中央に配置する */
                alignItems: "center"/* 子要素をflexboxにより中央に配置する */
            }}
        >
            <iframe style={{
                width: "80%",
                height: "80%",
            }} src={song.video_url} allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"></iframe>
            {/* <button onClick={viewlyrics}>歌詞を表示</button> */}
            {/* <div style={makeStyle()} >
                <p>歌詞</p>
                {song.lyrics}
            </div> */}
            <Button onClick={closeModal}>閉じる</Button>

        </div>
    );
}



export default Video