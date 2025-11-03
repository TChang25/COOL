import CloseIcon from "@mui/icons-material/Close";
import { Modal, Box, IconButton, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

const HelpModal = ({ open, onClose }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="help-modal"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(3px)",
      }}
    >
      <Box
        sx={{
          width: 1200,
          height: 700,
          position: "relative",
          backgroundColor: "rgba(146, 193, 233, 1)",
          overflow: "auto",
          boxShadow: 24,
          outline: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <Box
          sx={{
            position: "sticky",
            top: 0,
            width: 1180,
            height: 0,
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="black"
            aria-label="close"
            onClick={onClose} // ✅ closes modal
            sx={{ mr: 2, position: "absolute", top: 0, right: 0 }}
          >
            <CloseIcon
              fontSize="large"
              sx={{ fontSize: 55, stroke: "black", strokeWidth: 0.25 }}
            />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{
                textAlign: "top",
                padding: "0px 50px 5px 50px",
                fontSize: 86,
                color: "black",
              }}
            >
              1
            </Box>
            <Box
              sx={{
                padding: 5,
                fontSize: 20,
                paddingRight: 40,
                color: "black",
              }}
            >
              <b>Check Eligibility</b>
              <br />
              A person must be a City of Orlando resident to check out a device.
              Even though an address may say Orlando, it might be in
              unincorporated Orange County or another nearby city.
              <br />
              <br />
              <Link
                to="https://orl.maps.arcgis.com/apps/instant/lookup/index.html?appid=8e2d22b94c224e26af59509087dbd56d"
                target="_blank"
                style={{
                  textDecoration: "underline",
                  color: "black",
                }}
              >
                Check your address
              </Link>
            </Box>
          </Box>

          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{
                textAlign: "top",
                padding: "0px 50px 5px 50px",
                fontSize: 86,
                color: "black",
              }}
            >
              2
            </Box>
            <Box
              sx={{
                padding: 5,
                fontSize: 20,
                color: "black",
                fontWeight: "bold",
              }}
            >
              Find a Location Near You
              <br />
              <List
                sx={{
                  listStyleType: "disc",
                  pl: 2,
                  "& .MuiListItem-root": { display: "list-item" },
                }}
              >
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Dr.-James-R.-Smith-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Dr. James R. Smith Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Engelwood-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Engelwood Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Jackson-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    John H. Jackson Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Rosemont-Neighborhood-Center-and-Pool"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Rosemont Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/L.-Claudia-Allen-Senior-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    L. Claudia Allen Senior Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Our-Government/Departments-Offices/Executive-Offices/Communications-and-Neighborhood-Relations/Neighborhood-Relations/Hispanic-Office-For-Local-Assistance-HOLA"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Hispanic Office for Local Assistance (HOLA)
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Hankins-Park-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Dr. I Sylvester Hankins Park Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Callahan-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Callahan Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Northwest-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Northwest Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Dover-Shores-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Dover Shores Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Grand-Avenue-Park"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Grand Avenue Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Ivey-Lane-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Ivey Lane Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Langford-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Langford Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Rock-Lake-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Rock Lake Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Wadeview-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Wadeview Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Parks-the-Environment/Directory/Citrus-Square-Neighborhood-Center"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    Citrus Square Neighborhood Center
                  </Link>
                </ListItem>
                <ListItem sx={{ margin: 0, padding: 0 }}>
                  <Link
                    to="https://www.orlando.gov/Our-Government/Departments-Offices/Executive-Offices/CAO/RISE-Employment-Training-Program"
                    target="_blank"
                    style={{ textDecoration: "underline", color: "black" }}
                  >
                    RISE Employment and Training Office
                  </Link>
                </ListItem>
              </List>
            </Box>
          </Box>

          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{
                textAlign: "top",
                padding: "0px 50px 5px 50px",
                fontSize: 86,
                color: "black",
              }}
            >
              3
            </Box>
            <Box
              sx={{
                padding: 5,
                paddingRight: 40,
                fontSize: 20,
                color: "black",
              }}
            >
              <b>Visit Location to Check Out Device</b>
              <br />
              Neighborhood Center staff will need a Drivers License or mail to
              verify City of Orlando address. You have two weeks to utilize the
              device before it must be returned. If you need additional time,
              you must return the device and re-check it out at the same
              location.
              <br />
              <br />
              Rules for Check Out:
              <List
                sx={{
                  listStyleType: "disc",
                  pl: 2,
                  "& .MuiListItem-root": { display: "list-item" },
                }}
              >
                <ListItem sx={{ marginLeft: 5, padding: 0 }}>
                  Any verified Resident of the City of Orlando may checkout a
                  Device. (MUST be 18 or Older to check out a device)
                </ListItem>
                <ListItem sx={{ marginLeft: 5, padding: 0 }}>
                  Devices can be checked out for up to 14 days and MUST be
                  returned to the same location they were checked out from
                  during each location's normal operating hours.
                </ListItem>
                <ListItem sx={{ marginLeft: 5, padding: 0 }}>
                  Returning a device damaged or not at all may result in
                  suspension of the household's Device Checkout privileges.
                </ListItem>
                <ListItem sx={{ marginLeft: 5, padding: 0 }}>
                  Content filtering is always On and will prohibit access to
                  inappropriate sites. Parents/Guardians are still responsible
                  for monitoring device usage of minors.
                </ListItem>
                <ListItem sx={{ marginLeft: 5, padding: 0 }}>
                  Each Household may checkout 1 of each device type.
                </ListItem>
              </List>
            </Box>
          </Box>

          <Box sx={{ display: "flex", width: "100%" }}>
            <Box
              sx={{
                padding: "0px 50px 5px 50px",
                fontSize: 86,
                color: "black",
              }}
            >
              4
            </Box>
            <Box
              sx={{
                padding: 5,
                paddingRight: 40,
                fontSize: 20,
                color: "black",
              }}
            >
              <b>Sign Lending Agreement</b>
              <br />A Lending Agreement Form is required to be signed for each
              device checked out. A staff member will provide this form during
              the check out process.
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default HelpModal;
