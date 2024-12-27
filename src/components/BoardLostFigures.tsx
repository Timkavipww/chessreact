import { FC } from "react";
import { Board } from "../models/Board";
import {LostFigures} from "./LostFigures";

interface BoardLostFiguresProps {
    board: Board;
}

export const BoardLostFigures:FC<BoardLostFiguresProps> = ({board}) => {
    return ( 
        <div className="flex flex-row h-20">
        <LostFigures
          title="Черные фигуры"
          figures={board.lostBlackFigures}
        />
        <LostFigures
          title="Белые"
          figures={board.lostWhiteFigures}
        />
        </div>
     );
    
}
 