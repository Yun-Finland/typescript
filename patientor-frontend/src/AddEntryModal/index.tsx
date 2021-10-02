import React from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import AddEntryForm from './AddEntryForm';
import { EntryWithoutId } from '../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  onSubmit:(values:EntryWithoutId)=>void;
}

export const AddEntryModal = ({ modalOpen, onClose, error, onSubmit}:Props)=>{

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Choose a Entry Type</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm 
          onClose={onClose}
          onSubmit={onSubmit}
        />
      </Modal.Content>
    </Modal>
  );
};

/*

export const AddEntryModal = ({ modalOpen, onClose, onSubmit, error }:Props) => {
  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new Entry</Modal.Header>
      <Modal.Content>
        {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
        <AddEntryForm onSubmit={onSubmit} onCancel={onClose} />
      </Modal.Content>
    </Modal>
  );
};


*/

