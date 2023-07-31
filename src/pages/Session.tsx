import { Box } from "@chakra-ui/react";
import CommunityChat from "../components/CommunityChat";
import BetaCover from "../components/Beta/Canvas";

export default function Session() {
    return (
        <Box>
            <BetaCover />
            <CommunityChat />
        </Box>
    );
};