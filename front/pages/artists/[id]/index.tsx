import React, { useState, useEffect } from 'react'
import { NextPage } from "next"
import { useSelector, useDispatch } from "react-redux"
import { Wrapper } from "../.."
import axios from "../../../plugins/axios";
import { Artist, Song } from "../../../types"
import Link from "next/link"
import Title from "../../../components/style/Title"
import Button from "../../../components/style/Button"
import ListElement from '../../../components/style/ListElement';
import SearchBar from "../../../components/atoms/SearchBar"
import { login } from "../../../store/sessions/actions"
import { State } from '../../../store';


interface IProps {
    artist: Artist
}


interface IState extends IProps {
}

const loginUser = (state: State) => state.user



const ArtistElement: NextPage<IProps> = ({ artist }) => {
    const [state, setArtist] = useState<IState>({ artist })
    const [searchWord, setWord] = useState("")
    const [allSongs] = useState([...artist.songs])
    const dispatch = useDispatch();
    const user = useSelector(loginUser)
    const [votedSongs, setVotedSongs] = useState<Song[]>([])




    const songNameArr = votedSongs.map(song => {
        song.name
    })

    const shareText = `
    ${songNameArr}に投票したよ`


    useEffect(() => {
        dispatch(login())
        return () => {
        };
    }, [])


    const setVote = async (song: Song) => {
        const vote = {
            user_id: user.uid
        }
        try {
            dispatch({
                type: "SET_MESSAGE",
                payload: {
                    body: ""
                }
            })
            const { data } = await axios.post(`/api/v1/songs/${song.id}/votes`, { vote })
            setArtist({ artist: data })
            setVotedSongs([...votedSongs, song])
        }
        catch (error) {
            dispatch({
                type: "SET_MESSAGE",
                payload: {
                    body: "※1曲の投票はお一人様1回限りです"
                }
            })
        }

    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWord(e.target.value)
        if (e.target.value) {
            const result = state.artist.songs.filter(song => {
                return song.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1;
            })

            setArtist({ artist: { ...artist, songs: result } })
        } else {
            setArtist({ artist: { ...artist, songs: allSongs } })
        }

    }

    return (
        <Wrapper>
            <h2> {state.artist.name}</h2>
            <Link href="/artists/[id]/ranking" as={`/artists/${state.artist.id}/ranking`}>
                <a>みんなの投票曲ランキングを見る ⇨ </a>
            </Link>
            <SearchBar onChange={handleChange} value={searchWord} ></SearchBar>
            <div style={styles.imageBox}>
                <img style={styles.image} src={artist.image.url} alt={artist.image.name} />
            </div>

            {state.artist.songs.map((song, i) => {
                return (
                    <ListElement key={i} style={styles.songBox}>
                        <Title>{song.name} / {song.votes_count}票 </Title>


                        <Button style={styles.voteBtn} onClick={() => setVote(song)}>投票する</Button>
                    </ListElement>

                )
            })}
            <a href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                data-text={shareText}
                className="twitter-share-button"
                data-show-count="false">Tweet</a>
            <script async src="https://platform.twitter.com/widgets.js"></script>
        </Wrapper>


    )
}

ArtistElement.getInitialProps = async function (context) {
    const { id } = context.query;
    const { data } = await axios.get(`/api/v1/artists/${id}`);
    return { artist: data };
};

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

export default ArtistElement