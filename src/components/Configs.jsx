import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useMemo, useState } from "react";
import {
  extractNameFromConfigURL,
  handleCopyToClipboard,
} from "../utils/Helper";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useTranslation } from "react-i18next";
import QrModal from "./QrModal";

const Configs = ({
  title,
  icon,
  style,
  configs,
  iconColor,
  btnStyle,
  liStyle,
  isFirst,
}) => {
  const filteredLinks = useMemo(() => {
    if (configs && configs[configs.length - 1] === "False") {
      return configs.slice(0, -1);
    }
    return configs || [];
  }, [configs]);

  const { t } = useTranslation();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(null);
  const [link, setLink] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleOpen = (title, link, index) => {
    setOpen(true);
    setModalTitle(title);
    setLink(link);
    setIndex(index);
  };
  const handleClose = () => setOpen(false);

  const isFirstPadding = isFirst && { paddingTop: "1rem" };

  return (
    <>
      <Grid
        justifyContent="space-between"
        xs={11}
        item
        sx={{ paddingBottom: "1rem", ...isFirstPadding }}
      >
        <Accordion sx={style}>
          <AccordionSummary
            expandIcon={
              <ArrowDropDownIcon fontSize="large" sx={{ color: iconColor }} />
            }
            aria-controls="panel-os-content"
            id="panel-os-header"
          >
            <Grid container alignItems="center" justifyContent={"space-around"}>
              <Grid item xs={1} display="flex" justifyContent="center">
                {icon}
              </Grid>
              <Grid item xs={10} display="flex" justifyContent="center">
                <Typography>{title}</Typography>
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {filteredLinks?.map((config, index) => {
                const title = extractNameFromConfigURL(config);
                return (
                  <ListItem
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleOpen(title, filteredLinks?.[index], index);
                    }}
                    sx={liStyle}
                  >
                    <Grid
                      item
                      container
                      display={"flex"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                      flexWrap={"nowrap"}
                      gap={".3rem"}
                    >
                      <Grid item>
                        <Typography>{title}</Typography>
                      </Grid>
                      <Grid item display={"flex"} gap={".5rem"}>
                        <QrCodeIcon
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpen(title, filteredLinks?.[index], index);
                          }}
                          fontSize="large"
                          sx={btnStyle}
                        />
                        <ContentCopyIcon
                          fontSize="large"
                          sx={btnStyle}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCopyToClipboard(
                              filteredLinks?.[index],
                              index
                            );
                          }}
                        />
                      </Grid>
                    </Grid>
                  </ListItem>
                );
              })}
            </List>
            <Button
              onClick={() =>
                handleCopyToClipboard(filteredLinks.join("\n"), -1, t)
              }
              sx={{
                width: "100%",
                background: theme.colors.glassColor,
                color: "#000",
                borderRadius: "16px",
                border: "1px solid #48444a4f",
                "&:hover": {
                  background: "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              {t("copyAll")}
            </Button>
          </AccordionDetails>
        </Accordion>
      </Grid>
      <QrModal
        open={open}
        handleClose={handleClose}
        title={modalTitle}
        link={link}
        index={index}
        id="clist"
      />
    </>
  );
};

Configs.propTypes = {
  btnStyle: PropTypes.object,
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  style: PropTypes.object,
  configs: PropTypes.arrayOf(PropTypes.string).isRequired,
  iconColor: PropTypes.string,
  liStyle: PropTypes.object,
  isFirst: PropTypes.bool,
};

export default Configs;
