// import React from 'react';
// import styled from 'styled-components';

// const StyledTable = styled.table`
//     border-collapse: collapse;
//     color: lightgrey;
//     table-layout: fixed;
// `;

// const StyledDiv = styled.div`
//     height: 206px;
//     max-width: 100vw;
//     overflow-x: auto;
//     overflow-y: auto;
//     position: relative;
//     margin-top: 100px;
// `;

// const StyledTh = styled.th`
//     background: black;
//     color: white;
//     white-space: nowrap;
// `;

// const StyledTr = styled.tr`
//     background: hsl(0, 0%, 20%);

//     &:nth-child(even) {
//         background: hsl(0, 0%, 15%);
//     }

//     &:not(:last-of-type) {
//         border-bottom: 2px solid rgba(yellow, 0.25);
//     }
// `;

// const StyledTd = styled.td`
//     padding: 10px 100px;
//     text-transform: capitalize;

//     &:first-child {
//         position: -webkit-sticky;
//         position: sticky;
//         left: 0px;
//         top: 0px;
//         z-index: 2;
//         width: 200px;
//     }

//     tr:nth-child(odd) &:first-child {
//         background: hsl(0, 0%, 20%);
//         box-shadow: inset -2px 0px rgba(black, 0.25);
//     }

//     tr:nth-child(even) &:first-child {
//         background: hsl(0, 0%, 15%);
//         box-shadow: inset -2px 0px rgba(black, 0.25);
//     }
// `;

// const Table = () => {
//     return (
//         <StyledDiv>
//             <StyledTable>
//                 <thead>
//                     <StyledTr>
//                         <StyledTh>chapter 1</StyledTh>
//                         <StyledTh>chapter 2</StyledTh>
//                         <StyledTh>chapter 3</StyledTh>
//                         <StyledTh>chapter 4</StyledTh>
//                         <StyledTh>chapter 5</StyledTh>
//                         <StyledTh>chapter 6</StyledTh>
//                         <StyledTh>chapter 7</StyledTh>
//                         <StyledTh>chapter 8</StyledTh>
//                         <StyledTh>chapter 9</StyledTh>
//                         <StyledTh>chapter 10</StyledTh>
//                     </StyledTr>
//                 </thead>
//                 <tbody>
//                     {[...Array(7)].map((_, index) => (
//                         <StyledTr key={index}>
//                             <StyledTd>Sad</StyledTd>
//                             <StyledTd>Happy</StyledTd>
//                             <StyledTd>Happy</StyledTd>
//                             <StyledTd>Happy</StyledTd>
//                             <StyledTd>Happy</StyledTd>
//                             <StyledTd>Happy</StyledTd>
//                             <StyledTd>Happy</StyledTd>
//                             <StyledTd>Happy</StyledTd>
//                             <StyledTd>Happy</StyledTd>
//                             <StyledTd>Happy</StyledTd>
//                         </StyledTr>
//                     ))}
//                 </tbody>
//             </StyledTable>
//         </StyledDiv>
//     );
// };

// export default Table;





























// import React from 'react';
// import styled from 'styled-components';

// const StyledTable = styled.table`
//     border-collapse: collapse;
//     color: lightgrey;
//     table-layout: fixed;
// `;

// const StyledDiv = styled.div`
//     height: 206px;
//     max-width: 100vw;
//     overflow-x: auto;
//     overflow-y: auto;
//     position: relative;
//     margin-top: 100px;
// `;

// const StyledTh = styled.th`
//     background: black;
//     color: white;
//     white-space: nowrap;
// `;

// const StyledTr = styled.tr`
//     background: hsl(0, 0%, 20%);

//     &:nth-child(even) {
//         background: hsl(0, 0%, 15%);
//     }

//     &:not(:last-of-type) {
//         border-bottom: 2px solid rgba(yellow, 0.25);
//     }
// `;

// const StyledTd = styled.td`
//     padding: 10px 100px;
//     text-transform: capitalize;

