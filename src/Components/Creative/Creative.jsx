import { useRef } from 'react';
import CircularText from '../Rotate/Rotate';
import './Creative.css'

function Creative() {

    return (
        <>
            <div className="creative-container">
                <CircularText
                    text="CONTACT WITH ME "
                    onHover="speedUp"
                    spinDuration={20}
                    className="custom-class"
                />
            </div>
        </>
    );
}

export default Creative
