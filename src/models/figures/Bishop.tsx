import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-slon.png";
import whiteLogo from "../../assets/white-slon.png";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

export class Bishop extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color,cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        if(this.cell.isEmptyDiagonal(target))
            return true;

        return false;
    }
}