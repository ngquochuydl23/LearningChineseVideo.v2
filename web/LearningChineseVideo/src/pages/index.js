import Head from 'next/head';
import { Box, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import GridVideoSection from 'src/sections/home/grid-video-section';
import { getMostPopularVideo, getRecentlyAddedVideo, getVideo, getVideos, getVideosByHSK } from 'src/services/api/video-api';


const Page = () => {
    return (
        <>
            <Head>
                <title>
                    Trang chủ
                </title>
            </Head>
            <Box>
                <GridVideoSection
                    title="HSK 1"
                    limitPerTrans={4}
                    loadVideos={async (offset, limit) => {
                        return await getVideosByHSK(1, 0, 12);
                    }} />
                <GridVideoSection
                    title="HSK 2"
                    limitPerTrans={4}
                    loadVideos={async (offset, limit) => {
                        return await getVideosByHSK(2, 0, 10000);
                    }} />
                <GridVideoSection
                    title="HSK 3"
                    limitPerTrans={4}
                    loadVideos={async (offset, limit) => {
                        return await getVideosByHSK(3, 0, 10000);
                    }} />
                <GridVideoSection
                    title="HSK 4"
                    limitPerTrans={4}
                    loadVideos={async (offset, limit) => {
                        return await getVideosByHSK(4, 0, 10000);
                    }} />
                <GridVideoSection
                    title="HSK 5"
                    limitPerTrans={5}
                    loadVideos={async (offset, limit) => {
                        return await getVideosByHSK(5, 0, 12);
                    }} />
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
