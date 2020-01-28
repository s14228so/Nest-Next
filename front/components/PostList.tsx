import React from "react"
import { Post } from "../types"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from "react-redux"
import { State } from "../store";
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton } from "@material-ui/core";
import axios from "../plugins/axios"
import { postData } from "../store/sessions/actions";

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        marginTop: 30,
        width: "50%"
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    deleteIcon: {
        float: "right"
    }
});

interface IProps {
    posts: Post[]
}


const loginUser = (state: State) => state.user


const PostList: React.FC<IProps> = ({ posts }) => {
    const classes = useStyles();
    const user = useSelector(loginUser)
    const dispatch = useDispatch()
    const deleteTodo = async (id: number) => {
        if (confirm("削除しますか？")) {
            await axios.delete(`/v1/posts/${id}`)
            const posts = user.posts.filter(post => {
                return post.id !== id
            })

            const newUser = { ...user, posts }
            dispatch(postData(newUser))
        }
    }
    return (
        <ul>
            {posts.map((post: Post, i: number) => {
                return (
                    <Card className={classes.card} key={i}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {user.name}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {post.body}
                            </Typography>
                            <IconButton className={classes.deleteIcon}>
                                <DeleteIcon onClick={() => deleteTodo(post.id)}></DeleteIcon>
                            </IconButton>
                        </CardContent>
                    </Card>
                )
            })}
        </ul>
    )

}


export default PostList




