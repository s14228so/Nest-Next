import React from "react"
import { Artist } from "../types"
import Link from "next/link"
import styled from "styled-components"
import ImageBox from "../components/atoms/ImageBox"
import Title from "../components/style/Title"
import ListElement from "./style/ListElement"

interface IProps {
    artists: Artist[]
}


const ArtistNameLink = styled.a`
  font-size: 20px
  cursor: pointer;
  &:hover{
    opacity: .7;
  }
`


const ArtistList: React.FC<IProps> = ({ artists }) => {
    return (
        <ul>
            {artists.map((artist: Artist, i: number) => {
                return (
                    <ListElement key={i}>
                        <Link href="/artists/[id]" as={`/artists/${artist.id}`}>
                            <ArtistNameLink> <Title>{artist.name}</Title></ArtistNameLink>
                        </Link>
                        <ImageBox image={artist.image} />
                    </ListElement>
                )
            })}
        </ul>
    )

}


export default ArtistList