import { Board } from './Board';
import { Colors } from "./Colors";
import { Figure } from './figures/Figure';

export class Cell {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;
    figure: Figure | null;
    board: Board;
    available: boolean;
    id: number;

    constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
        this.available = false;
        this.board = board;
        this.y = y;
        this.x = x;
        this.figure = figure;
        this.id = Math.random();
        this.color = color;

    }
    
    isEmpty() {
        return this.figure === null;
    }
    
    isEnemy(target: Cell): boolean {
        if(target.figure)
            return this.figure?.color !== target.figure.color;
        return false;

    }

    isEmptyVertical(target: Cell): boolean {
        if(target.x !== this.x) {
            return false;
        }
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for(let y = min + 1; y < max; y++) {
            if(!this.board.getCell(this.x, y).isEmpty()) {
                return false;
            }
        }

        return true;
    }
    
    isEmptyHorizontal(target: Cell): boolean {
        if(target.y !== this.y) {
            return false;
        }
        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for(let x = min + 1; x < max; x++) {
            if(!this.board.getCell(x,this.y).isEmpty()) {
                return false;
            }
        }

        return true;
    }  
    isEmptyForKing(target: Cell): boolean {

        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);

        if(absX <= 1 && absY <=1) {
            const targetCell = this.board.getCell(target.x, target.y);
            
            if(targetCell.isEmpty() || !targetCell.isEnemy(targetCell)) {
                return true;
            }
        }
        
        return false;
    }


    isEmptyDiagonal(target: Cell): boolean {

        const absX = Math.abs(target.x -this.x);
        const absY = Math.abs(target.y -this.y);

        if(absX !== absY) {
            return false;
        }
        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1


        for(let i = 1; i < absY; ++i) {
            if(!this.board.getCell(this.x + dx*i, this.y + dy * i).isEmpty()) {
                return false;
            }

        }
        return true;
    }
    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }

    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK
        ? this.board.lostBlackFigures.push(figure)
        : this.board.lostWhiteFigures.push(figure);
    }
    moveFigure(target: Cell) {
        if (this.figure && this.figure.canMove(target)) {
            // Сохраняем текущее состояние
            const sourceFigure = this.figure;
            const targetFigure = target.figure;
    
            // Выполняем временный ход
            target.setFigure(this.figure);
            this.figure = null;
    
            // Проверяем, не оставляет ли этот ход короля под шахом
            const isKingInCheck = this.board.isCheck(sourceFigure.color);
    
            // Откатываем ход
            this.figure = sourceFigure;
            target.figure = targetFigure;
    
            if (isKingInCheck) {
                console.log("Невозможно сделать ход: король под шахом!");
                return;
            }
    
            // Окончательно выполняем ход
            this.figure.moveFigure(target);
            if (targetFigure) {
                this.addLostFigure(targetFigure);
            }
            target.setFigure(this.figure);
            this.figure = null;
        }
    }
    
}