import React, { useState } from 'react';
import { Button } from '../../../atoms';
import './existingItem.style.scss';

export const ExistingItem = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="existing_item">
            <Button mini icon={open ? 'chevron-up' : 'chevron-down'} onClick={() => setOpen(!open)} />
        </div>
    );
};
