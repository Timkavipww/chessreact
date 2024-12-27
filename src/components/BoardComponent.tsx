import { FC, useEffect, useState } from "react";
import { Board } from "../models/Board";
import {CellComponent } from "./CellComponent";
import { Cell } from "../models/Cell";
import { Player } from "../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    currentPlayer: Player | null;
    swapPlayer: () => void;
}

export const BoardComponent: FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}) => {
    const [selectedCell, setSelectedCell] = useState<Cell | null>(null);

    useEffect(() => {
        highlightCells();
    }, [selectedCell])

    function click(cell: Cell) {
        if(selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell))  {
            selectedCell.moveFigure(cell);
            swapPlayer();
            setSelectedCell(null);
            updateBoard();
        } else {
            if(cell.figure?.color === currentPlayer?.color)
            setSelectedCell(cell);
        }
    }

    function highlightCells() {
        board.highlightCells(selectedCell);
        updateBoard()
    }


    function updateBoard() {
        const newBoard = board.getCopyBoard();
        setBoard(newBoard);
    }

    return (
        <div>
            <h3 className="p-3 mb-5 font-extrabold text-4xl flex flex-col text-center">Ход игрока {currentPlayer?.color}</h3>
        <div className="board">
            {board.cells.map((row,index) => 
            <div className="flex flex-row" key = {index}>
                {row.map(cell =>
                    <CellComponent
                    click={click}
                    cell={cell}
                    key= {cell.id}
                    selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                    />
                )}
            </div>
        )}
        </div>
        </div>

    );
};
