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
import UploadAudioFrame from "./upload-audio-frame";
export default function QuestionSentence({ type, setType, lessonId }) {
  const [dialogState, setDialogState] = useState({
    open: false,
  });
  const router = useRouter();
  const [lessons, setLessons] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const resetForm = () => {
    formik.setValues({
      sentenceParts: [],
      correctOrder: [],
    });
  };
  const formik = useFormik({
    initialValues: {
      type: "sentence-order-question",
      sentenceParts: [],
      correctOrder: [],
    },
    validationSchema: Yup.object({
      sentenceParts: Yup.array()
        .min(4, "Nhập ít nhất 4 từ")
        .of(Yup.string())
        .required("Vui lòng nhập câu hỏi"),
      correctOrder: Yup.array()
        .min(4, "Nhập ít nhất 4 từ")
        .of(Yup.string())
        .required("Vui lòng nhập câu trả lời"),
    }),

    onSubmit: async (values, helpers) => {
      const data = {
        type: values.type,
        sentenceOrderQuestion: {
          sentenceParts: values.sentenceParts,
          correctOrder: values.correctOrder,
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
      <Typography variant="h6">Dạng bài tập sắp xếp từ</Typography>
      <Stack direction="column" spacing={3} padding="10px" marginTop="10px">
        <Box sx={{ width: "82%" }}>
          <MuiChipsInput
            id="sentenceParts"
            onBlur={formik.handleBlur}
            value={formik.values.sentenceParts}
            error={formik.errors.sentenceParts && formik.touched.sentenceParts}
            helperText={formik.errors.sentenceParts}
            onChange={(options) => {
              formik.setFieldValue("sentenceParts", options);
            }}
            placeholder="Nhập câu hỏi..."
            sx={{
              minHeight: "40px",
              mt: "10px",
              width: "100%",
            }}
          />
        </Box>

        <Box sx={{ width: "82%" }}>
          <MuiChipsInput
            id="correctOrder"
            onBlur={formik.handleBlur}
            value={formik.values.correctOrder}
            error={formik.errors.correctOrder && formik.touched.correctOrder}
            helperText={formik.errors.correctOrder}
            onChange={(options) => {
              formik.setFieldValue("correctOrder", options);
            }}
            placeholder="Nhập câu trả lời"
            sx={{
              minHeight: "40px",
              mt: "10px",
              width: "100%",
            }}
          />
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
