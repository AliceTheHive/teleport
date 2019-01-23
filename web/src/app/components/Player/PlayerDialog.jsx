/*
Copyright 2015 Gravitational, Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

import React from 'react';
import styled from 'styled-components';
import Portal from 'shared/components/Modal/Portal';
import { close } from 'app/flux/player/actions';
import Player from './Player';
import DocumentTitle from './../DocumentTitle';
import { Flex, Box } from 'shared/components';
import { fonts } from 'shared/components/theme';
import cfg from 'app/config';

class PlayerDialog extends React.Component {

  constructor(props) {
    super(props);
    const { sid, siteId } = props.match.params;
    this.url = cfg.api.getFetchSessionUrl({ siteId, sid });
  }

  onClose = () => {
    const { siteId } = this.props.match.params;
    close(siteId)
  }

  render() {
    const { siteId } = this.props.match.params;
    const title = `${siteId} · Player`;
    return (
      <Portal>
        <DocumentTitle title={title}>
          <StyledTerminal>
            <Flex flexDirection="column" height="100%" width="100%">
              <Box px={2} height="60px">
                FDSF
              </Box>
              <Player url={this.url}/>
            </Flex>
          </StyledTerminal>
        </DocumentTitle>
      </Portal>
    );
  }
}

export const StyledTerminal = styled.div`
  background-color:${props => props.theme.colors.bgTerminal};
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  .grv-terminal {
    height: 100%;
    width: 100%;
    font-size: 14px;
    line-height: normal;
    overflow: auto;
  }

  .grv-terminal .terminal {
    font-family: ${fonts.mono};
    border: none;
    font-size: inherit;
    line-height: normal;
    position: relative;
  }

  .grv-terminal .terminal .xterm-viewport {
    background-color:${props => props.theme.colors.bgTerminal};
    overflow-y: hidden;
  }

  .grv-terminal .terminal * {
    font-weight: normal!important;
  }
`;

export default PlayerDialog;