import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from './figures/Figure';
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Quenn } from "./figures/Queen";
import { Rook } from "./figures/Rook";

export class Board {
    cells: Cell[][] = [];
    lostBlackFigures: Figure[] = [];
    lostWhiteFigures: Figure[] = [];

    public initCells() {
        for(let i = 0; i < 8; ++i) {
            const row: Cell[] = []
            for(let j = 0; j < 8; ++j) {
                if((i + j) % 2 !== 0) {
                    row.push(new Cell(this, j, i, Colors.BLACK, null,));
                } else {
                    row.push(new Cell(this, j ,i, Colors.WHITE, null));
                }
            }
            this.cells.push(row);
        }
    }
    public isCheck(color: Colors): boolean {
        let kingCell: Cell | null = null;
    
        // Найти клетку с королем указанного цвета
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                const cell = this.cells[j][i];
                if (cell.figure?.name === FigureNames.KING && cell.figure.color === color) {
                    kingCell = cell;
                    break;
                }
            }
            if (kingCell) break;
        }
    
        if (!kingCell) {
            throw new Error(`Король цвета ${color} не найден на доске.`);
        }
    
        // Проверить, атакуют ли короля фигуры противника
        for (let i = 0; i < this.cells.length; i++) {
            for (let j = 0; j < this.cells[i].length; j++) {
                const cell = this.cells[i][j];
                if (cell.figure && cell.figure.color !== color) {
                    if (cell.figure.canMove(kingCell)) {
                        return true;
                    }
                }
            }
        }
    
        return false;
    }
    
    public getCopyBoard(): Board {
        const newBoard = new Board();
        newBoard.cells = this.cells;
        newBoard.lostBlackFigures = this.lostBlackFigures;
        newBoard.lostWhiteFigures = this.lostWhiteFigures;
        return newBoard;

    }

    public highlightCells(selectedCell: Cell | null) {
        for(let i = 0; i < this.cells.length; ++i) {
            const row = this.cells[i];
            for(let j = 0; j < row.length; ++j) {
                const target = row[j];
                target.available = !!selectedCell?.figure?.canMove(target);
            }
        }
    }
    public getCell(x:number, y:number) {
        return this.cells[y][x];
    }

    private addPawns() {
        for(let i = 0; i < 8; i++) {
            new Pawn(Colors.BLACK, this.getCell(i,1));
            new Pawn(Colors.WHITE, this.getCell(i, 6))
        }
    }

    private addKings() {
        new King(Colors.BLACK, this.getCell(4,0));
        new King(Colors.WHITE, this.getCell(3,7));
    }

    private addQueens() {
        new Quenn(Colors.BLACK, this.getCell(3,0));
        new Quenn(Colors.WHITE, this.getCell(4,7));
    }

    private addRooks() {
        new Rook(Colors.BLACK, this.getCell(0,0));
        new Rook(Colors.BLACK, this.getCell(7,0));
        new Rook(Colors.WHITE, this.getCell(0,7));
        new Rook(Colors.WHITE, this.getCell(7,7));
    }

    private addKnights() {
        new Knight(Colors.BLACK, this.getCell(2,0));
        new Knight(Colors.BLACK, this.getCell(5,0));
        new Knight(Colors.WHITE, this.getCell(2,7));
        new Knight(Colors.WHITE, this.getCell(5,7));
    }

    private addBishops() {
        new Bishop(Colors.BLACK, this.getCell(1,0));
        new Bishop(Colors.BLACK, this.getCell(6,0));
        new Bishop(Colors.WHITE, this.getCell(1,7));
        new Bishop(Colors.WHITE, this.getCell(6,7));
    }

    // public addFisherFigures() {

    // }
    public addFigures() {
        this.addBishops();
        this.addKings();
        this.addKnights();
        this.addPawns();
        this.addQueens();
        this.addRooks();
    }
}