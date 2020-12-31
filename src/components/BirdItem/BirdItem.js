import React from 'react';

import styled from 'styled-components'

export default function BirdItem(props) {

    const {species} = props;

    return (
        <StyledBirdItem>
            <img 
                src={require('../../assets/images/species/' + species + '.png').default}
                alt={species}
                style={{
                    maxWidth: '10rem'
                }}
            />
            <Counter>0</Counter>
        </StyledBirdItem>
    );

}

const StyledBirdItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Counter = styled.div`
    background-color: #111;
    color: #fff;
    padding: 1rem;
    line-height: 1;
    border-radius: 50%;
`;