import React,{useState, useEffect, useRef} from 'react'

import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import logo from '.././images/typeee-logo.svg';

import SuccessModal from '../components/SuccessModal';
import Discription from '../components/Discription';
import {timeFormatting} from '../util/util'

const {dictionary} = require('../util/dictionary');

const useStyles = makeStyles(() => ({
    logo:{
        width: "400px",
    },
    inputBox:{
        padding: "30px",
        marginBottom: "30px",
    },
    greenFont:{
        color:"#689f38", 
        display:"inline",
        fontFamily:"Times New Roman",
        fontSize: "50px"

    },
    redFont:{
        backgroundColor:"#e0e0e0", 
        color:"red",
        display:"inline",
        fontFamily:"Times New Roman",
        fontSize: "50px"

    },
    greyFont:{
        color:"grey", 
        display:"inline",
        fontFamily:"Times New Roman",
        fontSize: "50px"
    },
    blackFont:{
        backgroundColor:"#e0e0e0", 
        display:"inline",
        fontFamily:"Times New Roman",
        fontSize: "50px"

    },
    stats:{
        display: "inline",
        fontSize: "20px",
        margin: "0 30px",
    },
    rights:{
        fontSize: "20px",
        padding:"20px",
    }
}));

function Home() {
    const classes = useStyles();
    const [typingString, setTypingString] = useState("");
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMisstype, setIsMisstype] = useState(false);
    const [missCount, setMissCount] = useState(0);
    const [finished, setFinished] = useState(false);
    const [started, setStarted] = useState(false);
    const [timeOfTyping, setTimeOfTyping] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [refresh, setRefresh] = useState("");

    const timer = useRef(null);


    useEffect(() => {
        setLoading(true)
        let ts = '';
        for (var i=0; i<20; i++){
            let word = dictionary[Math.floor( Math.random() * (2000) )].letter;
            ts += word + ' '
        }
        let newTypingString = ts.slice(0,-1)
        setTypingString(newTypingString);
        setLoading(false);
    }, [refresh])

    const handleKeyPress = (e) => {
        if(finished) return;
        if(!started){
            setStarted(true);
            const startTime = new Date().getTime();
            timer.current = setInterval(() => {
                setTimeOfTyping((new Date().getTime()) - startTime)
            }, 10)
        }
        if(e.key === typingString[currentIndex]){
            setIsMisstype(false);
            setCurrentIndex(currentIndex + 1);
            if(currentIndex+1 >= typingString.length){
                clearInterval(timer.current);
                setFinished(true);
                setModalOpen(true);
            }
        } else {
            setIsMisstype(true);
            setMissCount(missCount + 1)
        }
    }

    const refreshAll = () => {
        setModalOpen(false);
        setCurrentIndex(0);
        setIsMisstype(false);
        setMissCount(0);
        setFinished(false);
        setStarted(false);
        setTimeOfTyping(0);
        setRefresh(Math.random())
    }


    return (
        loading ? (
            <p></p>
        ) : (
            <div align="center" >
                <img src={logo} alt="logo" className={classes.logo} />
                <Discription />
                <div onKeyPress={(e) => handleKeyPress(e)} tabIndex={0} className={classes.inputBox}>
                    <Typography className={classes.greenFont}>
                        {typingString.slice(0,currentIndex)}
                    </Typography>
                    {isMisstype ? (
                        <Typography className={classes.redFont}>
                            {typingString[currentIndex]}
                        </Typography>
                    ) : (
                        <Typography className={classes.blackFont}>
                            {typingString[currentIndex]}
                        </Typography>
                    )}
                    
                    <Typography className={classes.greyFont}>
                        {typingString.slice(currentIndex+1,typingString.length)}
                    </Typography>
                </div>
                <Box display="flex" justifyContent="center">
                        <Typography className={classes.stats}>
                            ミスタイプ: {missCount}回
                        </Typography>
                        <Typography className={classes.stats}>
                            タイム: {timeFormatting(timeOfTyping)}
                        </Typography>
                </Box>
                <Box marginBottom="50px">
                    <Typography className={classes.stats}>
                        CPM:  {(currentIndex === 0) ? "0" : (currentIndex / timeOfTyping * 1000 * 60).toFixed(0)}
                    </Typography>
                </Box>
                <SuccessModal result={{
                    timeOfTyping,
                    missCount,
                    charLength: typingString.length
                }}
                modalOpen={modalOpen} modalClose={() => setModalOpen(false)} 
                refreshAll={refreshAll}
                />
            </div>
        )
       
    )
}

export default Home;