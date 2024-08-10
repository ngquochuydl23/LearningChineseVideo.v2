import { Logo } from "./logo";

const { Container, Grid, Box, Typography } = require("@mui/material")

const HayugoFooter = () => {
    return (
        <Box sx={{ backgroundColor: '#f5f5f5' }}>
            <Container
                maxWidth="xl">
                <Grid container>
                    <Grid
                        sx={{ padding: '25px' }}
                        xl="5">
                        <Box sx={{ width: '80%' }}>
                            <img
                                style={{ height: '70px' }}
                                src={'/hayugo-logo_landscape.png'} />
                            <Typography
                                variant="subtitle1">
                                {`HayuGo - Điểm đến lý tưởng cho việc học tiếng Trung thú vị và hiệu quả. Với bộ sưu tập video đa dạng từ cấp độ HSK 1 đến HSK 5, bao gồm các video mang nội dung giải trí, học thuật và nhiều hơn nữa. `}
                                <br></br>
                                <br></br>
                                {`Các tính năng như tra từ trực tiếp trên phụ đề, linh hoạt chuyển đổi giữa các loại phụ đề, cùng tính năng lưu từ vựng sẽ giúp bạn hiểu rõ hơn và ghi nhớ từ vựng một cách hiệu quả. Theo dõi fanpage của nhóm nghiên cứu để khám phá thêm nhiều thông tin thú vị và cập nhật mới nhất!`}
                            </Typography>
                            <p>
                                Fanpage: <span><a>https://s.net.vn/bS4l</a></span>
                            </p>
                            <p>
                                Liên hệ phản hồi chất lượng bản dịch và đóng góp video: <span><a>hayugojhz@gmail.com</a></span>
                            </p>
                        </Box>
                    </Grid>
                    <Grid
                        sx={{ padding: '25px' }}
                        xl="3.5">
                        <Box pt="20px">
                            <Typography
                                fontSize="20px"
                                variant="h5">
                                {`THÔNG TIN NHÓM NGHIÊN CỨU`}
                            </Typography>
                            <Typography
                                fontSize="14px"
                                mt="30px"
                                variant="subtitle1">
                                {`Khoa Tiếng Trung Trường Đại Học Sư Phạm TPHCM`}
                            </Typography>
                            <ul style={{ listStylePosition: 'outside' }}>
                                <li style={{ marginTop: '10px', color: 'black' }}>
                                    <a style={{ color: 'black' }} href="https://web.facebook.com/profile.php?id=100034698395094">
                                        {`Nguyễn Thị Thúy Giang`}
                                    </a>
                                </li>
                                <li style={{ marginTop: '10px', color: 'black' }}>
                                    <a style={{ color: 'black' }} href="https://www.facebook.com/tranthi.thuytram.543">
                                        {`Trần Thị Thùy Trâm`}
                                    </a>
                                </li>
                                <li style={{ marginTop: '10px', color: 'black' }}>
                                    <a  style={{ color: 'black' }} href="https://www.facebook.com/profile.php?id=100011355822706&mibextid=ZbWKwL">
                                        {`Nguyễn Hữu Huỳnh`}
                                    </a>
                                </li>
                            </ul>
                        </Box>
                    </Grid>
                    <Grid
                        sx={{ padding: '25px' }}
                        xl="3.5">
                        <Box pt="70px">
                            <Typography
                                variant="subtitle1">
                                {`Bản quyền thuộc về nhóm nghiên cứu đề tài “Xây dựng ngữ liệu trực tuyến phục vụ học tập, tra cứu tiếng Trung cho người học tiếng Trung ở Việt Nam”`}
                            </Typography>
                            <Typography variant="subtitle1" mt="20px">
                                {`Website được xây dựng bởi Nguyễn Quốc Huy`}
                                <p>{`SDT: `}
                                    <span style={{ fontWeight: '600' }}>
                                        <a style={{ color: 'black' }} href="tel:+84868684961">0868684961</a>
                                    </span>
                                    {` (Zalo)`}
                                </p>
                                <p>{`Email: `}
                                    <span style={{ fontWeight: '600' }}>
                                        <a style={{ color: 'black' }} href="mailto:nguyenquochuydl123@gmail.com">nguyenquochuydl123@gmail.com</a>
                                    </span>
                                </p>
                                <p>{`Facebook: `}
                                    <span style={{ fontWeight: '600' }}>
                                        <a style={{ color: 'black' }} href="https://www.facebook.com/pgonevn/">Nguyễn Huy</a>
                                    </span>
                                </p>
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    )
}

export default HayugoFooter;