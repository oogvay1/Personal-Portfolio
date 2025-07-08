import { useRef } from 'react';
import './Creative.css'

function Creative() {

    const creative = useRef(null);
    const designer = useRef(null);

    return (
        <>
            <div className="creative-container">
                <h1 className="creative-text"><p ref={creative}>CREATIVE</p> <p ref={designer}>DESIGNER</p></h1>
            </div>
        </>
    );
}

export default Creative
