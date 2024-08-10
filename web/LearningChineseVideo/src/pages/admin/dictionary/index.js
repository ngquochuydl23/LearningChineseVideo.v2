import Head from 'next/head';
import {
    Box,
    Container,
    Stack,
    Typography,
    Unstable_Grid2 as Grid,
    Button
} from '@mui/material';
import { useEffect, useState } from 'react';
import { Layout as AdminLayout } from 'src/layouts/admin-layout/layout';
import { VocaTable } from 'src/sections/dictionary/Voca-table';
import { getVocas } from 'src/services/api/voca-api';
import AddUpdateVocaDialog from 'src/sections/dictionary/add-update-voca-dialog';
import ReactSearchBox from 'react-search-box';
import _ from 'lodash';

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
                handleClose={() => setDialogState({
                    open: false,
                    voca: undefined
                })} />
        </>
    )
}
Page.getLayout = (page) => (
    <AdminLayout>
        {page}
    </AdminLayout>
);

export default Page;