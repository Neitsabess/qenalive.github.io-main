import { Flex } from '@chakra-ui/react';
import './sidebar-split-pane.css';
import Main from './Main';
import Sidebar from './Sidebar';

type LayoutProps = {
  handleMouseEnter: Function;
  handleMouseLeave: Function;
  isCollapsed: boolean;
  onCollapseButtonClick: Function;
  sizes: number[];
  isHoveringCollapse: boolean;
  isHoveringExpand: boolean;
  onExpandButtonClick: Function;
  setSizes: Function;
};

// Mobile is different than Desktop in that the Pane component needs to be listed below the Main component
//  in order to have the sidebar be on the bottom of the screen.
// If we want the sidebar to be on the top, we could just switch the order of the components.
function MobileLayout({
  handleMouseEnter,
  handleMouseLeave,
  isCollapsed,
  onCollapseButtonClick,
  sizes,
  isHoveringCollapse,
  isHoveringExpand,
  onExpandButtonClick,
  setSizes,
}: LayoutProps) {
  return (
    // This flex needs to be 100% of the parent flex inside App.js
    <Flex h="100%" w="100%">
      {/* 
                Implements the split pane library I found on npm.
                I have it setup to have one pane and the other pane is the rest of the screen.
                What is inside the pane is the sidebar component that can expand/collapse/be resized.
                The rest of the page is responsive to the sidebar.
            */}
      <SplitPane
        split="horizontal" // Orienation of the split
        sizes={sizes} // The initial sizes of each pane
        onChange={(newSizes: number[]) => setSizes(newSizes)} // Function to call when the size changes?
        resizerSize={4} // Width of the resizer border when you hover/click
        allowResize={!isCollapsed} // Use the isCollapsed state variable to control the allowResize prop
        sashRender={() => <div className="sash" />}
      >
        {/* 
                    The rest of the stuff is all responsive to the size of the pane
                */}
        <Main />

        {/* 
                    This is the pane that is resizable and holds the sidebar
                */}
        <Pane // Left pane for the sidebar. These numbers were arbitrary and can be changed
          minSize={100} // Minimum size of the pane in px
          maxSize="50%" // Maximum size of the pane in %
        >
          <Sidebar // Pass along the functions and props from App.js to this component
            isMobile={true}
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
      </SplitPane>
    </Flex>
  );
}

export default MobileLayout;
