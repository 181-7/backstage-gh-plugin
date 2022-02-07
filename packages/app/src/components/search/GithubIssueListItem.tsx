import React from 'react';
import { Avatar, Box, Chip, Divider, Grid, ListItem, ListItemText, makeStyles } from '@material-ui/core';
import { Link } from '@backstage/core-components';

const useStyles = makeStyles({
    flexContainer: {
        flexWrap: 'wrap',
    },
    itemText: {
        width: '100%',
        wordBreak: 'break-all',
        marginBottom: '1rem',
    },
});

export const GithubIssueResultListItem = ({ result }: any) => {
    const { location, title, text, author, avatar } = result;
    const classes = useStyles();
    return (
        <Link to={location} target="_blank">
            <Grid container>
                <Grid item xs={2}>
                    <Grid container direction="column" alignItems="center">
                        <Grid item>
                            <Box pt={2}>
                                <Avatar alt={author} src={avatar} />
                            </Box>
                        </Grid>
                        <Grid item>
                            <Chip label={author} size="small" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={10}>
                    <ListItem className={classes.flexContainer}>
                        <ListItemText
                            className={classes.itemText}
                            primaryTypographyProps={{ variant: 'h6' }}
                            primary={title}
                            secondary={`${text.substring(0, 200)}...`}
                        />
                    </ListItem>
                </Grid>
            </Grid>

            <Divider component="li" />
        </Link>
    );
};