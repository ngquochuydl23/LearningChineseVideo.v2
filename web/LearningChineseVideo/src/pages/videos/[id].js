import Head from 'next/head';
import {
    Box,
    Stack,
    Unstable_Grid2 as Grid,
} from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import VideoPlayer from 'src/sections/video/video-player';
import VideoInfo from 'src/sections/video/video-info';
import { getVideo, viewVideo } from 'src/services/api/video-api';

const ProductDetailPage = () => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const idPopover = open ? 'simple-popover' : undefined;
    const [video, setVideo] = useState();
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        setLoading(true);
        viewVideo(id)
            .then(() => console.log("Seen video"))
            .catch((err) => console.log(err));

        getVideo(id)
            .then((res) => setVideo(res))
            .catch((err) => console.log(err))
            .finally(() => { setLoading(false) })
    }, [])


    if (loading) {
        return null;
    }

    return (
        <>
            <Head>
                <title> {video.title}</title>
            </Head>
            <Box>
                <VideoPlayer
                    id={video.id}
                    videoUrl={video.videoUrl}
                    subtitles={video.subtitles}
                />
                <Stack
                    display="flex"
                    direction="row">
                    <VideoInfo
                        {...video}
                        tags={video.topics} />
                    <Stack
                        flex="1"
                        display="flex">
                    </Stack>
                </Stack>
            </Box >
        </>
    )
}

ProductDetailPage.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default ProductDetailPage;
