import React from "react"
import styled from "styled-components"
import { Image } from "../../types"

interface IProps {
    image: Image
}

const ImageWrapper = styled.div`
  width: 100px;
  height: 60px;
  img {
      width: 100%;
      height: 100%;
  }
`

const ImageBox: React.FC<IProps> = ({ image }) => {
    return (
        <ImageWrapper >
            <img src={image.url} alt={image.name} />
        </ImageWrapper>
    )
}

export default ImageBox