import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-ladya.png";
import whiteLogo from "../../assets/white-ladya.png";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

export class Rook extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color,cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.ROOK;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        if(this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizontal(target))
            return true;
        return false;
    }
}