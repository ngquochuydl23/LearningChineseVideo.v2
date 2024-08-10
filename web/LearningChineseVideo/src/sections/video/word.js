import { Box, Button, Popover, Stack, Typography } from "@mui/material";
import { useState } from "react";
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { getVocabulary } from "src/services/api/vocabulary";
import _ from "lodash";
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import { saveVoca, delSavedVoca, checkSaved } from "src/services/api/saved-voca-api";
import { useSnackbar } from 'notistack';

const Word = ({
    word,
    onClick,
    videoId,
    showedAt,
    sentence
}) => {

    const { enqueueSnackbar } = useSnackbar();
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState(null);
    const [vocabulary, setVocabulary] = useState();

    const separateExampleAsLine = (example) => {
        var chinese = _.map(example.split('。'))[0];
        var rest = _.map(example.split('。'))[1];
        var examples = [chinese]
        if (rest) {
            examples = [chinese, ..._.map(rest.split('. '))];
        }
        return examples;
    }

    const fetchWord = (word) => {
        getVocabulary(word)
            .then((res) => {
                console.log(res);
                setError(null);
                setVocabulary(res);
                checkSaved(word, videoId, showedAt.from, showedAt.to)
                    .then((res) => {
                        setSaved(true);
                        console.log("Restful: Voca is saved");
                    })
                    .catch((err) => {
                        setSaved(false);
                        console.log(err);
                    });
            })
            .catch(err => {
                setVocabulary(null);
                console.log(err);
                setError(err);
            });
    }

    const saveWord = () => {
        if (!vocabulary)
            return;


        if (saved) {
            setSaved(false);
            console.log("Remove saved list");
            delSavedVoca(word, videoId, showedAt.from, showedAt.to)
                .then((res) => {
                    enqueueSnackbar(`Đã xóa lưu thành công từ vựng`, {
                        variant: 'success',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right'
                        }
                    });
                    setSaved(false);
                    console.log("Restful: Voca is removed");
                })
                .catch((err) => {
                    enqueueSnackbar(`Lỗi ` + err, {
                        variant: 'error',
                        anchorOrigin: {
                            vertical: 'bottom',
                            horizontal: 'right'
                        }
                    });
                    setSaved(true);
                    console.log(err);
                })
            return;
        }
        setSaved(true);
        saveVoca({
            videoId,
            vocabularyId: word,
            showedFrom: showedAt.from,
            showedTo: showedAt.to,
            sentence: sentence
        })
            .then(() => {
                setSaved(true);
                enqueueSnackbar(`Đã lưu thành công từ vựng ${word}`, {
                    variant: 'success',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    }
                });
                console.log("Saved voca");
            })
            .catch((err) => {
                setSaved(false);
                enqueueSnackbar(`Lỗi ` + err, {
                    variant: 'error',
                    anchorOrigin: {
                        vertical: 'bottom',
                        horizontal: 'right'
                    }
                });
                console.log(err)
            })
    }


    return (
        <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
                <div onClick={() => {
                    console.log(word);
                    fetchWord(word);
                    onClick();
                }}>
                    <Typography
                        {...bindTrigger(popupState)}
                        sx={{
                            color: '#06AED4',
                            height: '40px',
                            fontWeight: '600',
                            fontSize: "25px",
                            '&:hover': {
                                backgroundColor: 'rgb(6, 174, 212, 0.2)',
                                color: '#06AED4',
                                paddingX: '7px',
                                borderRadius: '10px'
                            },
                            "&.Mui-active": {
                                backgroundColor: 'rgb(6, 174, 212, 0.2)',
                                color: '#06AED4',
                                paddingX: '7px',
                                borderRadius: '10px'
                            },
                        }}
                        variant="text">
                        {word}
                    </Typography>
                    <Popover
                        {...bindPopover(popupState)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}>
                        <Box sx={{ width: '300px', p: 2 }}>
                            <Stack
                                justifyContent="space-between"
                                direction="row">
                                <Typography
                                    fontWeight="600"
                                    fontSize="20px">
                                    {word}
                                </Typography>
                                {vocabulary &&
                                    <Button
                                        sx={{
                                            backgroundColor: 'whitesmoke',
                                            paddingX: '10px',
                                            paddingY: '5px',
                                            minWidth: '20px'
                                        }}
                                        onClick={saveWord}
                                        variant="text">
                                        {(saved ? <BookmarkIcon /> : <BookmarkBorderIcon />)}
                                    </Button>
                                }
                            </Stack>
                            {(vocabulary) &&
                                <div>
                                    <p style={{ marginTop: 0 }}>{`[`}{vocabulary.pinyin}{`]`}   {vocabulary.sinoVietnamese && `【${vocabulary.sinoVietnamese}】`}</p>
                                    <p style={{ fontSize: '14px' }}>Từ loại: {vocabulary.wordType}</p>
                                    <p style={{ fontSize: '14px' }}>Cấp độ: {vocabulary.level}</p>
                                    <p style={{ fontSize: '14px' }}>Nghĩa: {vocabulary.vietnameseMean}</p>
                                    <p style={{ fontSize: '14px' }}>Ví dụ:</p>
                                    <div style={{ marginLeft: '20px' }}>
                                        {Boolean(vocabulary.example) &&
                                            _.map(separateExampleAsLine(vocabulary.example), (item => (
                                                <p style={{ fontSize: '14px' }}>{item}</p>
                                            )))
                                        }
                                    </div>

                                </div>
                            }
                            {error && <div>Không tìm thấy tự vựng</div>}
                        </Box>

                    </Popover>
                </div>
            )}
        </PopupState>
    )
}

export default Word;