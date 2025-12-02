import { Box, Typography } from "@mui/material";
import Button from "./Button";

const RequirementEligibility = () => {
  return (
    <>
      <Box
        sx={{
          width: 564,
          height: 470,
          backgroundColor: "rgb(1, 75, 142)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            borderBottom: "solid",
            borderBottomWidth: 1.5,
            width: "90%",
            height: "110%",
            color: "white",
          }}
        >
          <Typography variant="h5">
            <br />
            Requirements: <br />
            - Must live within City of Orlando limits <br />
            - Must be 18 years or older <br />
            <br />
          </Typography>
        </Box>
        <Box
          sx={{
            width: "90%",
            height: "80%",
          }}
        >
          <Typography variant="h5">
            <br />
            Result: ❌ Sorry, this program is only available to City of Orlando residents age 18+
          </Typography>
        </Box>
        <Box
          sx={{
            width: "90%",
            height: "100%",
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
            paddingBottom: 5,

            "& .MuiButton-root": {
              fontSize: 22,
              width: 207,
              height: 95,
              boxShadow: "none",
            },
          }}
        >
          <Button varianttype="submit" route="/nearest">
            Find Nearest Center
          </Button>
          <Button varianttype="submit" route="/device">
            View Device Availability
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RequirementEligibility;
