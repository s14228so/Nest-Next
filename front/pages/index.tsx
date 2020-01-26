import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components'
import { NextPage } from "next";
import axios from "../plugins/axios"
import { Artist } from "../types"
import ArtistList from "../components/ArtistList"

import { State } from "../store"
import { authCheck } from '../store/sessions/actions';
const Title = styled.h1`
  color: grey;
  font-size: 24px;
`

export const Wrapper = styled.div`
  margin: 20px auto;
  width: 80%;
`

interface IProps {
  artists: Artist[]
}
const loginUser = (state: State) => state.user


const Index: NextPage<IProps> = ({ artists }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authCheck())
    return () => {

    };
  }, [])
  const user = useSelector(loginUser)
  return <div>
    <Wrapper>
      <p>{user.uid ? user.uid : "ユーザーいないよ"}</p>
      <Title>アーティスト一覧</Title>
      <ArtistList artists={artists} />
    </Wrapper>
    <style global jsx>{`
      *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      `}</style>
  </div>;
}
// async必須。
Index.getInitialProps = async () => {
  const { data } = await axios.get("/api/v1/artists")
  return { artists: data };
}
export default Index;

