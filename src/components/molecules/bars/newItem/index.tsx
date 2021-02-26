import React from 'react';
import { Button } from '../../../atoms';
import './newItem.style.scss';

export const NewItem = () => {
    return (
        <div className="new_item">
            <Button mini label="New purchase" icon="plus" onClick={() => {}} />
        </div>
    );
};
