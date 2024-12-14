import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-queen.png";
import whiteLogo from "../../assets/white-queen.png";
import { Colors } from "../Colors";
import { Cell } from "../Cell";

export class Quenn extends Figure {
    constructor(color: Colors, cell: Cell) {
        super(color,cell);
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.QUEEN;
    }

    canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false;
        }
        if(this.cell.isEmptyVertical(target) || this.cell.isEmptyHorizontal(target) || this.cell.isEmptyDiagonal(target)){
            return true;
        }

        return false;
    }

}