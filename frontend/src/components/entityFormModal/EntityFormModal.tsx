import { ReactNode } from 'react';
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

    return (
        <Modal className={className} data-testid="entity-form-modal" {...props}>
            <EntityCard>
                {modalHeader}
                {modalForm}
                <EntityCardActions actions={[
                    {
                        iconProps: { color: "error" },
                        icon: <CloseIcon/>,
                        onClick: onCancel,
                        disabled: false,
                        testId: "modal-cancel-button"
                    },
                    {
                        iconProps: { color: "info" },
                        icon: entityCreateIcon,
                        onClick: onCreate,
                        disabled: false,
                        testId: "modal-create-button"
                    }
                ]}/>
            </EntityCard>
        </Modal>
    );
}

export default EntityFormModal;