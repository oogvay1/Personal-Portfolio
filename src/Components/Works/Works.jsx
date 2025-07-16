import CountUp from '../Counte/Couter';
import Counter from '../Countes/Coutes';
import './Works.css'

function Works() {

    return (
        <>
            <div className="works-container">
                <div className="works-title">
                    <h1>WORKS</h1>
                    <CountUp
                        from={0}
                        to={6}
                        separator=","
                        direction="up"
                        duration={1}
                        className="count-up-text"
                    />
                </div>

                <div className="works-imgs">
                    
                </div>
            </div>
        </>
    );
}

export default Works
