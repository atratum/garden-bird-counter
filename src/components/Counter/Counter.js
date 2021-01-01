import React from 'react';

import styled from 'styled-components'

export default function Counter(props) {

    const {count} = props;
    
    return <StyledCounter>{count ? count : 0}</StyledCounter>;

}

const StyledCounter = styled.div`
    background-color: #111;
    color: #fff;
    padding: 1rem;
    line-height: 1;
    border-radius: 50%;
`;
