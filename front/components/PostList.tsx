import React from "react"
import { Post } from "../types"
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: 275,
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
});

interface IProps {
    posts: Post[]
}



const PostList: React.FC<IProps> = ({ posts }) => {
    const classes = useStyles();
    return (
        <ul>
            {posts.map((post: Post, i: number) => {
                return (
                    <Card className={classes.card} key={i}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {post.user.name}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {post.body}
                            </Typography>
                        </CardContent>

                    </Card>
                )
            })}
        </ul>
    )

}


export default PostList