import {
  Box,
  Button,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography
} from '@mui/material';
import _ from 'lodash';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import ReactSearchBox from 'react-search-box';
import { Layout as TeacherLayout } from 'src/layouts/teacher-layout/layout';
import AddUpdateVocaDialog from 'src/sections/dictionary/add-update-voca-dialog';
import { VocaTable } from 'src/sections/dictionary/Voca-table';
import { getVocas } from 'src/services/api/voca-api';

const Page = () => {
    const [vocas, setVocas] = useState([]);
    const [dialogState, setDialogState] = useState({
        open: false,
        voca: undefined
    });

    const fetchVoca = () => {
        getVocas()
            .then((res) => setVocas(res))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchVoca();
    }, [])

    return (
        <>
            <Head>
                <title>
                    Từ điển
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    px: '30px'
                }}>
                <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row">
                    <Stack>
                        <Typography
                            mb="30px"
                            variant="h4">
                            Từ điển
                        </Typography>
                        <ReactSearchBox
                            placeholder="Tìm tự vựng"
                            data={_.map(vocas, (item) => ({
                                key: item,
                                value: item.originWord,
                            }))}
                            clearOnSelect
                            onSelect={(record) => {
                                setDialogState({
                                    open: true,
                                    voca: record.item.key
                                })
                            }}
                        />
                    </Stack>
                    <Button
                        onClick={() => setDialogState({
                            open: true,
                            voca: undefined
                        })}
                        sx={{ height: '40px' }}
                        variant='contained'>
                        Thêm từ vựng
                    </Button>
                </Stack>
                <VocaTable
                    onChoose={(item) => setDialogState({
                        open: true,
                        voca: item
                    })}
                    vocas={vocas}
                />
            </Box>
            <AddUpdateVocaDialog
                editedVoca={dialogState.voca}
                onAdded={fetchVoca}
                open={dialogState.open}
                onRemoved={() => {
                    fetchVoca()
                    setDialogState({
                        open: false,
                        voca: undefined
                    })
                }}
                handleClose={() => setDialogState({
                    open: false,
                    voca: undefined
                })} />
        </>
    )
}
Page.getLayout = (page) => (
    <TeacherLayout>
        {page}
    </TeacherLayout>
);

export default Page;