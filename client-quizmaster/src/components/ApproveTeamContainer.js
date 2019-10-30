
import React from 'react';
import Card from "react-bootstrap/Card";
import ApproveTeamList from "./ApproveTeamList";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import {withRouter} from "react-router-dom";

import * as ReactRedux from "react-redux";
import {approveTeams} from "../reducers/approveTeamsReducer";
import {ErrorComponent} from "./MiscComponents";
import {Col, Collapse, Row} from "react-bootstrap";

function ApproveTeamContainer(props) {

    const approveTeams = () => props.doApproveTeams(props.teams, props.quizCode, props.history);

    return (
            <div>
                <div className='quiz-link-container'>
                    <Card className='green'>
                        <Card.Body>
                            <Form.Group as={Row}>
                                <Form.Label column md='3'>Quiz Link</Form.Label>
                                <Col md='9'>
                                    <Form.Control type='text' readOnly value={process.env.REACT_APP_TEAM_CLIENT_URL + '/' + props.quizCode} />
                                </Col>
                            </Form.Group>
                        </Card.Body>
                    </Card>
                </div>
                <Card className='purple'>
                    <Collapse in={true} appear={true}>
                        <Card.Body>
                            <div className='approve-teams-container'>
                                <h3 className='text-center'>Approve Teams</h3>

                                <div className='loading-div'>
                                    <p>Waiting for teams</p>
                                    <img width='100px' src={process.env.PUBLIC_URL + '/images/spinner-white.svg'} alt="spinner" />
                                </div>

                                <ApproveTeamList/>
                                <ErrorComponent err={props.err} />
                                <Form.Group className='text-center'>
                                    {props.teams.length > 0 ? <Button onClick={approveTeams} variant="primary">Approve Teams
                                        {props.isSending ? <span className="right-icon loading">&nbsp;</span> : '' }</Button> : '' }
                                </Form.Group>
                            </div>
                        </Card.Body>
                    </Collapse>
                </Card>
            </div>
    );
}

function mapStateToProps(state) {
    return {
        quizCode: state.quiz.code,
        err: state.err,
        teams: state.approveTeams.teams,
        isSending: state.approveTeams.isSending
    }
}
function mapDispatchToProps(dispatch) {
    return {
        doApproveTeams: (approvedTeams, quizCode, history) => dispatch(approveTeams(approvedTeams, quizCode, history)),
    }
}

export default ReactRedux.connect(mapStateToProps, mapDispatchToProps)(withRouter(ApproveTeamContainer));
