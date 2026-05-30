import React from 'react';
import './routes.css';

const Routes = ({ dataPoint }) => {
    if (!dataPoint || !dataPoint.path) return null;

    return (
        <div className='pathAnswerCard'>
            <div className='routeStatsRow'>
                <div className='routeStatItem'>
                    <span className='statLabel'>Start Node</span>
                    <span className='statValue startNode'>{dataPoint.from}</span>
                </div>
                <div className='routeStatArrow'>
                    <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </div>
                <div className='routeStatItem'>
                    <span className='statLabel'>End Node</span>
                    <span className='statValue endNode'>{dataPoint.to}</span>
                </div>
            </div>

            <div className='distanceBadgeCard'>
                <div className='distanceIcon'>
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="5" r="3"></circle><line x1="12" y1="22" x2="12" y2="8"></line><path d="M5 12h14"></path><path d="M12 12h0"></path></svg>
                </div>
                <div className='distanceText'>
                    <span className='distanceLabel'>Total Distance</span>
                    <span className='distanceValue'>{dataPoint.totalDis} meters</span>
                </div>
            </div>

            <div className='pathSequenceContainer'>
                <h3 className='pathTitle'>Path</h3>
                <div className='pathStepsWrapper'>
                    {dataPoint.path.map((node, index) => (
                        <React.Fragment key={index}>
                            <div className={`pathNodeChip ${index === 0 ? 'start' : index === dataPoint.path.length - 1 ? 'end' : ''}`}>
                                <span className='nodeNumber'>{node}</span>
                            </div>
                            {index < dataPoint.path.length - 1 && (
                                <div className='pathStepConnector'>
                                    <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Routes;
