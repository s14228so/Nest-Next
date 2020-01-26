import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import styled from 'styled-components'
import { NextPage } from "next";

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

// interface IProps {
//   artists: Artist[]
// }
const loginUser = (state: State) => state.user


const SignUpPage: NextPage = () => {
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
      <Title>SignUp Page!</Title>
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
SignUpPage.getInitialProps = async () => {

}
export default SignUpPage;

