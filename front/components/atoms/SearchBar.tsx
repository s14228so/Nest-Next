import React from "react"
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import styled from "styled-components"

interface IProps {
    onChange(e: React.ChangeEvent<HTMLInputElement>): void
    value: string
}


const SearchWrapper = styled.div`
  margin-top: 20px;
`

const SearchBar: React.FC<IProps> = (props) => {
    return (
        <SearchWrapper>
            <TextField id="outlined-basic"{...props} label="曲名検索" size="small" variant="outlined"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}>
            </TextField>
        </SearchWrapper>
    )
}


export default SearchBar