import React from 'react';
import { Modal } from 'react-responsive-modal';

const App = () => {
  const [open, setOpen] = React.useState(false);

  const lorem = (
    <p>
      Mauris ac arcu sit amet dui interdum bibendum a sed diam. Praesent rhoncus
      congue ipsum elementum lobortis. Ut ligula purus, ultrices id condimentum
      quis, tincidunt quis purus. Proin quis enim metus. Nunc feugiat odio at
      eros porta, ut rhoncus lorem tristique. Nunc et ipsum eu ex vulputate
      consectetur vel eu nisi. Donec ultricies rutrum lectus, sit ame feugiat
      est semper vitae. Proin varius imperdiet consequat. Proin eu metus nisi.
      In hac habitasse platea dictumst. Vestibulum ac ultrices risus.
      Pellentesque arcu sapien, aliquet sed orci sit amet, pulvinar interdum
      velit. Nunc a rhoncus ipsum, maximus fermentum dolor. Praesent aliquet
      justo vitae rutrum volutpat. Ut quis pulvinar est.
    </p>
  );

  return (
    <>
      <button className="button" onClick={() => setOpen(true)}>
        Open big modal
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <h2>Big modal</h2>
        {lorem}
        {lorem}
        {lorem}
        {lorem}
        {lorem}
        {lorem}
        {lorem}
        {lorem}
        {lorem}
      </Modal>
    </>
  );
};

export default App;
