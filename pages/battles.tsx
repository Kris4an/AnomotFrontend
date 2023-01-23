import { NextPage } from "next";
import NavBar from "../components/NavBar";
import styled from "styled-components";
import Battle from "../components/Battle";

const MainHolder = styled.div`
    width: 100%;
    height: 100vh;
    //display: flex;
    //flex-direction: column;
    //gap: 1rem;
    //align-items: center;
    overflow-y: scroll;
`;

const Battles:NextPage = () => {
    return(
        <NavBar stage={0} >
            <MainHolder>
                <Battle></Battle>
                <Battle></Battle>
                <Battle></Battle>
            </MainHolder>
        </NavBar>
    )
}

export default Battles;