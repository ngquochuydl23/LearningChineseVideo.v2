import { useState } from "react";
import { uploadFile } from "src/services/api/upload-api";
import readMediaUrl from "src/utils/read-media-url";

const { Stack, Box, Typography, Button } = require("@mui/material");

const UploadVideoThumbnail = ({ onReceiveThumbnail }) => {
    const [hasUploaded, setHasUploaded] = useState(false);
    const [thumbnail, setThumbnail] = useState(null);
    return (
        <Stack direction="column" mt="20px">
            <Typography variant="subtitle1">Hình thu nhỏ</Typography>
            <Typography variant="caption">
                Chọn hoặc tải một hình ảnh lên để thể hiện nội dung trong video của bạn. Hình thu nhỏ hấp dẫn sẽ làm nổi bật video của bạn và thu hút người xem.
            </Typography>
            <input
                onChange={(event) => {
                    var file = event.target.files[0];
                    setThumbnail(file);
                    uploadFile(file)
                        .then(({ medias }) => {
                            setHasUploaded(true);
                            setThumbnail(medias[0].url);
                            onReceiveThumbnail(medias[0].url);
                        })
                        .catch((err) => console.log(err));
                }}
                style={{ display: "none" }}
                type="file"
                accept="image/*"
                id="pick-image"
            />
            {thumbnail ? (
                <Box mt="10px">
                    {thumbnail && (
                        <Stack direction="row">
                            <img
                                style={{
                                    width: "200px",
                                    aspectRatio: '16/9',
                                    borderRadius: "10px",
                                    backgroundColor: "#f5f5f5",
                                    border: '1px solid #d3d3d3'
                                }}
                                src={
                                    hasUploaded
                                        ? readMediaUrl(thumbnail)
                                        : URL.createObjectURL(thumbnail)
                                }
                            />
                            <Button
                                fullWidth={false}
                                onClick={() => {
                                    setThumbnail(null);
                                    onReceiveThumbnail(null);
                                }}
                                sx={{
                                    color: "red",
                                    borderColor: "red",
                                    height: "30px",
                                    marginLeft: "10px",
                                    borderRadius: "15px",
                                }}
                                variant="outlined">
                                Xóa hình thu nhỏ
                            </Button>
                        </Stack>
                    )}
                </Box>

            ) : (
                <div
                    onClick={() => document.getElementById("pick-image").click()}
                    style={{
                        width: "200px",
                        marginTop: '10px',
                        aspectRatio: '16/9',
                        borderRadius: "10px",
                        backgroundColor: "#f5f5f5",
                        border: '1px solid #d3d3d3'
                    }}
                ></div>
            )}
        </Stack>
    );
};

export default UploadVideoThumbnail;