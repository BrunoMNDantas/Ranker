import React, { ReactNode } from 'react';
import classes from './EntityFormModal.module.css';
import { Modal, ModalProps } from '@mui/material';
import EntityCardActions from '../entityCard/entityCardActions/EntityCardActions';
import EntityCard from '../entityCard/EntityCard';
import CloseIcon from '@mui/icons-material/Close';

export interface EntityFormModalProps extends Omit<ModalProps, 'children'> {
    modalHeader: ReactNode,
    modalForm: ReactNode,
    entityCreateIcon: ReactNode,
    onCreate: () => Promise<void>
    onCancel: () => Promise<void>
}

const EntityFormModal = ({ modalHeader, modalForm, entityCreateIcon, onCreate, onCancel, ...props }: EntityFormModalProps) => {
    const className = props.className || classes.root

    const cardActions = (
        <EntityCardActions actions={[
            {
                iconProps: { color: "error" },
                icon: <CloseIcon/>,
                onClick: onCancel,
                disabled: false
            },
            {
                iconProps: { color: "info" },
                icon: entityCreateIcon,
                onClick: onCreate,
                disabled: false
            }
        ]}/>
    )

    return (
        <Modal className={className} {...props}>
            <EntityCard>{[modalHeader, modalForm, cardActions]}</EntityCard>
        </Modal>
    );
}

export default EntityFormModal;