import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomButton from "@components/BottomButton";
import Button from "@components/Button";
import Modal from "@components/Modal";
import { css } from "@emotion/react";

export default function StartPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <div>
      <Button fullWidth={false} onClick={() => navigate("/sub")}>
        go other page
      </Button>
      <BottomButton onClick={() => setShowModal(true)}>open modal</BottomButton>
      {showModal && (
        <Modal onCloseModal={handleCloseModal}>
          <div
            css={css`
              width: 120px;
              height: 80px;
            `}
          >
            hihihi
          </div>
        </Modal>
      )}
    </div>
  );
}
