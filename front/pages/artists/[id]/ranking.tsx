import { NextPage } from "next"
import { Wrapper } from "../../"
import axios from "../../../plugins/axios"
import { Song } from "../../../types"
import styled from "styled-components"
import Video from "../../../components/Video"
import React, { useState } from 'react'
import Title from "../../../components/style/Title"

interface IProps {
    songs: Song[]
}

const ArtistTitle = styled.span`
  font-size: 20px;
  font-weight: bold;
`

const AboutPage: NextPage<IProps> = ({ songs }) => {

    songs = songs.map(song => {
        return { ...song, isVisible: false }
    })

    const [rankingSongs, setSongs] = useState(songs)

    const setVideo = (song: Song) => {
        const newSongs = rankingSongs.map(s => {
            if (s.id === song.id) {
                s.isVisible = !s.isVisible
            } else {
                s.isVisible = false
            }
            return s
        })
        setSongs(newSongs)
    }


    const closeAllModal = () => {
        const newSongs = rankingSongs.map(s => {
            s.isVisible = false
            return s
        })
        setSongs(newSongs)
    }


    return (
        <Wrapper>
            <ArtistTitle>{rankingSongs[0].artist.name}</ArtistTitle>のランキングページ
            {rankingSongs.map((song, i) => {
                return (
                    <div key={i} style={styles.songBox} >
                        {i + 1}位 <Title style={{ cursor: "pointer" }} onClick={() => setVideo(song)}>{song.name} / {song.votes_count}票</Title>
                        {
                            song.isVisible && (
                                <Video song={song} closeModal={closeAllModal}></Video>
                            )

                        }
                    </div>
                )
            })}
        </Wrapper>
    )
}

const styles = {
    imageBox: {
        width: "200px",
        height: "100px",
        margin: "20px 0px"
    },
    image: {
        width: "100%"
    },
    songBox: {
        padding: "10px 6px"
    },
    voteBtn: {
        marginTop: "4px",
        padding: "2px 6px"
    }
}

AboutPage.getInitialProps = async ({ query }) => {
    const { data } = await axios.get(`/api/v1/artists/${query.id}/ranking`);
    return { songs: data };
}
export default AboutPage