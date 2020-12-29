import React from 'react';

import styled from 'styled-components'

export default function Footer(props) {
    return (
        <StyledFooter>
            {props.children}
        </StyledFooter>
    );
}

const StyledFooter = styled.footer`
    background-color: #eee;
    padding: 1rem;
`;
