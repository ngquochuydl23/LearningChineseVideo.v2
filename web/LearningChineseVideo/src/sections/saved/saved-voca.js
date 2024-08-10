import { Box, Stack, Typography } from "@mui/material";



const SavedVoca = ({
    vocabularyId,
    showedTo,
    showedFrom,
    createdAt,
    sentence,
    vocabulary
}) => {
    const separateExampleAsLine = (example) => {
        var chinese = _.map(example.split('。'))[0];
        var rest = _.map(example.split('。'))[1];
        var examples = [chinese]
        if (rest) {
            examples = [chinese, ..._.map(rest.split('. '))];
        }
        return examples;
    }
    return (
        <Box sx={{
            width: '100%',
            paddingX: '20px',
            paddingY: '15px',
            backgroundColor: '#f5f5f5',
            borderRadius: '10px'
        }}>
            <Stack
                justifyContent="space-between"
                alignContent="center"
                direction="row">
                <Typography variant="h5">{vocabularyId}</Typography>
                <Typography variant="subtitle1">{`Xuất hiện giây thứ: ${showedFrom}   đến  ${showedTo}`}</Typography>
            </Stack>
            <Typography
                sx={{
                    marginTop: '10px',
                    fontSize: '16px'
                }}
                variant="subtitle2">
                <p style={{ marginTop: 0 }}>Câu: {sentence}</p>
                <p style={{ marginTop: 0 }}>{`[`}{vocabulary.pinyin}{`]`}   {vocabulary.sinoVietnamese && `【${vocabulary.sinoVietnamese}】`}</p>
                <p style={{ fontSize: '14px' }}>Từ loại: {vocabulary.wordType}</p>
                <p style={{ fontSize: '14px' }}>Cấp độ: {vocabulary.level}</p>
                <p style={{ fontSize: '14px' }}>Nghĩa: {vocabulary.vietnameseMean}</p>
                <p style={{ fontSize: '14px' }}>Ví dụ:</p>
                <div style={{ marginLeft: '20px' }}>
                    {Boolean(vocabulary.example) &&
                        _.map(separateExampleAsLine(vocabulary.example), (item => (
                            <p style={{ fontSize: '14px' }}>{item}</p>
                        )))
                    }
                </div>
            </Typography>
        </Box>
    )
}

export default SavedVoca;