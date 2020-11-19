import React from "react";
import { Box } from "@chakra-ui/react";

const Message = ({ message, matched }) => (
  <Box
    alignSelf={matched ? "flex-end" : "flex-start"}
    bgImage={
      matched
        ? "linear-gradient(45deg, #40E0D0, #00BFFF)"
        : "linear-gradient(#FFF, #FFF)"
    }
    color={matched ? "white" : "black"}
    boxShadow='md'
    borderRadius={12}
    p={2}
    mb={2}
  >
    {message}
  </Box>
);

export default Message;
