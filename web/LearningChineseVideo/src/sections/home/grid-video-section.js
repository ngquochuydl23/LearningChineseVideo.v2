import { Box, Button, Grid, Stack, Typography } from "@mui/material"
import _ from "lodash";
import GridVideoCard from "src/components/grid-video-card";
import Divider from '@mui/material/Divider';
import { useEffect, useState } from "react";

const GridVideoSection = ({
    title,
    loadVideos,
    limitPerTrans
}) => {
    const [videos, setVideos] = useState([]);
    const [offset, setOffset] = useState(0);
    const [count, setCount] = useState(100);

    useEffect(() => {
        const fetchVideos = async () => {
            setVideos(await loadVideos(offset, limitPerTrans));
        }

        setCount(1000);
        fetchVideos();
    }, [offset]);

    return (
        <Box
            justifyContents="center">
            <Typography
                my="20px"
                fontSize="30px"
                fontWeight="800"
                variant="h5">
                {title}
            </Typography>
            {videos &&
                <Grid
                    spacing="15px"
                    container>
                    {_.map(videos, (video) => (
                        <Grid item lg={3}>
                            <GridVideoCard
                                key={video.id}
                                {...video} />
                        </Grid>
                    ))}
                </Grid>
            }
            {/* {(offset < count) &&
                <Stack
                    paddingY="20px"
                    alignItems="center"
                    justifyContent="center"
                    width="100%"
                    direction="row">
                    <Divider
                        sx={{
                            borderWidth: '1px',
                            color: '#696969',
                            display: 'flex',
                            flex: 1
                        }} />
                    <Button
                        onClick={() => setOffset(offset + limitPerTrans + 1)}
                        sx={{
                            borderWidth: '1px',
                            borderRadius: '20px',
                            px: '30px',
                            borderColor: '#696969',
                            color: '#696969',
                            ':hover': {
                                borderColor: '#696969',
                            }
                        }}
                        fullWidth={false}
                        variant="outlined">
                        Hiện thêm
                    </Button>
                    <Divider
                        sx={{
                            borderWidth: '1px',
                            color: '#696969',
                            display: 'flex',
                            flex: 1
                        }} />
                </Stack>
            } */}
        </Box>
    )
}

export default GridVideoSection;