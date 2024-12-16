import { Grid, Typography, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import BoxS from "./Box";
import CircularProgressWithLabel from "./CircularWithValueLabel";
import { useTranslation } from "react-i18next";

const UsageBox = ({ type, value, total, remaining }) => {
  const theme = useTheme();
  const { t } = useTranslation();

  const parseValue = (input) => {
    const numericMatch = input.match(/\d+/);
    const number = numericMatch ? numericMatch[0] : "0";
    const text = input.replace(/\d+/g, "").trim();
    return { number, text };
  };

  const getTypographyGradient = (v) => {
    if (v === Infinity || Number.isNaN(v)) {
      return `linear-gradient(0deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`;
    } else if (v <= 30) {
      return `linear-gradient(0deg, ${theme.palette.success.main}, ${theme.palette.success.dark})`;
    } else if (v <= 70) {
      return `linear-gradient(0deg, ${theme.palette.warning.main}, ${theme.palette.warning.dark})`;
    } else {
      return `linear-gradient(0deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`;
    }
  };

  const labels = {
    usage: {
      title: t("remaining_volume"),
      totaltitle: t("initial_volume"),
      unit: t("gigabytes"),
    },
    time: {
      title: t("remaining_time"),
      totaltitle: t("initial_time"),
      unit: t("days"),
    },
  };

  const { title, totaltitle } = labels[type];

  const remainingParsed = parseValue(remaining);
  const totalParsed = parseValue(total || "");

  return (
    <BoxS>
      <Grid item xs={4} display="flex" justifyContent="center">
        <CircularProgressWithLabel value={value} type={type} />
      </Grid>

      <Grid
        item
        xs={type === "usage" ? 4 : 8}
        display="flex"
        flexDirection={"column"}
        textAlign={"center"}
        sx={{ gap: ".3rem" }}
      >
        <Typography
          variant="p"
          component="div"
          fontSize={"small"}
          sx={{
            fontWeight: "300",
            opacity: 0.6,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            background: getTypographyGradient(value),
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            textAlign: "center",
            fontWeight: "700",
          }}
        >
          {remainingParsed.text === t("infinity")
            ? remainingParsed.text
            : remainingParsed.number}
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{
            textAlign: "center",
            fontWeight: "300",
            fontSize: "medium",
            opacity: 0.6,
          }}
          fontWeight={"lighter"}
        >
          {remainingParsed.text}
        </Typography>
      </Grid>
      {type === "usage" && (
        <Grid
          item
          xs={4}
          display="flex"
          flexDirection={"column"}
          textAlign={"center"}
          sx={{ gap: ".3rem" }}
        >
          <Typography
            variant="p"
            component="div"
            fontSize={"small"}
            sx={{
              fontWeight: "300",
              opacity: 0.6,
            }}
          >
            {totaltitle}
          </Typography>
          <Typography variant="h6" component="div">
            {totalParsed.text === t("infinity")
              ? totalParsed.text
              : totalParsed.number}
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: "300",
              fontSize: "medium",
              opacity: 0.6,
            }}
          >
            {totalParsed.text}
          </Typography>
        </Grid>
      )}
    </BoxS>
  );
};

UsageBox.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  total: PropTypes.string,
  remaining: PropTypes.string.isRequired,
};

export default UsageBox;