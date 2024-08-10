import Head from 'next/head';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import SavedVocaVideo from 'src/sections/saved/saved-voca-video';
import { getSavedByVideo } from 'src/services/api/saved-voca-api';


const Page = () => {
    const [videos, setVideos] = useState([]);
    useEffect(() => {
        getSavedByVideo()
            .then((res) => {
                setVideos(res);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <>
            <Head>
                <title>
                    Từ vựng đã lưu
                </title>
            </Head>
            <Box>
                <Stack
                    alignItems="center"
                    justifyContent="space-between"
                    direction="row">
                    <Stack
                        spacing="20px"
                        sx={{ paddingBottom: '20px' }}>
                        <Typography
                            mb="30px"
                            variant="h4">
                            Từ vựng đã lưu
                        </Typography>
                        {_.map(videos, (item) => (
                            <SavedVocaVideo {...item} />
                        ))}
                    </Stack>
                </Stack>
            </Box>
        </>
    )
}

Page.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Page;
