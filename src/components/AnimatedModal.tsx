import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";

interface Props {
    isOpen: boolean;
    onRequestClose: () => void;
    children: React.ReactNode;
    contentLabel: string;
}

const backdropVariants = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
};

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: -50 },
    visible: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.9, y: -50 },
};

export default function AnimatedModal({ isOpen, onRequestClose, children, contentLabel }: Props) {
    Modal.setAppElement("#root"); // điều chỉnh id root app nếu khác

    return (
        <AnimatePresence>
            {isOpen && (
                <Modal
                    isOpen={isOpen}
                    onRequestClose={onRequestClose}
                    contentLabel={contentLabel}
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={true}
                    overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-auto z-50"
                    className="outline-none"
                >
                    <motion.div
                        className="max-w-3xl mx-auto my-10 p-6 bg-white rounded shadow-lg"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        {children}
                    </motion.div>
                </Modal>
            )}
        </AnimatePresence>
    );
}