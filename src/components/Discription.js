import React from 'react';
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root:{
        width:"80%",
        margin:"30px",
    },
    content:{
        fontSize: "16px",
    },
}));

function Discription() {
    const classes= useStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.content}>
                <b>あなたの英単語タイピング速度はどのくらいでしょう？</b><br />
                CPM(Characters Per Minute)：1分間あたりに入力できる文字数から判定します。<br />
                単語の間はスペースを入力してください。<br />
                下の英文のどこかをクリックしたあとにスタートできます。
            </Typography>
        </div>
    )
}

export default Discription;