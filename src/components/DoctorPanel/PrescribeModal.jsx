// components/DoctorPanel/PrescribeModal.jsx
import React from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import PrescribePage from "../../Pages/DoctorPanel/PrescribePage";

const PrescribeModal = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-5xl w-full max-h-[90vh] p-0 overflow-hidden rounded-2xl"
      >
        <div className="h-[90vh] flex flex-col">
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <PrescribePage />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PrescribeModal;