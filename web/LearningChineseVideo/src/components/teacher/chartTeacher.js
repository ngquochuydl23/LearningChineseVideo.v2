import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  Unstable_Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Chart } from "chart.js/auto";
import Head from "next/head";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { Scrollbar } from "src/components/scrollbar";
import { useAuth } from "src/hooks/use-auth";
import { Layout as TeacherLayout } from "src/layouts/teacher-layout/layout";
import UpdateCourseDialog from "src/sections/course/update-course-dialog";
import { getStatistics } from "src/services/api/teacher-earing-api";
import { formatMoney } from "src/utils/formatMoney";
const ChartTeacher = ({ res }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const chartRef = useRef(null);
  const { getUser, user } = useAuth();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  useEffect(() => {
    if (chartRef.current) {
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }

      const earningsByDate = res.reduce((acc, curr) => {
        const date = formatDate(curr.createdAt);
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += curr.amount;
        return acc;
      }, {});

      const labels = Object.keys(earningsByDate);
      const data = Object.values(earningsByDate);
      const context = chartRef.current.getContext("2d");

      // Initialize chart
      const newChart = new Chart(context, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Doanh thu",
              data: data,
              borderColor: "#ff6384",
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderWidth: 2,
              fill: true,
              tension: 0.4, // Smooth line
              pointBackgroundColor: "#ff6384",
              pointBorderColor: "#ffffff",
              pointBorderWidth: 2,
              pointRadius: 5,
              pointHoverRadius: 7,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: false,
              min: 0,
              max: Math.max(...data) + 100000, // Adjust max value dynamically
              title: {
                display: true,
                text: "Số tiền",
              },
            },
            x: {
              title: {
                display: true,
                text: "Thời gian",
              },
            },
          },
          plugins: {
            legend: {
              position: "top",
              labels: {
                usePointStyle: true,
              },
            },
          },
          maintainAspectRatio: false,
        },
      });

      chartRef.current.chart = newChart;
    }
  }, [res]);
  return (
    <>
      <canvas ref={chartRef} />
    </>
  );
};
export default ChartTeacher;
