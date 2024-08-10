import Head from 'next/head';
import { Box, Unstable_Grid2 as Grid, Stack, Typography } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { useEffect, useState } from 'react';
import _ from 'lodash';
import { getSavedInVideo } from 'src/services/api/saved-voca-api';
import { useRouter } from 'next/router';
import SavedVoca from 'src/sections/saved/saved-voca';

const Page = () => {

    const [vocas, setVocas] = useState([]);
    const router = useRouter();
    const { videoId } = router.query;

    useEffect(() => {
        getSavedInVideo(videoId)
            .then((res) => setVocas(res))
            .catch((err) => console.log(err))
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
                        sx={{ paddingBottom: '20px', width: '100%' }}>
                        <Typography
                            mb="30px"
                            variant="h4">
                            Từ vựng đã lưu
                            <Stack spacing="20px" pt="20px">
                                {_.map(vocas, (voca) => (
                                    <SavedVoca {...voca} />
                                ))}
                            </Stack>
                        </Typography>
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
