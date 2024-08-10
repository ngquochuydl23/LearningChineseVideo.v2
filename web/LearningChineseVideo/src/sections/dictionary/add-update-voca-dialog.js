import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { addVoca, editVocabulary } from 'src/services/api/voca-api';
import AlertDialog from 'src/components/alert-dialog';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';


export default function AddUpdateVocaDialog({
    open, editedVoca, handleClose, onAdded
}) {
    const [showAlert, setShowAlert] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const router = useRouter();


    const resetForm = () => {
        formik.setValues({
            originWord: '',
            vietnameseMean: '',
            sinoVietnamese: '',
            wordType: '',
            pinyin: '',
            similiarMeaning: '',
            oppositeMeaning: '',
            example: '',
            level: undefined
        })
    }

    const formik = useFormik({
        initialValues: {
            originWord: '',
            vietnameseMean: '',
            sinoVietnamese: '',
            wordType: '',
            pinyin: '',
            similiarMeaning: '',
            oppositeMeaning: '',
            example: '',
            level: undefined
        },

        onSubmit: (values, helpers) => {
            if (!editedVoca) {
                addVoca(values)
                    .then((res) => {
                        onAdded();
                        handleClose();
                        enqueueSnackbar(`Thêm từ  thành công`, {
                            variant: 'success',
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right'
                            }
                        });
                    })
                    .catch(err => {
                        if (err === 'Vocabulary is already exist') {
                            setShowAlert(true);

                        } else {
                            enqueueSnackbar(`Thêm từ thất bại`, {
                                variant: 'error',
                                anchorOrigin: {
                                    vertical: 'bottom',
                                    horizontal: 'right'
                                }
                            });
                        }
                    })
                    .finally(() => resetForm())
            } else {
                editVocabulary(editedVoca.originWord, values)
                    .then((res) => {
                        console.log(res);
                        enqueueSnackbar(`Sửa từ ${editedVoca.originWord} thành công`, {
                            variant: 'success',
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right'
                            }
                        });
                        onAdded();
                        resetForm();
                        handleClose();
                    })
                    .catch(err => {
                        console.log(err);
                        enqueueSnackbar(`Sửa từ ${editedVoca.originWord} thất bại`, {
                            variant: 'error',
                            anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'right'
                            }
                        });
                    })
                    .finally(() => resetForm())
            }
        }
    });

    useEffect(() => {
        if (editedVoca) {
            formik.setValues(editedVoca);
        } else resetForm();
    }, [editedVoca])


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <form onSubmit={formik.handleSubmit}>
                <DialogTitle id="alert-dialog-title">
                    Thêm từ vựng
                </DialogTitle>
                <DialogContent sx={{ minWidth: '500px' }}>
                    <Stack spacing="20px">
                        <TextField
                            error={!!(formik.touched.originWord && formik.errors.originWord)}
                            fullWidth
                            helperText={formik.touched.originWord && formik.errors.originWord}
                            label="Từ"
                            id="originWord"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.originWord}
                        />
                        <TextField
                            error={!!(formik.touched.vietnameseMean && formik.errors.vietnameseMean)}
                            fullWidth
                            helperText={formik.touched.vietnameseMean && formik.errors.vietnameseMean}
                            label="Nghĩa"
                            multiline
                            minRows={5}
                            id="vietnameseMean"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.vietnameseMean}
                        />
                        <TextField
                            error={!!(formik.touched.sinoVietnamese && formik.errors.sinoVietnamese)}
                            fullWidth
                            helperText={formik.touched.sinoVietnamese && formik.errors.sinoVietnamese}
                            label="Hán việt"
                            id="sinoVietnamese"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.sinoVietnamese}
                        />
                        <TextField
                            error={!!(formik.touched.wordType && formik.errors.wordType)}
                            fullWidth
                            helperText={formik.touched.wordType && formik.errors.wordType}
                            label="Từ tính"
                            id="wordType"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.wordType}
                        />
                        <TextField
                            error={!!(formik.touched.pinyin && formik.errors.pinyin)}
                            fullWidth
                            helperText={formik.touched.pinyin && formik.errors.pinyin}
                            label="Pinyin"
                            id="pinyin"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.pinyin}
                        />
                        <TextField
                            error={!!(formik.touched.similiarMeaning && formik.errors.similiarMeaning)}
                            fullWidth
                            helperText={formik.touched.similiarMeaning && formik.errors.similiarMeaning}
                            label="Từ gần nghĩa"
                            id="similiarMeaning"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.similiarMeaning}
                        />
                        <TextField
                            error={!!(formik.touched.oppositeMeaning && formik.errors.oppositeMeaning)}
                            fullWidth
                            helperText={formik.touched.oppositeMeaning && formik.errors.oppositeMeaning}
                            label="Từ trái nghĩa"
                            id="oppositeMeaning"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.oppositeMeaning}
                        />


                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Chọn cấp độ</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="level"
                                fullWidth
                                onChange={(e) => {
                                    formik.setFieldValue('level', e.target.value)
                                }}
                                value={formik.values.level}
                                error={formik.errors.level && formik.touched.level}
                                helperText={formik.errors.level}
                                isSearchable
                                label='Chọn cấp độ'>
                                <MenuItem value={null}>Bỏ chọn</MenuItem>
                                <MenuItem value={1}>HSK 1</MenuItem>
                                <MenuItem value={2}>HSK 2</MenuItem>
                                <MenuItem value={3}>HSK 3</MenuItem>
                                <MenuItem value={4}>HSK 4</MenuItem>
                                <MenuItem value={5}>HSK 5</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            error={!!(formik.touched.example && formik.errors.example)}
                            fullWidth
                            helperText={formik.touched.example && formik.errors.example}
                            label="Ví dụ"
                            id="example"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.example}
                        />
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button
                        sx={{ color: 'gray' }}
                        onClick={() => {
                            formik.setValues({
                                originWord: '',
                                vietnameseMean: '',
                                wordType: '',
                                pinyin: '',
                                similiarMeaning: '',
                                oppositeMeaning: '',
                                example: ''
                            })
                            handleClose();
                        }}>
                        Hủy
                    </Button>
                    <Button
                        type='submit' autoFocus>
                        {editedVoca ? "Sửa" : "Thêm"}
                    </Button>
                </DialogActions>
            </form>
            <AlertDialog
                title="Từ đã bị trùng!"
                content="Từ đã tồn tại trong từ điển, vui lòng nhập từ khác"
                open={showAlert}
                rightTxt="OK"
                handleClose={() => setShowAlert(false)}
                onRightClick={() => setShowAlert(false)}
            />
        </Dialog>
    );
}