import {
  Box,
  Unstable_Grid2 as Grid,
  Stack,
} from '@mui/material';
import _ from 'lodash';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from 'src/hooks/use-auth';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import VideoInfo from 'src/sections/video/video-info';
import VideoPlayer from 'src/sections/video/video-player';
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
                    _id={video._id}
                    videoUrl={video.videoUrl}
                    subtitles={video.subtitles}
                />
                {/* ở đây */}
                
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
