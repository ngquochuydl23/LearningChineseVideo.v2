import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Unstable_Grid2 as Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { set } from "lodash";
import { MuiChipsInput } from "mui-chips-input";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Layout as DashboardLayout } from "src/layouts/teacher-layout/layout";
import AddLesson from "src/sections/course/add-lesson";
import UploadVideoThumbnail from "src/sections/video/upload-thumbnail";
import UploadVideoFrame from "src/sections/video/upload-video-frame";
import UploadVttList from "src/sections/video/upload-vtt-list";
import {
  addCourse,
  addLessonToCourse,
  deleteLessonFromCourse,
  editCourse,
  getCourseById,
} from "src/services/api/course-api";
import { addExcerciseFillIn } from "src/services/api/exercise-api";
import readMediaUrl from "src/utils/read-media-url";
import * as Yup from "yup";
export default function QuestionGramma({ type, setType, lessonId }) {
  const [dialogState, setDialogState] = useState({
    open: false,
  });
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [trueAnswer, setTrueAnswer] = useState([]);
  const resetForm = () => {
    formik.setValues({
      question: "",
      answers: [],
    });
    setTrueAnswer([]);
  };
  const formik = useFormik({
    initialValues: {
      type: "gramma-question",
      question: "",
      answers: [],
      rightAwswerPosition: 0,
    },
    validationSchema: Yup.object({
      question: Yup.string().required("Vui lòng nhập câu hỏi"),
      rightAwswerPosition: Yup.number().required("Vui lòng chọn câu trả lời đúng"),
      answers: Yup.array()
        .min(4, "Nhập 4 câu trả lời")
        .of(Yup.string())
        .required("Vui lòng nhập câu trả lời"),
    }),

    onSubmit: async (values, helpers) => {
      const data = {
        type: values.type,
        grammaQuestion: {
          question: values.question,
          answers: values.answers,
          rightAwswerPosition: values.rightAwswerPosition,
        },
      };
      try {
        await addExcerciseFillIn(lessonId, data);
        resetForm();
        window.location.reload();
        enqueueSnackbar(`Thêm bài tập thành công`, {
          variant: "success",
          anchorOrigin: {
            vertical: "bottom",
            horizontal: "right",
          },
        });
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
        console.log(err);
        if (err === "Lesson not found") {
          enqueueSnackbar(`Không tìm thấy bài học`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else if (err === "Type and question are invalid.") {
          enqueueSnackbar(`Kiểu bài tập không hợp lệ`, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        } else {
          enqueueSnackbar(err, {
            variant: "error",
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "right",
            },
          });
        }
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography variant="h6">Dạng bài tập ngữ pháp</Typography>
      <Stack direction="column" spacing={3} padding="10px" marginTop="10px">
        <Box sx={{ width: "82%" }}>
          <TextField
            id="question"
            label="Câu hỏi"
            fullWidth
            value={formik.values.question}
            onChange={formik.handleChange}
            error={formik.errors.question && formik.touched.question}
            helperText={formik.errors.question}
          />
        </Box>
        <Box sx={{ width: "82%" }}>
          <MuiChipsInput
            id="answers"
            onBlur={formik.handleBlur}
            value={formik.values.answers}
            error={formik.errors.answers && formik.touched.answers}
            helperText={formik.errors.answers}
            onChange={(options) => {
              setTrueAnswer(options);
              formik.setFieldValue("answers", options);
            }}
            placeholder="Nhập câu trả lời..."
            sx={{
              minHeight: "40px",
              mt: "10px",
              width: "100%",
            }}
          />
        </Box>
        <Box sx={{ width: "82%" }}>
          <FormControl sx={{ width: "100%", marginTop: "10px" }}>
            <InputLabel id="demo-simple-select-label">Chọn vị trí câu trả lời đúng</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="rightAwswerPosition"
              fullWidth
              onChange={(e) => {
                formik.setFieldValue("rightAwswerPosition", e.target.value);
              }}
              value={formik.values.rightAwswerPosition}
              error={formik.errors.rightAwswerPosition && formik.touched.rightAwswerPosition}
              helperText={formik.errors.rightAwswerPosition}
              isSearchable
              label="Chọn vị trí câu trả lời đúng"
            >
              {trueAnswer.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          type="submit"
          sx={{ height: "50px" }}
          fullWidth
          style={{ marginTop: "20px" }}
          variant="contained"
        >
          Tạo khóa học
        </Button>
      </Stack>
    </form>
  );
}
