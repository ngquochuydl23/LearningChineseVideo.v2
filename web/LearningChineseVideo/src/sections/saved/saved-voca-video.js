import { Box, Chip, Stack, Typography } from "@mui/material";
import moment from "moment";
import Link from "next/link";
import readMediaUrl from "src/utils/read-media-url";

const SavedVocaVideo = ({ video, lastUpdated, savedCount }) => {
    return (
        <Link
            style={{ textDecoration: 'none' }}
            href={"/saved/" + video.id}>
            <Stack
                direction="row"
                sx={{ width: '100%', textDecoration: 'none' }}>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        position: 'relative'
                    }}>
                    <img
                        style={{
                            borderRadius: '10px',
                            height: '100px',
                            width: '170px',
                            transition: 'transform .2s',
                            position: 'relative'
                        }}
                        src={readMediaUrl(video.thumbnail)}
                    />
                    <div
                        style={{
                            margin: '10px',
                            display: 'flex',
                            position: 'absolute',
                            zIndex: 1
                        }}>
                        <Chip
                            sx={{
                                fontWeight: '600',
                                backgroundColor: 'green',
                                fontSize: '14px',
                                color: 'white'
                            }}
                            label={"HSK " + video.level} />
                    </div>
                </div>
                <Box sx={{ padding: '10px', ml: '10px', width: "100%" }}>
                    <Stack
                        justifyContent="space-between"
                        direction="row"
                        sx={{ width: "100%" }}>
                        <Typography
                            fontSize="20px"
                            gutterBottom
                            variant="h5"
                            sx={{ color: 'black' }}
                            component="div">
                            {video.title}
                        </Typography>
                    </Stack>
                    <Typography
                        fontSize='14px'
                        variant="subtitle2"
                        color="text.secondary">
                        Tải lên lúc: {moment(video.createdAt).format("DD/MM/YYYY")}
                    </Typography>
                    <Typography
                        fontSize='14px'
                        variant="subtitle2"
                        color="text.secondary">
                        Số từ vựng đã lưu: {savedCount}
                    </Typography>
                </Box>
            </Stack>
        </Link>
    )
}

export default SavedVocaVideo;