//     &:first-child {
//         position: -webkit-sticky;
//         position: sticky;
//         left: 0px;
//         top: 0px;
//         z-index: 2;
//         width: 200px;
//     }

//     tr:nth-child(odd) &:first-child {
//         background: hsl(0, 0%, 20%);
//         box-shadow: inset -2px 0px rgba(black, 0.25);
//     }

//     tr:nth-child(even) &:first-child {
//         background: hsl(0, 0%, 15%);
//         box-shadow: inset -2px 0px rgba(black, 0.25);
//     }
// `;

// const Table = () => {
//     const stickyColumns = [1,2, 3, 5]; // Cột index (số bắt đầu từ 1) mà bạn muốn có tính năng sticky

//     const isStickyColumn = (columnIndex) => {
//         return stickyColumns.includes(columnIndex);
//     };

//     return (
//         <StyledDiv>
//             <StyledTable>
//                 <thead>
//                     <StyledTr>
//                         {[...Array(10)].map((_, index) => (
//                             <StyledTh key={index} style={{ position: isStickyColumn(index + 1) ? 'sticky' : 'static' }}>
//                                 chapter {index + 1}
//                             </StyledTh>
//                         ))}
//                     </StyledTr>
//                 </thead>
//                 <tbody>
//                     {[...Array(7)].map((_, index) => (
//                         <StyledTr key={index}>
//                             {[...Array(10)].map((_, cellIndex) => (
//                                 <StyledTd key={cellIndex}>Happy</StyledTd>
//                             ))}
//                         </StyledTr>
//                     ))}
//                 </tbody>
//             </StyledTable>
//         </StyledDiv>
//     );
// };

// export default Table;


import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledTable = styled.table`
    border-collapse: collapse;
    color: lightgrey;
    table-layout: fixed;
`;

const StyledDiv = styled.div`
    height: 206px;
    max-width: 100vw;
    overflow-x: auto;
    overflow-y: auto;
    position: relative;
    margin-top: 100px;
`;

const StyledTh = styled.th`
    background: black;
    color: white;
    white-space: nowrap;
`;

const StyledTr = styled.tr`
    background: hsl(0, 0%, 20%);

    &:nth-child(even) {
        background: hsl(0, 0%, 15%);
    }

    &:not(:last-of-type) {
        border-bottom: 2px solid rgba(yellow, 0.25);
    }
`;

const StyledTd = styled.td`
    padding: 10px 100px;
    text-transform: capitalize;
`;

const Table = () => {
    const tableRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const headerCells = tableRef.current.querySelectorAll('thead th');
            const bodyCells = tableRef.current.querySelectorAll('tbody td');

            headerCells.forEach((headerCell, index) => {
                const bodyCell = bodyCells[index];
                bodyCell.style.width = `${headerCell.offsetWidth}px`;
            });
        };

        handleScroll(); // Update cell widths when component mounts

        tableRef.current.addEventListener('scroll', handleScroll);

        return () => {
            tableRef.current.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <StyledDiv>
            <StyledTable ref={tableRef}>
                <thead>
                    <StyledTr>
                        <StyledTh>chapter 1</StyledTh>
                        <StyledTh>chapter 2</StyledTh>
                        <StyledTh>chapter 3</StyledTh>
                        <StyledTh>chapter 4</StyledTh>
                        <StyledTh>chapter 5</StyledTh>
                        <StyledTh>chapter 6</StyledTh>
                        <StyledTh>chapter 7</StyledTh>
                        <StyledTh>chapter 8</StyledTh>
                        <StyledTh>chapter 9</StyledTh>
                        <StyledTh>chapter 10</StyledTh>
                    </StyledTr>
                </thead>
                <tbody>
                    {[...Array(7)].map((_, rowIndex) => (
                        <StyledTr key={rowIndex}>
                            {[...Array(10)].map((_, cellIndex) => (
                                <StyledTd key={cellIndex}>Happy</StyledTd>
                            ))}
                        </StyledTr>
                    ))}
                </tbody>
            </StyledTable>
        </StyledDiv>
    );
};

export default Table;

