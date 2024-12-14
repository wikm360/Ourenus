import { Grid, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import CapsuleButton from "./CapsuleButton";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";

const RadioButtons = ({ setIsDarkMode }) => {
  const themeColors = useTheme();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [isLightMode, setIsLightMode] = useState(
    themeColors.palette.mode === "light"
  );

  useEffect(() => {
    const savedTheme = Cookies.get("theme") || themeColors.palette.mode;
    const savedLanguage = Cookies.get("language") || lang;

    setIsLightMode(savedTheme === "light");
    setIsDarkMode(savedTheme === "dark");

    if (savedLanguage !== lang) {
      i18n.changeLanguage(savedLanguage);
    }
  }, [setIsDarkMode, themeColors, i18n, lang]);

  const handleThemeChange = (theme) => {
    const isLight = theme === "light";
    setIsLightMode(isLight);
    setIsDarkMode(!isLight);
    Cookies.set("theme", theme, { expires: 90 });
  };

  const handleLangChange = () => {
    const newLang =
      lang === "fa" ? import.meta.env.VITE_SECOND_LANG || "en" : "fa";
    i18n.changeLanguage(newLang);
    Cookies.set("language", newLang, { expires: 90 });
  };

  const containerStyle = {
    position: "relative",
    backgroundColor:
      themeColors.colors.capsuleBtn.background[themeColors.palette.mode],
    borderRadius: "50px",
    display: "flex",
    padding: 0.2,
    justifyContent: "space-between",
    backdropFilter: "blur(16px)",
    boxShadow: "0 0 7rem rgba(0, 0, 0, 0.2)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
  };

  const sliderStyle = (isActive) => ({
    position: "absolute",
    top: 0,
    left: isActive ? 0 : "50%",
    width: "50%",
    height: "100%",
    backgroundColor: themeColors.colors.capsuleBtn.slider,
    borderRadius: "50px",
    transition: "all 0.3s ease",
  });

  return (
    <Grid
      container
      item
      justifyContent="space-between"
      sx={{ paddingY: 2 }}
      xs={11}
    >
      {/* Language Toggle */}
      <Grid item xs={5} sm={4.8} md={4} sx={containerStyle}>
        <div style={sliderStyle(lang === "fa")} />
        <CapsuleButton
          label="فارسی"
          isActive={lang === "fa"}
          onClick={handleLangChange}
          icon={"فارسی"}
        />
        <CapsuleButton
          label={import.meta.env.VITE_SECOND_LANG || "en"}
          isActive={lang === import.meta.env.VITE_SECOND_LANG || "en"}
          onClick={handleLangChange}
          icon={
            import.meta.env.VITE_SECOND_LANG === "ru" ? "Русский" : "English"
          }
        />
      </Grid>
      {/* Theme Toggle */}
      <Grid item xs={5} sm={4.5} md={4} sx={containerStyle}>
        <div style={sliderStyle(isLightMode)} />
        <CapsuleButton
          isActive={isLightMode}
          onClick={() => handleThemeChange("light")}
          icon={t("light")}
        />
        <CapsuleButton
          isActive={!isLightMode}
          onClick={() => handleThemeChange("dark")}
          icon={t("dark")}
        />
      </Grid>
    </Grid>
  );
};

RadioButtons.propTypes = {
  setIsDarkMode: PropTypes.func.isRequired,
};

export default RadioButtons;