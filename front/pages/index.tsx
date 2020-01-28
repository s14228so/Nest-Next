import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components'
import { NextPage } from "next";
import { State } from "../store"
import PostIndex from "../components/PostList"
import { authCheck } from '../store/sessions/actions';
import AddPost from "../components/AddPost"

const Title = styled.h1`
  color: grey;
  font-size: 24px;
`

export const Wrapper = styled.div`
  margin: 20px auto;
  width: 80%;
`

// interface IProps {
//   posts: Post[]
// }
const loginUser = (state: State) => state.user


const Index: NextPage = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authCheck())
    return () => {
    };
  }, [])
  const user = useSelector(loginUser)
  return <div>
    <Wrapper>
      <Title>TodoList</Title>
      <AddPost></AddPost>
      {user.posts && (<PostIndex posts={user.posts}></PostIndex>)}

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

}
export default Index;

