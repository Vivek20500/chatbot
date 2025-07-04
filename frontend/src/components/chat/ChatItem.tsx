import { Box, Typography } from "@mui/material";
import React from "react";

const ChatItem = ({
  content,
  role,
}: {
  content: string;
  role: "user" | "assistant";
}) => {
  return role === "assistant" ? (
    <Box className="w-full">
      <Box sx={{ display: "flex",justifyContent: "flex-start", p: 1,textAlign:"start",width:"100%"  }}>
        <Typography className="py-1 px-4" sx={{color:"#F7F5EB",bgcolor:"#212121",borderRadius:"10px", maxWidth: "60%",
        wordBreak: "break-word", fontSize:"15px" }} >{content}</Typography>
      </Box>
    </Box>
  ) : (
    <Box className="w-full  " sx={{}}>
      <Box sx={{ display: "flex",justifyContent: "flex-end", p:1,textAlign:"end",width:"100%"  }}>
        <Typography className="py-1 px-4" sx={{color:"#F7F5EB",bgcolor:"#2C74B3", borderRadius:"10px",maxWidth: "60%",
        wordBreak: "break-word",fontSize:"15px" }} >{content}</Typography>
      </Box>
    </Box>
  );
};

export default ChatItem;
