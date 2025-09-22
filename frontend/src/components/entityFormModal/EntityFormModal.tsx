import React, { ReactNode } from 'react';
import classes from './EntityFormModal.module.css';
import { Badge, Modal, ModalProps } from '@mui/material';
import EntityCardActions from '../entityCard/entityCardActions/EntityCardActions';
import EntityCard from '../entityCard/EntityCard';
import CloseIcon from '@mui/icons-material/Close';
import EntityCreateIcon from '../entityCreateIcon/EntityCreateIcon';

export interface EntityFormModalProps<T> extends Omit<ModalProps, 'children'> {
    modalHeader: ReactNode,
    modalForm: ReactNode,
    entityCreateIcon: ReactNode,
    onCreate: () => Promise<void>
    onCancel: () => Promise<void>
}

const EntityFormModal = <T,>({ modalHeader, modalForm, entityCreateIcon, onCreate, onCancel, ...props }: EntityFormModalProps<T>) => {
    const className = props.className || classes.root

    const cardActions = (
        <EntityCardActions actions={[
            {
                iconProps: { size: "large", color: "error" },
                icon: <CloseIcon/>,
                onClick: onCancel,
                disabled: false
            },
            {
                iconProps: { size: "large", color: "info" },
                icon: entityCreateIcon,
                onClick: onCreate,
                disabled: false
            }
        ]}/>
    )

    return (
        <Modal className={className} {...props}>
            <EntityCard cardHeader={modalHeader} cardContent={modalForm} cardActions={cardActions}/>
        </Modal>
    );
}

export default EntityFormModal;