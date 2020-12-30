import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";

import logo from ".././images/typeee-logo.svg";
import { timeFormatting, cpmToRank, cpmToDiscription } from "../util/util";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";

import { TwitterShareButton, TwitterIcon } from "react-share";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    textAlign: "center",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  logo: {
    width: "150px",
    marginBottom: "20px",
  },
  content: {
    fontSize: "20px",
    fontFamily: "Meiryo",
  },
}));

function SuccessModal(props) {
  const classes = useStyles();

  const result = props.result;
  const cpm =
    result.charLength === 0 || result.timeOfTyping === 0
      ? -1
      : ((result.charLength / result.timeOfTyping) * 1000 * 60).toFixed(0);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={props.modalOpen}
        onClose={props.modalClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.modalOpen}>
          <div className={classes.paper}>
            <img src={logo} alt="logo" className={classes.logo} />
            <div id="transition-modal-description">
              <Typography className={classes.content}>
                文字数: {result.charLength}
                <br />
                タイム: {timeFormatting(result.timeOfTyping)}
                <br />
                精度:{" "}
                {(
                  (result.charLength / (result.charLength + result.missCount)) *
                  100
                ).toFixed(1)}
                %<br />
                CPM(1分間あたりの入力文字数): {cpm}
                <br />
              </Typography>
              <Box marginTop="20px">
                <Typography style={{ display: "inline", fontSize: "20px" }}>
                  あなたは・・・
                </Typography>
                <Typography
                  style={{
                    display: "inline",
                    fontSize: "28px",
                    fontWeight: "bold",
                  }}
                >
                  {cpmToRank(cpm)}
                </Typography>
              </Box>
              <Box marginTop="20px" maxWidth="500px">
                <Typography style={{ fontSize: "18px" }}>
                  {" "}
                  {cpmToDiscription(cpm)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="center" m={4}>
                <Button
                  onClick={props.refreshAll}
                  color="primary"
                  variant="contained"
                >
                  もう一度
                </Button>
                <Box marginLeft="50px">
                  <Tooltip title="結果を投稿する" placement="top">
                    <TwitterShareButton
                      url="https://shintaro-hirose.github.io/typeee/"
                      title={`typeee!でタイピング速度を計測しました！ ${
                        result.charLength
                      }文字, ${timeFormatting(result.timeOfTyping)}秒, 精度 ${(
                        (result.charLength /
                          (result.charLength + result.missCount)) *
                        100
                      ).toFixed(1)} %, ${cpm} CPM, 評価は "${cpmToRank(
                        cpm
                      )}" でした。`}
                      hashtags={["typeee"]}
                    >
                      <TwitterIcon size={40} round={true} />
                    </TwitterShareButton>
                  </Tooltip>
                </Box>
              </Box>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default SuccessModal;
