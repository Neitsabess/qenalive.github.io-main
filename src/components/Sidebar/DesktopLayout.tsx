import { Flex } from "@chakra-ui/react";
import './sidebar-split-pane.css'
import Main from "./Main";
import Sidebar from "./Sidebar";

type LayoutProps = {
    handleMouseEnter: Function,
    handleMouseLeave: Function,
    isCollapsed: boolean,
    onCollapseButtonClick: Function,
    sizes: number[],
    isHoveringCollapse: boolean,
    isHoveringExpand: boolean,
    onExpandButtonClick: Function,
    setSizes: Function,
}

// Desktop is different than Mobile in that the Pane component needs to be listed above the Main component
//  in order to have the sidebar be on the left side of the screen.
function DesktopLayout({ handleMouseEnter, handleMouseLeave, isCollapsed, onCollapseButtonClick, sizes, isHoveringCollapse, isHoveringExpand, onExpandButtonClick, setSizes }: LayoutProps) {
    return (
        // This flex needs to be 100% of the parent flex inside App.js
        <Flex
            h="100%"
            w="100%"
        >
            {/* 
                Implements the split pane library I found on npm.
                I have it setup to have one pane and the other pane is the rest of the screen.
                What is inside the pane is the sidebar component that can expand/collapse/be resized.
                The rest of the page is responsive to the sidebar.
            */}
            <SplitPane
                split="vertical"
                sizes={sizes}
                onChange={(newSizes: number[]) => setSizes(newSizes)}
                resizerSize={4}
                allowResize={!isCollapsed}
                sashRender={() => <div className="sash" />}
            >
                <Pane
                    minSize={100}     // Minimum size of the pane in px
                    maxSize='50%'     // Maximum size of the pane in %
                >
                    <Sidebar    // Pass along the functions and props from App.js to this component
                        isMobile={false}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseLeave={handleMouseLeave}
                        isCollapsed={isCollapsed}
                        onCollapseButtonClick={onCollapseButtonClick}
                        sizes={sizes}
                        isHoveringCollapse={isHoveringCollapse}
                        isHoveringExpand={isHoveringExpand}
                        onExpandButtonClick={onExpandButtonClick}
                    />
                </Pane>
                <Main /> 

            </SplitPane>
        </Flex>
    )
}

export default DesktopLayout;