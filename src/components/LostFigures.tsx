import { Figure } from '../models/figures/Figure';
import { FC } from 'react';

interface LostFiguresProps {
    title: string;
    figures: Figure[];
}

export const LostFigures: FC<LostFiguresProps> = ({title, figures}) => {
    return (
        <div className="h-[calc(50vh-30px)] pt-4 px-4 ml-12 bg-gray-400 grid-flow-row ">
            <h3>{title}</h3>
            {figures.map(figure =>
            <div key={figure.id} className='flex flex-col m-auto from-neutral-800'>
                {figure.name} {figure.logo && <img width={15} height={15} src={figure.logo}/>}
            </div>
            )}
        </div>
    );
}
